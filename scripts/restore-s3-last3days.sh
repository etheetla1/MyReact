#!/usr/bin/env bash
set -euo pipefail

# S3 Delete Marker Restoration Script
# Removes delete markers created in the last N days to restore "deleted" objects
# Supports scoped restoration (all, assets, documents) and CloudFront invalidation

# Configuration via environment variables
BUCKET="${BUCKET:-}"
SCOPE="${SCOPE:-all}"
DAYS="${DAYS:-3}"
DIST_ID="${DIST_ID:-}"
DRY_RUN="${DRY_RUN:-0}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Validate requirements
validate_requirements() {
    # Check if jq is installed
    if ! command -v jq &> /dev/null; then
        log_error "jq is required but not installed."
        echo "Please install jq:"
        echo "  macOS: brew install jq"
        echo "  Ubuntu/Debian: sudo apt-get install jq"
        echo "  CentOS/RHEL: sudo yum install jq"
        echo "  Or download from: https://stedolan.github.io/jq/download/"
        exit 1
    fi

    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is required but not installed."
        echo "Please install AWS CLI: https://aws.amazon.com/cli/"
        exit 1
    fi

    # Validate BUCKET is provided
    if [[ -z "$BUCKET" ]]; then
        log_error "BUCKET environment variable is required."
        echo "Usage: BUCKET=your-bucket-name $0"
        exit 1
    fi

    # Validate SCOPE
    if [[ ! "$SCOPE" =~ ^(all|assets|documents)$ ]]; then
        log_error "SCOPE must be one of: all, assets, documents"
        exit 1
    fi

    # Validate DAYS is a positive integer
    if ! [[ "$DAYS" =~ ^[0-9]+$ ]] || [[ "$DAYS" -eq 0 ]]; then
        log_error "DAYS must be a positive integer"
        exit 1
    fi
}

# Print configuration
print_config() {
    echo "=================================="
    echo "S3 Delete Marker Restoration"
    echo "=================================="
    echo "Bucket: $BUCKET"
    echo "Scope: $SCOPE"
    echo "Days: $DAYS"
    echo "CloudFront Distribution: ${DIST_ID:-"Not configured"}"
    echo "Dry Run: $([ "$DRY_RUN" = "1" ] && echo "Yes" || echo "No")"
    echo "=================================="
    echo
}

# Get cutoff date (N days ago)
get_cutoff_date() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        date -u -v-${DAYS}d '+%Y-%m-%dT%H:%M:%S.000Z'
    else
        # Linux
        date -u -d "${DAYS} days ago" '+%Y-%m-%dT%H:%M:%S.000Z'
    fi
}

# Get prefix based on scope
get_prefix() {
    case "$SCOPE" in
        "assets") echo "assets/" ;;
        "documents") echo "documents/" ;;
        "all") echo "" ;;
    esac
}

# Find delete markers newer than cutoff date
find_delete_markers() {
    local prefix="$1"
    local cutoff_date="$2"
    
    log_info "Searching for delete markers newer than $cutoff_date..."
    
    local list_cmd="aws s3api list-object-versions --bucket \"$BUCKET\""
    if [[ -n "$prefix" ]]; then
        list_cmd="$list_cmd --prefix \"$prefix\""
    fi
    
    # Get delete markers and filter by date
    eval "$list_cmd" | jq -r --arg cutoff "$cutoff_date" '
        .DeleteMarkers[]? 
        | select(.LastModified > $cutoff)
        | "\(.Key)\t\(.VersionId)\t\(.LastModified)"
    ' 2>/dev/null || echo ""
}

# Remove delete markers
remove_delete_markers() {
    local markers="$1"
    local count=0
    
    if [[ -z "$markers" ]]; then
        log_info "No delete markers found to remove."
        return 0
    fi
    
    while IFS=$'\t' read -r key version_id last_modified; do
        if [[ -n "$key" && -n "$version_id" ]]; then
            if [[ "$DRY_RUN" = "1" ]]; then
                log_info "[DRY RUN] Would restore: $key (deleted: $last_modified)"
            else
                log_info "Restoring: $key (deleted: $last_modified)"
                if aws s3api delete-object --bucket "$BUCKET" --key "$key" --version-id "$version_id" >/dev/null 2>&1; then
                    log_success "Restored: $key"
                else
                    log_error "Failed to restore: $key"
                fi
            fi
            ((count++))
        fi
    done <<< "$markers"
    
    return $count
}

# Invalidate CloudFront distribution
invalidate_cloudfront() {
    if [[ -n "$DIST_ID" && "$DRY_RUN" != "1" ]]; then
        log_info "Invalidating CloudFront distribution: $DIST_ID"
        if aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" >/dev/null 2>&1; then
            log_success "CloudFront invalidation created successfully"
        else
            log_warning "Failed to create CloudFront invalidation"
        fi
    elif [[ -n "$DIST_ID" && "$DRY_RUN" = "1" ]]; then
        log_info "[DRY RUN] Would invalidate CloudFront distribution: $DIST_ID"
    fi
}

# Main execution
main() {
    validate_requirements
    print_config
    
    local cutoff_date
    cutoff_date=$(get_cutoff_date)
    
    local prefix
    prefix=$(get_prefix)
    
    log_info "Looking for delete markers created after: $cutoff_date"
    if [[ -n "$prefix" ]]; then
        log_info "Filtering by prefix: $prefix"
    fi
    
    local markers
    markers=$(find_delete_markers "$prefix" "$cutoff_date")
    
    local restored_count=0
    if [[ -n "$markers" ]]; then
        remove_delete_markers "$markers"
        restored_count=$?
    fi
    
    echo
    echo "=================================="
    echo "Restoration Summary"
    echo "=================================="
    echo "Scope: $SCOPE"
    echo "Delete markers found: $(echo "$markers" | grep -c . 2>/dev/null || echo 0)"
    echo "Objects restored: $restored_count"
    echo "=================================="
    
    if [[ $restored_count -gt 0 ]]; then
        invalidate_cloudfront
        if [[ "$DRY_RUN" != "1" ]]; then
            log_success "Restoration completed successfully!"
        else
            log_info "Dry run completed. Use DRY_RUN=0 to perform actual restoration."
        fi
    else
        log_info "No objects needed restoration."
    fi
    
    exit 0
}

# Run main function
main "$@"
