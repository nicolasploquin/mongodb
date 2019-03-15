// Selectionner la base admin pour s'authentifier en tant qu'utilisateur formation
db = db.getSiblingDB("admin"); 
db.auth("formation",<password>);

// Sélectionner la base association
db = db.getSiblingDB("association"); 


// var cursor = 

function nomAdherent(adh){ 
    print(adh.nom); 
}
db.adherents.find().limit(10).forEach( nomAdherent );

db.adherents.find().limit(10).forEach( function(adh){ print(adh.nom); } );

db.adherents.find().limit(10).forEach( adh => print(adh.nom) );

db.adherents.find().limit(3).forEach(printjson);

var er1 = new RegExp("^nantes$", "i");
var er2 = /^na.tes$/i;
var er = /^n/i; // commence par N, like n%
var er = /n$/i; // termine par N, like %n

var erDate = /([0-9]{2}\/){2}\/\d{4}/; // jj/mm/aaaa


print( db.adherents.count({ville: {$regex: er1 } }) );
print( db.adherents.count({ville: { $regex: /^nantes$/i } }) );

db.adherents.find({
    ville:/^nantes$/i
},{
    _id:false,
    nom:true,
    prenom:true,
    ville:true
}).forEach(printjson);



// while(cursor.hasNext()){
    //     printjson(cursor.next());
    // }
    
    
    
   

// printjson( db.adherents.findOne() );
printjson( db.ateliers.findOne() );
printjson( db.activites.findOne() );
// printjson( db.animateurs.findOne() );
// printjson( db.inscriptions.findOne() );


{
    "_id" : 1,
    "intitule" : "ASTRONOMIE",
    "genre" : "SCIENCES",
    "vente_heure" : 12,
    "animateur_id" : 12,
    activites: [{
        "jour" : "MA",
        "duree" : 2
    }]
}
{
    "_id" : ObjectId("57485ceb56affddb9e98db04"),
    "atelier_id" : 1,
    "jour" : "MA",
    "duree" : 2
}