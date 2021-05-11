if ( (Get-Module -ListAvailable | where Name -eq "powershell-yaml").Count -eq 0 ) { 
    echo "Module powershell-yaml requis"
    echo "Executer la commande "Install-Module powershell-yaml" en tant qu'administrateur"
    exit 1
} else { 
    echo "Module powershell-yaml présent"
}

$shardsPath = "C:\_applications\mongodb\shrs4"
$shardsLogPath = "$shardsPath\log"
$confPath = "C:\_formations\_mongdb\formation-2019-03\shrs-conf"

mkdir $shardsLogPath

# Récupération du template config
$config = (Get-Content "$confPath\config.conf" -Raw) | ConvertFrom-Yaml
$configPort = 25000
$configDbPath = "$shardsPath\config"

for ($i = 1; $i -le 3; $i++) {
    $dbPath = "$configDbPath\$i"
    mkdir $dbPath
    
    $config.net.port = $configPort + $i
    $config.storage.dbPath = $dbPath
    $config.systemLog.path = "$shardsLogPath\config$i.log"
    
    $confFile = "$confPath\config$i.conf"
    
    ConvertTo-Yaml -Data $config | Out-File $confFile
    
    Start-Job -ScriptBlock { mongod.exe --config $args[0] } -ArgumentList $confFile
}

while( -not (Test-NetConnection -ComputerName 127.0.0.1 -Port $($configPort+1)).TcpTestSucceeded ){
    Start-Sleep -Seconds 2
}

mongo.exe --host localhost:$($configPort+1) $confPath\config.js

$router = (Get-Content "$confPath\router.conf" -Raw) | ConvertFrom-Yaml
$router.net.port = 26000
$router.systemLog.path = "$shardsLogPath\router.log"

$routerFile = "$confPath\router.conf"
ConvertTo-Yaml -Data $router | Out-File $routerFile

Start-Job -ScriptBlock { mongos.exe --config $args[0] } -ArgumentList $routerFile

# New-Item -ItemType Directory -Path "$shardsPath\shardA\1"
# New-Item -ItemType Directory -Path "$shardsPath\shardA\2"
# New-Item -ItemType Directory -Path "$shardsPath\shardA\3"
# New-Item -ItemType Directory -Path "$shardsPath\shardB\1"
# New-Item -ItemType Directory -Path "$shardsPath\shardB\2"
# New-Item -ItemType Directory -Path "$shardsPath\shardB\3"

# Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardA1.conf" }
# Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardA2.conf" }
# Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardA3.conf" }

# Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardB1.conf" }
# Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardB2.conf" }
# Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardB3.conf" }
