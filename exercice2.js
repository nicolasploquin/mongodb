// Selectionner la base admin pour s'authentifier en tant qu'utilisateur formation
// db = db.getSiblingDB("admin"); 
// db.auth("formation",<password>);

// Sélectionner la base association
db = db.getSiblingDB("association"); 

// Suppression des Ateliers dont l'id est de type ObjectId
db.ateliers.remove({_id:{$type:"objectId"}});

// 1 - Insertion d'un nouvel atelier
var idAtel = db.ateliers.find()               // [{_id:1,intitule:"Peinture"},{...},...]
  .map( atel => atel._id )                    // [1,2,3,...]
  .reduce( (id1, id2) => Math.max(id1,id2) )  // 16
  + 1;

db.ateliers.insert({_id: idAtel, intitule:"VOILE"});

db.ateliers.find({},{intitule:true}).forEach(printjson);

// 2 - Augmentation des agent de 2%

db.animateurs.update({
  fonction: "Agent"
},{
  $mul: { cout_heure: 1.02 }
},{
  multi: true
});
db.animateurs.find({},{nom:true, fonction: true, cout_heure: true}).forEach(printjson);

db.animateurs.find({
  fonction: "Agent"
}).forEach( anim => {
  db.animateurs.update({
    _id: anim._id
  },{
    $set: { cout_heure: anim.cout_heure * 1.02 }
  });
});

// 3 - Ajouter l'adresse e-mail de l'adhérent 
db.adherents.update({nom:"PARKER"},{$set:{email:"eparker@mail.bzh"}});

// 4 - Suppression des activités le dimanche
db.activites.remove({jour:/DI/i});

// 5 - Regroupement des collection Ateliers et Activités

db.ateliers.update({},{ $unset: {activites:true} },{multi: true});

db.activites.find().forEach(act => {
  let atelier_id = act.atelier_id;
  delete act._id;        // supprimer la clé primaire de l'activite
  delete act.atelier_id; // supprimer la clé étrangère vers atelier
  db.ateliers.update({
    _id: atelier_id
  },{
    $push: {activites: act}
  })
});

printjson(db.ateliers.findOne({activites:{$exists:true}}));