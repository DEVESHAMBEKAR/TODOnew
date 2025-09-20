#!/bin/bash

# Render build script for backend
echo "Building backend service..."

cd backend
npm install --production

echo "Backend build complete!"