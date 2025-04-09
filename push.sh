#!/bin/bash

# Navigate to the project directory
cd /Users/elishatheetla/Desktop/React Portfolio

# Stage all changes
git add .

# Commit changes with a timestamp
git commit -m "Daily update: $(date)"

# Push changes to the remote repository
git push
