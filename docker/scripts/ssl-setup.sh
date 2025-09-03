#!/bin/sh

CERT_PATH="/etc/letsencrypt/live/$DOMAIN"

# Create directory for SSL cert (if it not exists)
SSL_DIR="/etc/nginx/ssl"
mkdir -p $SSL_DIR

# Function to kill nginx-le 
kill_nginx_le() {
    # Find the PID of nginx master process with -c /etc/nginx/nginx-le.conf
    PID=$(ps aux | grep 'nginx: master process nginx -c /etc/nginx/nginx-le.conf' | grep -v grep | awk '{print $1}')
    if [ -n "$PID" ]; then
        echo "Killing Nginx process with PID $PID running nginx-le.conf..."
        kill "$PID"
        # Wait a bit and check if it's still running
        sleep 5
        if ps aux | grep 'nginx: master process nginx -c /etc/nginx/nginx-le.conf' | grep -v grep; then
            echo "⚠️ Process $PID did not quit, force killing..."
            kill -9 "$PID"
        fi
        echo "✅ Nginx process running nginx-le.conf stopped."
    else
        echo "✅ No Nginx process running with nginx-le.conf found."
    fi
}

# Function to wait for Nginx to stop
wait_for_nginx_quit() {
    PID=$(ps aux | grep 'nginx: master process nginx -c /etc/nginx/nginx-le.conf' | grep -v grep | awk '{print $1}')
    while  [ -n "$PID" ]; do
        echo "⚠️ Nginx is still running. Process details:"

        # Get all process info and filter by nginx keyword
        ps aux | grep 'nginx: master process nginx -c /etc/nginx/nginx-le.conf' | grep -v grep
        
        kill_nginx_le
    done
    echo "✅ Nginx has stopped, proceeding..."
}

# Function to generate a certificate
generate_cert() {
    echo "Generating SSL certificate for $DOMAIN..."

    echo "Starting temporary Nginx for Let's Encrypt Challenge..."
    nginx -c /etc/nginx/nginx-le.conf

    # Get certificate with certbot
    certbot certonly --webroot -w /var/www/certbot -d "$DOMAIN" \
        --non-interactive --agree-tos -m "$EMAIL"

    # Create symlinks
    echo "Creating Symlinks for SSL-Certificates..."
    ln -sf "$CERT_PATH/fullchain.pem" $SSL_DIR/
    ln -sf "$CERT_PATH/privkey.pem" $SSL_DIR/
    
    echo "Certificate setup completed."

    echo "Stopping temporary Nginx..."
    kill_nginx_le
    wait_for_nginx_quit
}

# Check if certificate exists
if [ ! -f "$CERT_PATH/fullchain.pem" ]; then
    generate_cert
else
    echo "Found existing SSL certificate for $DOMAIN..."
    echo "Checking if renewal is needed..."

    certbot renew --quiet

    echo "✅ SSL Renewal check complete."
    echo "⏳ Sleeping 1 day before next renewal check..."
    sleep 1d
fi