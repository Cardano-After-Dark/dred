#!/bin/sh
set -e

# Ensure required environment variable is set
if [ -z "$DOMAIN" ]; then
  echo "❌ Error: DOMAIN environment variable is not set."
  echo "   Put a DOMAIN entry inside the environment: section of your nginx service block in your docker-compose.yaml"
  echo "   Example: "
  echo "     #"
  echo "     # services:"
  echo "     #   nginx:"
  echo "     #     environment:"
  echo "     #       - DOMAIN=example.com"
  echo "   or run: DOMAIN=example.com docker-compose up -d" 
  exit 1
fi

CERT_DIR="/etc/letsencrypt/live/$DOMAIN"

# Install certbot if not already installed
if ! command -v certbot >/dev/null 2>&1; then
  echo "📦 Installing certbot..."
  apk add certbot
fi

# Generate certificates if not found
if [ ! -f "$CERT_DIR/fullchain.pem" ] || [ ! -f "$CERT_DIR/privkey.pem" ]; then
  echo "🔐 Generating Let's Encrypt certificates for $DOMAIN..."
  certbot certonly --standalone -d "$DOMAIN" --non-interactive --agree-tos -m admin@$DOMAIN
else
  echo "✓ Using existing certificates for $DOMAIN"
fi

# Generate a random sleep time between 0 and 3600 seconds
SLEEPTIME=$(awk 'BEGIN{srand(); print int(rand()*(3600+1))}')

# Define the cron job line
CRONLINE="0 0,12 * * * root sleep $SLEEPTIME && certbot renew -q"

# Check if the cron job already exists in /etc/crontab
if ! grep -Fq "certbot renew -q" /etc/crontab; then
    echo "$CRONLINE" | tee -a /etc/crontab > /dev/null
    echo "✅ SSL-Renewal Cron job added to /etc/crontab."
else
    echo "✅ SSL-Renewal Cron job already exists in /etc/crontab."
fi

echo "✅ Certificate setup complete for $DOMAIN"
echo "📂 Certificates stored in: $CERT_DIR"

