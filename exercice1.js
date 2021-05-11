// Selectionner la base admin pour s'authentifier en tant qu'utilisateur formation
// db = db.getSiblingDB("admin"); 
// db.auth("formation",<password>);

// Sélectionner la base association
db = db.getSiblingDB("adherentdb-1"); 

if(false){
  print("1 - listes des adhérents qui habite à Nantes");
  db.adherents.find(
    {ville: /NANTES/i},
    {_id:0, nom:1, prenom:1, ville:1}
    )
    .sort({nom: 1})
    .forEach(printjson)
  ;
}
  
if(false){

print("2 - Liste des adhérent qui ont entre 30 et 40 ans");
db.adherents.find(
  { age:{ $gte:30, $lt:40 }},
  {_id:false, nom:true, prenom:true, age:true}
).forEach(printjson);

}

if(false){ 
  print("3 - Nombre d'ateliers de genre SPORT");

  let atelierSport = db.ateliers.count({genre: /SPORT/i });
  print(`    ${atelierSport} ateliers de genre sport.`);

  db.ateliers.find(
    {genre:'SPORT'},
    {_id:0, intitule:1, genre:1}
  ).forEach(printjson);

}

if(false){
  
  print("4 - Liste des adhérents dont le nom commence par la lettre M");
  db.adherents.find(
    { nom: /^m/i },
    {_id:0, nom:true, prenom:true, ville:true, age:true}
  ).forEach(printjson);
}

if(true){
print("5 - Liste des animateurs qui n'ont pas de responsable");
db.animateurs.find(
  { resp_id: { $exists:false } },
  { _id:0, nom:true, prenom:true, fonction:true}
).forEach(printjson);
}

if(true){
  
print("6 - Adhérents nés après le 1er janvier 1980");
db.adherents.find(
    {naissance: {$gte: ISODate("1980-01-01")}}, // ISODate("1980-01-01T00:00:00Z")
    {_id:0, nom:true, prenom:true, age:true, naissance: true}
).forEach(printjson);
    
}
