# Agent validation gate — run from repo root
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\..\web")
npm run validate
Write-Host "✓ validate passed"
