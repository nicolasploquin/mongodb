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

# Shard A et B
$shardA = (Get-Content "$confPath\shardA1.conf" -Raw) | ConvertFrom-Yaml
$shardAPort = 27010
$shardADbPath = "$shardsPath\shardA"


$shardB = (Get-Content "$confPath\shardB1.conf" -Raw) | ConvertFrom-Yaml
$shardBPort = 27020
$shardBDbPath = "$shardsPath\shardB"

for ($i = 1; $i -le 3; $i++) {
    # Config
    $dbPath = "$configDbPath\$i"
    mkdir $dbPath
    
    $config.net.port = $configPort + $i
    $config.storage.dbPath = $dbPath
    $config.systemLog.path = "$shardsLogPath\config$i.log"
    
    $confFile = "$confPath\config$i.conf"
    
    ConvertTo-Yaml -Data $config | Out-File $confFile
    
    Start-Job -ScriptBlock { mongod.exe --config $args[0] } -ArgumentList $confFile

    # ShardA
    $dbPath = "$shardADbPath\$i"
    mkdir $dbPath
    
    $shardA.net.port = $shardAPort + $i
    $shardA.storage.dbPath = $dbPath
    $shardA.systemLog.path = "$shardsLogPath\shardA$i.log"
    
    $confFile = "$confPath\shardA$i.conf"
    
    ConvertTo-Yaml -Data $shardA | Out-File $confFile
    
    Start-Job -ScriptBlock { mongod.exe --config $args[0] } -ArgumentList $confFile

    # ShardB
    $dbPath = "$shardBDbPath\$i"
    mkdir $dbPath
    
    $shardB.net.port = $shardBPort + $i
    $shardB.storage.dbPath = $dbPath
    $shardB.systemLog.path = "$shardsLogPath\shardB$i.log"
    
    $confFile = "$confPath\shardB$i.conf"
    
    ConvertTo-Yaml -Data $shardB | Out-File $confFile
    
    Start-Job -ScriptBlock { mongod.exe --config $args[0] } -ArgumentList $confFile
}

while( -not (Test-NetConnection -ComputerName 127.0.0.1 -Port $($configPort+1)).TcpTestSucceeded ){
    Start-Sleep -Seconds 2
}

mongo.exe --host localhost:$($configPort+1) $confPath\config.js
mongo.exe --host localhost:$($shardBPort+1) $confPath\replica.js

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
