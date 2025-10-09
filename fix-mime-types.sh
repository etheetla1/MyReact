#!/bin/bash

# Script to manually fix MIME types on S3 for immediate resolution
# Run this if you need to fix the current deployment before the next push

echo "Fixing MIME types for knowelist.com S3 bucket..."

# Configure AWS CLI (make sure your credentials are set)
# aws configure set region us-east-1

# Fix JavaScript files
echo "Fixing JavaScript files..."
aws s3 ls s3://knowelist.com/ --recursive | grep -E '\.(js|mjs)$' | awk '{print $4}' | while read file; do
  echo "Processing: $file"
  aws s3 cp "s3://knowelist.com/$file" "s3://knowelist.com/$file" \
    --metadata-directive REPLACE \
    --content-type "application/javascript" \
    --cache-control "public, max-age=31536000, immutable"
done

# Fix CSS files
echo "Fixing CSS files..."
aws s3 ls s3://knowelist.com/ --recursive | grep -E '\.css$' | awk '{print $4}' | while read file; do
  echo "Processing: $file"
  aws s3 cp "s3://knowelist.com/$file" "s3://knowelist.com/$file" \
    --metadata-directive REPLACE \
    --content-type "text/css" \
    --cache-control "public, max-age=31536000, immutable"
done

# Fix HTML files
echo "Fixing HTML files..."
aws s3 ls s3://knowelist.com/ --recursive | grep -E '\.html$' | awk '{print $4}' | while read file; do
  echo "Processing: $file"
  aws s3 cp "s3://knowelist.com/$file" "s3://knowelist.com/$file" \
    --metadata-directive REPLACE \
    --content-type "text/html" \
    --cache-control "no-cache, no-store, must-revalidate"
done

echo "MIME type fixes completed!"
echo "Your website should now load properly."
