// Enregistrer les Shards auprès du router
// Au moins une instance de chaque replica shards

sh.addShard("shardA/localhost:27011"); // shardA/localhost:27011,localhost:27012,localhost:27013
sh.addShard("shardB/localhost:27021");


// Créer une collection "shardé"
use banque
sh.enableSharding("banque")
sh.shardCollection("banque.clients",{nom:"hashed"})

// Analyse des blocs de données (répartition)
use config
db.chunks.find().pretty()

// Stats database et collection
use banque
db.clients.stats()
