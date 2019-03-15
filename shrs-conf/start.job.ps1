
Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\config1.conf" }
Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\config2.conf" }
Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\config3.conf" }

Start-Job -ScriptBlock { mongos.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\router.conf" }

Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\shardA1.conf" }
Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\shardA2.conf" }
Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\shardA3.conf" }

Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\shardB1.conf" }
Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\shardB2.conf" }
Start-Job -ScriptBlock { mongod.exe --config "C:\_formations\_mongdb\formation-2019-03\shrs-conf\shardB3.conf" }
