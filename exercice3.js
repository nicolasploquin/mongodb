// Selectionner la base admin pour s'authentifier en tant qu'utilisateur formation
db = db.getSiblingDB("admin"); 
db.auth("formation",<password>);

// Sélectionner la base association
db = db.getSiblingDB("association"); 

db.ateliers.aggregate([{        // from ateliers
  $lookup: {                
    from: "inscriptions",       // left outer join inscriptions
    localField: "_id",          // on ateliers._id
    foreignField: "atelier_id", //   = inscriptions.atelier_id
    as: "inscriptions"         // {.., inscriptions:[], ...}
  }
},{
  $unwind: "$inscriptions"
// },{
//   $match: {_id:1}
},{
  $group: {
    _id: "$inscriptions.atelier_id",
    intitule: {$first: "$intitule"},
    genre: {$first: "$genre"},
    effectif: {$sum: 1}
  }
// },{
//   $count: "effectif"
}]).forEach(printjson);

