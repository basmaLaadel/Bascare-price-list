#!/bin/bash

# Manual GitHub Pages deployment script for Bascare
# This script avoids the WSL ARG_MAX limitation by deploying directly via git

set -e

echo "Building the React app..."
npm run build

echo "Preparing deployment..."
cd build

# Initialize or update the git repository in the build folder
if [ -d .git ]; then
    echo "Updating existing gh-pages git repository..."
    git pull origin gh-pages --rebase 2>/dev/null || true
else
    echo "Initializing new gh-pages git repository..."
    git init
    git remote add origin https://github.com/basmaLaadel/Bascare-price-list.git
fi

# Stage all files
echo "Staging files..."
git add -A

# Create commit with timestamp
COMMIT_MESSAGE="Deploy: $(date +%Y-%m-%d\ %H:%M:%S)"
echo "Committing with message: $COMMIT_MESSAGE"
git commit --allow-empty -m "$COMMIT_MESSAGE" -q

# Configure git user if not already configured in this repo
git config user.email "deploy@bascare.local" 2>/dev/null || git config --global user.email "deploy@bascare.local"
git config user.name "Bascare Deploy" 2>/dev/null || git config --global user.name "Bascare Deploy"

# Create or update gh-pages branch
echo "Creating/updating gh-pages branch..."
git branch -D gh-pages 2>/dev/null || true
git checkout --orphan gh-pages

# Force push to gh-pages branch
echo "Pushing to GitHub..."
git push -f origin gh-pages

cd ..
echo "✅ Deployment complete!"
echo "Your site will be available at: https://basmalaadel.github.io/Bascare-price-list/"
