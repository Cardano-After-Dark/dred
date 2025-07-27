#!/bin/sh

# Generate Nginx config from template
# envsubst '${DOMAIN}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

SSL_DIR="/etc/nginx/ssl"
mkdir -p $SSL_DIR

# Generate certificate if missing
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "Generating SSL certificate for $DOMAIN..."
    
    echo "Start temporary Nginx for Let's Encrypt Challenge"

    # Start temporary Nginx for HTTP-01 challenge
    nginx -c /etc/nginx/nginx-le.conf
    
    # Get certificate
    certbot certonly --webroot -w /var/www/certbot -d $DOMAIN \
        --non-interactive --agree-tos -m $EMAIL
    
    # Stop temporary Nginx
    nginx -s stop

    # Create symlinks
    ln -sf /etc/letsencrypt/live/$DOMAIN/fullchain.pem $SSL_DIR/
    ln -sf /etc/letsencrypt/live/$DOMAIN/privkey.pem $SSL_DIR/

    sleep 2s
else
    echo "Found existing SSL certificate for $DOMAIN..."
    sleep 12h
fi

# # # Generate DH parameters
# # if [ ! -f "$SSL_DIR/dhparam.pem" ]; then
# #     openssl dhparam -out $SSL_DIR/dhparam.pem 2048
# # fi

# # Set up renewal
#echo "0 3 * * * /usr/bin/certbot renew --quiet --post-hook 'nginx -s reload' > /var/log/cron.log 2>&1" | crontab -
