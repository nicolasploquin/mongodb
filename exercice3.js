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


if(true){
    print("0 - Opérations du mois d'Avril 2016");
    db.clients.aggregate([{
        $unwind: "$comptes"
    }, {
        $unwind: "$comptes.operations"
    }, {
        $project: {
            _id: false,
            client_id: "$_id",
            nom: true,
            numero: "$comptes.numero",
            intitule: "$comptes.intitule",
            date: "$comptes.operations.date",
            libelle: "$comptes.operations.libelle",
            montant: "$comptes.operations.montant"
        }
    }, {
        $match: {
            date: {
                $gte: ISODate('2016-04-01'), 
                $lt: ISODate('2016-05-01')
            }
        }
    }, {
        $group: {
            _id: "$numero",
            numero: {$first: "$numero"},
            nom: {$first: "$nom"},
            intitule: {$first: "$intitule"},
            solde: {$sum: "$montant"},
            operations: {$sum: 1}               // count(*)
        }
    }, {
    //     $unwind: "$operations"
    // }, {
        $limit: 3
    }]).forEach(printjson);
}

