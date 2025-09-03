# syntax=docker/dockerfile:1.2
FROM node:20 AS builder

# Default git branch 
ARG BRANCH=main 

# Install pnpm globally
RUN npm install -g pnpm

# Create Nodejs app directory
RUN mkdir -p /app
WORKDIR /app

# Clone repo 
RUN git clone -b $BRANCH https://github.com/Cardano-After-Dark/dred dred
WORKDIR /app/dred

# Install dependencies
RUN pnpm install

# Build the project
RUN pnpm build

# Prepare production image
FROM node:20-alpine

# Install nginx and lets-encrypt certbot
RUN apk add --no-cache nginx certbot openssl git curl vim

# Install Redis and configure
RUN apk add --no-cache redis && \
    # Update bind configuration to listen only on IPv4 instead of IPv4 and IPv6
    # sed -i 's/^bind 127\.0\.0\.1[[:space:]]*-::1[[:space:]]*$/bind 127.0.0.1/' /etc/redis.conf && \
    # Set maxmemory to 512MB
    sed -i 's/^# *maxmemory .*/maxmemory 512mb/' /etc/redis.conf && \
    # Set eviction policy
    sed -i 's/^# *maxmemory-policy .*/maxmemory-policy allkeys-lru/' /etc/redis.conf 

# Install PM2 for process management
RUN npm install -g pm2 pnpm

# Install logrotate for PM2
RUN pm2 install pm2-logrotate && \
    pm2 set pm2-logrotate:compress true 

# Create Dred and SSL (lets-encrypt) Directories
RUN mkdir -p /dred/keystore /etc/nginx/ssl /var/www/certbot 

# Create logs directory
RUN mkdir -p /var/log/dred /var/log/nginx /var/log/redis
WORKDIR /dred

# Copy built app and pnpm lockfile
COPY --from=builder /app/dred/dist ./dist
COPY --from=builder /app/dred/package.json .
COPY --from=builder /app/dred/pnpm-lock.yaml .
COPY --from=builder /app/dred/node_modules ./node_modules
COPY --from=builder /app/dred/onchain ./onchain

# Install only production deps
RUN pnpm install --prod

# Create PM2 ecosystem file
RUN echo $'module.exports = {\n\ 
  apps: [\n\
    { \n\
      name: "ssl-setup", \n\
      script: "/usr/local/bin/ssl-setup.sh", \n\
      interpreter: "/bin/sh", \n\
      env: { \n\
        DOMAIN: process.env.HOST_DOMAIN, \n\
        EMAIL: process.env.EMAIL  \n\
      }, \n\
      restart_delay: 5000, \n\
      autorestart: true, \n\
    }, \n\
    {   \n\
      name: "dred-server",  \n\
      script: "/dred/dist/dredServer.mjs", \n\   
      cwd: "/dred", \n\
      env: { \n\     
        REDIS_URL: "redis://localhost:6379", \n\ 
        NODE_ENV: process.env.NODE_ENV, \n\ 
        DRED_PORT: process.env.DRED_PORT, \n\  
        DRED_HOST: process.env.DRED_HOST, \n\  
        LOGGING: "default:info", \n\  
        CARDANO_NETWORK: process.env.CARDANO_NETWORK, \n\  
        BF_API_KEY: process.env.BF_API_KEY, \n\  
        HOST_DOMAIN: process.env.HOST_DOMAIN \n\  
      }, \n\  
      instances: 1, \n\  
      autorestart: true, \n\   
      watch: false, \n\  
      max_memory_restart: "1G", \n\  
      log_file: "/var/log/dred/dred-server.log", \n\   
      error_file: "/var/log/dred/dred-error.log", \n\  
      out_file: "/var/log/dred/dred-out.log", \n\  
      log_date_format: "YYYY-MM-DD HH:mm:ss Z" \n\   
    }, \n\
    { \n\
      name: "redis", \n\
      script: "redis-server", \n\
      args: ["/etc/redis.conf"], \n\
      interpreter: "none", \n\
      autorestart: true, \n\
      watch: false, \n\
    }, \n\
    { \n\
    name: "nginx", \n\
    script: "/usr/sbin/nginx", \n\
      args: "-g \'daemon off;\'", \n\
      error_file: "/var/log/nginx/error.log", \n\
      out_file: "/var/log/nginx/access.log", \n\
      autorestart: true, \n\
      restart_delay: 10000, \n\
    }, \n\
  ] \n\   
}'\
> /dred/ecosystem.config.cjs


# Copy configuration files and scripts
COPY config/nginx-le.conf /etc/nginx/nginx-le.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY scripts/ssl-setup.sh /usr/local/bin/

# Set permissions
RUN chmod +x /usr/local/bin/*.sh

# Expose HTTPS port
EXPOSE 80 443

# Start all with pm2
CMD ["pm2-runtime", "ecosystem.config.cjs"]

HEALTHCHECK --interval=30s --timeout=3s \
  CMD redis-cli ping | grep PONG || exit 1

