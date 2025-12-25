#!/bin/bash
# Spike & Tyke Pet Hospital - Netlify One-Click Deploy Script

echo "=========================================="
echo "Spike & Tyke Pet Hospital - Deploy Script"
echo "=========================================="
echo ""

# Check if build exists
if [ ! -d "frontend/build" ]; then
    echo "❌ Build directory not found. Building now..."
    cd frontend
    npm run build
    cd ..
else
    echo "✅ Build directory found"
fi

echo ""
echo "Deploying to Netlify..."
echo ""

# Deploy using Netlify CLI
netlify deploy --prod --dir=frontend/build

echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "Your site is now live!"
echo ""
echo "Next steps:"
echo "1. Share the live URL"
echo "2. Get clinic owner's email"
echo "3. Configure Gmail SMTP"
echo "4. Enable email integration"
echo ""
