#!/bin/bash

# Docker & docker-compose availability check
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed or not accessible"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "ERROR: docker-compose is not installed or not accessible"
    exit 1
fi

# Image tag input handling
if [ $# -eq 0 ]; then
    image_tag="dred-node"
    echo "No image name provided - using default 'dred-node:custom'"
else
    image_tag="$1"
    echo "Using custom image tag: $image_tag"
fi


# File verification with proper array handling
files=(
    "Dockerfile"  # File: Error message prefix
    "docker-compose.yml"  # File: Description
    "nginx.conf"
    "ssl-setup.sh"
)

# Check each file pair
index=0
while [ $index -lt ${#files[@]} ]; do
    filename="${files[$index]}"
    echo -e ✅ $filename
    error_msg="${files[$((index + 1))]}"
    echo $error_msg
    index=$((index + 2))

    if [ ! -f "$filename" ]; then
        echo "${error_msg}NOT FOUND in $(pwd)"
        exit 1
    fi
done


# Image building process
echo -e "\n🛠  Building Docker image..."
docker buildx build --no-cache -t "$image_tag" . || {
# docker buildx build -t "$image_tag" . || {
    echo -e "\n🚨 Docker build failed. Check Dockerfile syntax"
    exit 1
}

# Starting services
echo -e "\n🚀 Starting services..."
docker-compose up --build "$@" || {
    echo -e "\n🚨 Service initialization failed. Check docker-compose.yml"
    exit 1
}

echo -e "\n✅ Success - Services running"
exit 0

