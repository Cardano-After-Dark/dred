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

# Install curl & vim
RUN apk add --no-cache git curl vim

# Install PM2 for process management
RUN npm install -g pm2 pnpm

# Install logrotate for PM2
RUN pm2 install pm2-logrotate && \
    pm2 set pm2-logrotate:compress true 

# Create Dred Directories
RUN mkdir -p /dred/keystore 

# Create logs directory
RUN mkdir -p /var/log/dred

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
    {   \n\
      name: "dred-server",  \n\
      script: "/dred/dist/dredServer.mjs", \n\   
      cwd: "/dred", \n\
      env: { \n\     
        REDIS_URL: "redis://redis:6379", \n\ 
        NODE_ENV: process.env.NODE_ENV, \n\ 
        LOGGING: "default:info", \n\  
        CARDANO_NETWORK: process.env.CARDANO_NETWORK, \n\  
        BF_API_KEY: process.env.BF_API_KEY, \n\  
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
  ] \n\   
}'\
> /dred/ecosystem.config.cjs


# Start all with pm2
CMD ["pm2-runtime", "ecosystem.config.cjs"]


