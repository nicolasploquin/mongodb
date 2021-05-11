Get-Job | 
    Where-Object {($_.State -eq "Completed") -or ($_.Command -like "*mongo*")} | 
    Remove-Job -Force
