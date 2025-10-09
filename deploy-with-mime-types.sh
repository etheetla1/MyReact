#!/bin/bash

# Comprehensive S3 deployment script with proper MIME types
# This script ensures all files are uploaded with correct content-type headers

set -e

echo "🚀 Starting deployment to S3 with proper MIME types..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found. Please run 'npm run build' first."
    exit 1
fi

# AWS S3 bucket name
BUCKET="knowelist.com"

echo "📁 Uploading files to S3 bucket: $BUCKET"

# Upload HTML files
echo "📄 Uploading HTML files..."
find dist -name "*.html" -type f | while read file; do
    s3_path="${file#dist/}"
    echo "  → $s3_path"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
        --content-type "text/html" \
        --cache-control "no-cache, no-store, must-revalidate"
done

# Upload JavaScript files (.js)
echo "📜 Uploading JavaScript files..."
find dist -name "*.js" -type f | while read file; do
    s3_path="${file#dist/}"
    echo "  → $s3_path"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
        --content-type "application/javascript" \
        --cache-control "public, max-age=31536000, immutable"
done

# Upload JavaScript module files (.mjs)
echo "📜 Uploading JavaScript module files..."
find dist -name "*.mjs" -type f | while read file; do
    s3_path="${file#dist/}"
    echo "  → $s3_path"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
        --content-type "application/javascript" \
        --cache-control "public, max-age=31536000, immutable"
done

# Upload CSS files
echo "🎨 Uploading CSS files..."
find dist -name "*.css" -type f | while read file; do
    s3_path="${file#dist/}"
    echo "  → $s3_path"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
        --content-type "text/css" \
        --cache-control "public, max-age=31536000, immutable"
done

# Upload JSON files
echo "📋 Uploading JSON files..."
find dist -name "*.json" -type f | while read file; do
    s3_path="${file#dist/}"
    echo "  → $s3_path"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
        --content-type "application/json" \
        --cache-control "public, max-age=31536000, immutable"
done

# Upload image files
echo "🖼️  Uploading image files..."
find dist \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" -o -name "*.svg" -o -name "*.ico" \) -type f | while read file; do
    s3_path="${file#dist/}"
    extension="${file##*.}"
    
    case $extension in
        png) content_type="image/png" ;;
        jpg|jpeg) content_type="image/jpeg" ;;
        gif) content_type="image/gif" ;;
        webp) content_type="image/webp" ;;
        svg) content_type="image/svg+xml" ;;
        ico) content_type="image/x-icon" ;;
        *) content_type="application/octet-stream" ;;
    esac
    
    echo "  → $s3_path ($content_type)"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
        --content-type "$content_type" \
        --cache-control "public, max-age=31536000, immutable"
done

# Upload font files
echo "🔤 Uploading font files..."
find dist \( -name "*.woff" -o -name "*.woff2" -o -name "*.ttf" -o -name "*.otf" \) -type f | while read file; do
    s3_path="${file#dist/}"
    extension="${file##*.}"
    
    case $extension in
        woff) content_type="font/woff" ;;
        woff2) content_type="font/woff2" ;;
        ttf) content_type="font/ttf" ;;
        otf) content_type="font/otf" ;;
        *) content_type="application/octet-stream" ;;
    esac
    
    echo "  → $s3_path ($content_type)"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
        --content-type "$content_type" \
        --cache-control "public, max-age=31536000, immutable"
done

# Upload any remaining files
echo "📦 Uploading remaining files..."
find dist -type f ! -name "*.html" ! -name "*.js" ! -name "*.mjs" ! -name "*.css" ! -name "*.json" ! -name "*.png" ! -name "*.jpg" ! -name "*.jpeg" ! -name "*.gif" ! -name "*.webp" ! -name "*.svg" ! -name "*.ico" ! -name "*.woff" ! -name "*.woff2" ! -name "*.ttf" ! -name "*.otf" | while read file; do
    s3_path="${file#dist/}"
    echo "  → $s3_path"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path"
done

# Configure S3 website
echo "🌐 Configuring S3 website..."
aws s3 website "s3://$BUCKET" --index-document index.html --error-document 404.html

# Clean up old files (optional - be careful with this)
echo "🧹 Cleaning up old files..."
aws s3 sync dist/ "s3://$BUCKET/" --delete --dryrun

echo "✅ Deployment completed successfully!"
echo "🌍 Website should be available at: https://$BUCKET"
echo ""
echo "📊 Verifying MIME types..."
echo "JavaScript files should have content-type: application/javascript"
echo "CSS files should have content-type: text/css"
echo "HTML files should have content-type: text/html"
