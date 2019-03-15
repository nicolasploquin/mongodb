
mongod --config ./rs/repl1.conf
mongod --config ./rs/repl2.conf
mongod --config ./rs/repl3.conf

mongo replicaset.js --port 27001 --shell
