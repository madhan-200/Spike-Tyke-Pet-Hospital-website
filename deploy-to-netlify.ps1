# Spike & Tyke Pet Hospital - Netlify Deploy Script (PowerShell)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Spike & Tyke Pet Hospital - Deploy Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if build exists
if (-Not (Test-Path "frontend/build")) {
    Write-Host "❌ Build directory not found. Building now..." -ForegroundColor Yellow
    Push-Location frontend
    npm run build
    Pop-Location
}
else {
    Write-Host "✅ Build directory found" -ForegroundColor Green
}

Write-Host ""
Write-Host "Deploying to Netlify..." -ForegroundColor Cyan
Write-Host ""

# Deploy using Netlify CLI
netlify deploy --prod --dir=frontend/build

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your site is now live!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Share the live URL" -ForegroundColor White
Write-Host "2. Get clinic owner's email" -ForegroundColor White
Write-Host "3. Configure Gmail SMTP" -ForegroundColor White
Write-Host "4. Enable email integration" -ForegroundColor White
Write-Host ""
