$body1 = '{"logDate": "2024-01-15", "content": "Today worked on frontend setup.\nAdded component for displaying logs.\nEverything works great!"}'
$body2 = '{"logDate": "2024-01-14", "content": "Configured PostgreSQL database.\nCreated migrations via Liquibase.\nAll tables created successfully."}'
$body3 = '{"logDate": "2024-01-13", "content": "Started working on tlogger project.\nSet up Docker environment.\nEverything ready for development!"}'

try {
    $result1 = Invoke-RestMethod -Uri "http://localhost:8080/api/daily-logs" -Method Post -ContentType "application/json" -Body $body1
    Write-Host "Created log 1: $($result1.id)"
    
    $result2 = Invoke-RestMethod -Uri "http://localhost:8080/api/daily-logs" -Method Post -ContentType "application/json" -Body $body2
    Write-Host "Created log 2: $($result2.id)"
    
    $result3 = Invoke-RestMethod -Uri "http://localhost:8080/api/daily-logs" -Method Post -ContentType "application/json" -Body $body3
    Write-Host "Created log 3: $($result3.id)"
    
    Write-Host "All test data created successfully!"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
} 