#!/bin/bash

# ========================================
# Auto Deployment Script for VPS
# Domain: tuyendung.phuquoctrip.com
# ========================================

set -e  # Exit on error

echo "🚀 Starting VPS deployment for tuyendung.phuquoctrip.com..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="tuyendung.phuquoctrip.com"
APP_DIR="/var/www/recruitment"
DB_NAME="recruitment_db"
DB_USER="recruitment_app"
DB_PASS="Recruitment2024!@#"
REPO_URL="https://github.com/dndkhoa3012/recruitment.git"

echo -e "${BLUE}[1/10]${NC} Updating system..."
apt update && apt upgrade -y

echo -e "${BLUE}[2/10]${NC} Installing Node.js 20..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi
echo "✓ Node.js $(node --version) installed"

echo -e "${BLUE}[3/10]${NC} Installing MySQL..."
if ! command -v mysql &> /dev/null; then
    apt install mysql-server -y
    echo "✓ MySQL installed"
else
    echo "✓ MySQL already installed"
fi

echo -e "${BLUE}[4/10]${NC} Setting up database..."
mysql -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || true
mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';" 2>/dev/null || true
mysql -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';" 2>/dev/null || true
mysql -e "FLUSH PRIVILEGES;" 2>/dev/null || true
echo "✓ Database configured"

echo -e "${BLUE}[5/10]${NC} Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi
echo "✓ PM2 installed"

echo -e "${BLUE}[6/10]${NC} Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt install nginx -y
fi
echo "✓ Nginx installed"

echo -e "${BLUE}[7/10]${NC} Cloning application..."
if [ -d "$APP_DIR" ]; then
    echo "Application directory exists. Pulling latest changes..."
    cd $APP_DIR
    git pull origin main
else
    mkdir -p /var/www
    cd /var/www
    git clone $REPO_URL
    cd $APP_DIR
fi

echo -e "${BLUE}[8/10]${NC} Setting up application..."
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@localhost:3306/${DB_NAME}"
NODE_ENV=production
PORT=3000
NEXTAUTH_SECRET="phuquoctrip-recruitment-secret-2024-very-long-and-secure"
NEXTAUTH_URL="https://${DOMAIN}"
EOF

echo "✓ Environment configured"

# Prisma setup
npx prisma generate
npx prisma migrate deploy

# Build application
npm run build

echo -e "${BLUE}[9/10]${NC} Starting application with PM2..."
pm2 delete recruitment 2>/dev/null || true
pm2 start npm --name "recruitment" -- start
pm2 startup || true
pm2 save

echo -e "${BLUE}[10/10]${NC} Configuring Nginx..."

# Create Nginx config
cat > /etc/nginx/sites-available/recruitment << 'NGINXCONF'
server {
    listen 80;
    listen [::]:80;
    server_name tuyendung.phuquoctrip.com;

    access_log /var/log/nginx/recruitment-access.log;
    error_log /var/log/nginx/recruitment-error.log;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_cache_valid 200 60m;
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
}
NGINXCONF

# Enable site
ln -sf /etc/nginx/sites-available/recruitment /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t && systemctl reload nginx

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📋 Summary:"
echo "  • Application: Running on http://$(hostname -I | awk '{print $1}'):3000"
echo "  • Domain: http://${DOMAIN}"
echo "  • PM2 Status: Active"
echo ""
echo "🔒 Next Steps:"
echo "  1. Point your DNS: ${DOMAIN} → $(hostname -I | awk '{print $1}')"
echo "  2. Install SSL: sudo certbot --nginx -d ${DOMAIN}"
echo "  3. Setup firewall: sudo ufw allow 'Nginx Full' && sudo ufw enable"
echo ""
echo "📊 Useful Commands:"
echo "  • View logs: pm2 logs recruitment"
echo "  • Restart app: pm2 restart recruitment"
echo "  • View status: pm2 status"
echo ""
