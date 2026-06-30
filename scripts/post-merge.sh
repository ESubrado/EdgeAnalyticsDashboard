#!/bin/bash
set -e

echo "Installing client dependencies..."
cd client && npm install --legacy-peer-deps --prefer-offline 2>/dev/null || npm install --legacy-peer-deps
cd ..

echo "Installing server dependencies..."
cd server && npm install --prefer-offline 2>/dev/null || npm install
cd ..

echo "Post-merge setup complete."
