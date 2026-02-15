#!/bin/bash

# Configuration
VPS_USER="root"
VPS_IP="103.159.50.249"
APP_DIR="/var/www/recruitment"

echo "🚀 Starting deployment to $VPS_IP..."

# 1. Push local changes
echo "📦 Pushing local changes to GitHub..."
git push origin main

# 2. Connect to VPS and deploy
echo "CONN Connecting to VPS..."
ssh $VPS_USER@$VPS_IP << EOF
    set -e
    
    echo "📂 Navigating to application directory..."
    cd $APP_DIR
    
    echo "⬇️ Pulling latest changes..."
    git pull origin main
    
    echo "🏗️ Building and starting containers..."
    # Ensure dependencies are installed if package.json changed (optional but good for safety)
    # But since we use docker, we just rebuild
    docker compose up -d --build
    
    echo "🧹 Cleaning up unused images..."
    docker image prune -f
    
    echo "✅ Remote deployment finished!"
EOF

echo "🎉 Deployment complete!"
