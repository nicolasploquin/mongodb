$shardsPath = "C:\_applications\mongodb\shrs2"
$confPath = "C:\_formations\_mongdb\formation-2019-03\shrs-conf"

New-Item -ItemType Directory -Path "$shardsPath\log"
New-Item -ItemType Directory -Path "$shardsPath\config\1"
New-Item -ItemType Directory -Path "$shardsPath\config\2"
New-Item -ItemType Directory -Path "$shardsPath\config\3"
New-Item -ItemType Directory -Path "$shardsPath\shardA\1"
New-Item -ItemType Directory -Path "$shardsPath\shardA\2"
New-Item -ItemType Directory -Path "$shardsPath\shardA\3"
New-Item -ItemType Directory -Path "$shardsPath\shardB\1"
New-Item -ItemType Directory -Path "$shardsPath\shardB\2"
New-Item -ItemType Directory -Path "$shardsPath\shardB\3"

for ($i = 1; $i -le 3; $i++) {
    Start-Job -ScriptBlock { mongod.exe --config "$confPath\config$i.conf" }
}

Start-Job -ScriptBlock { mongos.exe --config "$confPath\router.conf" }

Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardA1.conf" }
Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardA2.conf" }
Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardA3.conf" }

Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardB1.conf" }
Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardB2.conf" }
Start-Job -ScriptBlock { mongod.exe --config "$confPath\shardB3.conf" }
