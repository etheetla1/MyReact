#!/bin/bash

# Configuration - CHANGE THESE VALUES
BUCKET_NAME="knowelist.com"  # Set your unique bucket name
REGION="us-east-1"                   # Set your AWS region
PROFILE="default"                    # Set your AWS CLI profile

# Create the S3 bucket (if it doesn't exist)
aws s3 mb s3://$BUCKET_NAME --region $REGION --profile $PROFILE 2>/dev/null || echo "Bucket already exists"

# Set bucket policy to public
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
    }
  ]
}' --profile $PROFILE

# Create folder structure
aws s3api put-object --bucket $BUCKET_NAME --key "images/" --profile $PROFILE 2>/dev/null || echo "Images folder exists"
aws s3api put-object --bucket $BUCKET_NAME --key "images/projects/" --profile $PROFILE 2>/dev/null || echo "Projects folder exists"

# Upload images from dist folder (after build)
echo "Uploading images from dist folder..."

# Profile image
if [ -f "../../dist/assets/elishaTheetlaProfile1-B_DaAWug.png" ]; then
  aws s3 cp ../../dist/assets/elishaTheetlaProfile1-B_DaAWug.png s3://$BUCKET_NAME/images/elishaTheetlaProfile1.png --profile $PROFILE
  echo "✓ Profile image uploaded"
else
  echo "⚠ Profile image not found in dist/assets/"
fi

# About image
if [ -f "../../dist/assets/about-Cs4bjHyo.jpg" ]; then
  aws s3 cp ../../dist/assets/about-Cs4bjHyo.jpg s3://$BUCKET_NAME/images/about.jpg --profile $PROFILE
  echo "✓ About image uploaded"
else
  echo "⚠ About image not found in dist/assets/"
fi

# Logo image
if [ -f "../../dist/assets/logo-WdAiZ-lu.png" ]; then
  aws s3 cp ../../dist/assets/logo-WdAiZ-lu.png s3://$BUCKET_NAME/images/logo.png --profile $PROFILE
  echo "✓ Logo image uploaded"
else
  echo "⚠ Logo image not found in dist/assets/"
fi

# Project images
if [ -f "../../dist/assets/project-1-hgWJFOHx.jpg" ]; then
  aws s3 cp ../../dist/assets/project-1-hgWJFOHx.jpg s3://$BUCKET_NAME/images/projects/project-1.jpg --profile $PROFILE
  echo "✓ Project 1 image uploaded"
else
  echo "⚠ Project 1 image not found in dist/assets/"
fi

if [ -f "../../dist/assets/project-2-Dsim69lq.jpg" ]; then
  aws s3 cp ../../dist/assets/project-2-Dsim69lq.jpg s3://$BUCKET_NAME/images/projects/project-2.jpg --profile $PROFILE
  echo "✓ Project 2 image uploaded"
else
  echo "⚠ Project 2 image not found in dist/assets/"
fi

if [ -f "../../dist/assets/project-3-DJqjiGhQ.jpg" ]; then
  aws s3 cp ../../dist/assets/project-3-DJqjiGhQ.jpg s3://$BUCKET_NAME/images/projects/project-3.jpg --profile $PROFILE
  echo "✓ Project 3 image uploaded"
else
  echo "⚠ Project 3 image not found in dist/assets/"
fi

if [ -f "../../dist/assets/project-4-D2aQLXBi.jpg" ]; then
  aws s3 cp ../../dist/assets/project-4-D2aQLXBi.jpg s3://$BUCKET_NAME/images/projects/project-4.jpg --profile $PROFILE
  echo "✓ Project 4 image uploaded"
else
  echo "⚠ Project 4 image not found in dist/assets/"
fi

echo ""
echo "🎉 S3 upload complete!"
echo ""
echo "📁 Images uploaded to:"
echo "   Profile: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/images/elishaTheetlaProfile1.png"
echo "   About: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/images/about.jpg"
echo "   Logo: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/images/logo.png"
echo "   Projects: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/images/projects/"
echo ""
echo "🌐 CloudFront URLs (recommended):"
echo "   Profile: https://d2f1f8uiawofsx.cloudfront.net/images/elishaTheetlaProfile1.png"
echo "   About: https://d2f1f8uiawofsx.cloudfront.net/images/about.jpg"
echo "   Logo: https://d2f1f8uiawofsx.cloudfront.net/images/logo.png"
echo "   Projects: https://d2f1f8uiawofsx.cloudfront.net/images/projects/"
