#!/bin/bash

# Configuration - CHANGE THESE VALUES
BUCKET_NAME="knowelist.com"  # Set your unique bucket name
REGION="us-east-1"                   # Set your AWS region
PROFILE="default"                    # Set your AWS CLI profile

# Create the S3 bucket
aws s3 mb s3://$BUCKET_NAME --region $REGION --profile $PROFILE

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
aws s3api put-object --bucket $BUCKET_NAME --key "public/images/" --profile $PROFILE
aws s3api put-object --bucket $BUCKET_NAME --key "public/icons/" --profile $PROFILE
aws s3api put-object --bucket $BUCKET_NAME --key "public/data/" --profile $PROFILE
aws s3api put-object --bucket $BUCKET_NAME --key "ai-chatbot/documents/" --profile $PROFILE

# Upload example images
if [ -f "../../src/assets/elishaTheetlaProfile1.png" ]; then
  aws s3 cp ../../src/assets/elishaTheetlaProfile1.png s3://$BUCKET_NAME/public/images/profile.jpg --profile $PROFILE
fi
if [ -f "../../src/assets/projects/project1.png" ]; then
  aws s3 cp ../../src/assets/projects/project1.png s3://$BUCKET_NAME/public/images/project1.png --profile $PROFILE
fi

# Upload example icon
if [ -f "../../public/favicon.svg" ]; then
  aws s3 cp ../../public/favicon.svg s3://$BUCKET_NAME/public/icons/favicon.svg --profile $PROFILE
fi

# Upload example data files
if [ -f "../../public/data/hero.json" ]; then
  aws s3 cp ../../public/data/hero.json s3://$BUCKET_NAME/public/data/hero.json --profile $PROFILE
fi
if [ -f "../../public/data/projects.json" ]; then
  aws s3 cp ../../public/data/projects.json s3://$BUCKET_NAME/public/data/projects.json --profile $PROFILE
fi
if [ -f "../../public/data/tech.json" ]; then
  aws s3 cp ../../public/data/tech.json s3://$BUCKET_NAME/public/data/tech.json --profile $PROFILE
fi
if [ -f "../../public/data/about.json" ]; then
  aws s3 cp ../../public/data/about.json s3://$BUCKET_NAME/public/data/about.json --profile $PROFILE
fi

# Upload example ai-chatbot document
if [ -f "../../ai-chatbot/documents/your-rag-sources.pdf" ]; then
  aws s3 cp ../../ai-chatbot/documents/your-rag-sources.pdf s3://$BUCKET_NAME/ai-chatbot/documents/your-rag-sources.pdf --profile $PROFILE
fi
if [ -f "../../vector-db-export.json" ]; then
  aws s3 cp ../../vector-db-export.json s3://$BUCKET_NAME/vector-db-export.json --profile $PROFILE
fi

echo "S3 folder structure and example files uploaded!"
echo "Example URLs:"
echo "Profile Image: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/public/images/profile.jpg"
echo "Project Image: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/public/images/project1.png"
echo "Hero Data: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/public/data/hero.json"
echo "AI Chatbot PDF: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/ai-chatbot/documents/your-rag-sources.pdf"
