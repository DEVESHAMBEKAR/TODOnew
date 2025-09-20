#!/bin/bash

# Render build script for frontend  
echo "Building frontend service..."

npm install
npm run build

echo "Frontend build complete!"