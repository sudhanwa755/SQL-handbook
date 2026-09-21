while ($true) {
    # Check if there are any changes
    $status = git status --porcelain
    if ($status) {
        Write-Host "Changes detected. Syncing with GitHub..." -ForegroundColor Green
        
        # Add all changes
        git add .
        
        # Commit with a timestamp
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "Auto-sync: $timestamp"
        
        # Push to GitHub
        git push
        
        Write-Host "Sync complete!" -ForegroundColor Cyan
    }
    
    # Wait for 30 seconds before checking again
    Start-Sleep -Seconds 30
}
