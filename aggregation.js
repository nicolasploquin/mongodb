// Selectionner la base admin pour s'authentifier en tant qu'utilisateur formation
db = db.getSiblingDB("admin"); 
db.auth("formation",<password>);

// Sélectionner la base banque
db = db.getSiblingDB("banque"); 

// compte n° 12345685

// db.clients.find({
//     "comptes.numero": 12345685
// }).forEach(printjson);

db.clients.aggregate([{
    $match: {"comptes.numero": 12345685}
},{
    $unwind: "$comptes"
},{
    $match: {"comptes.numero": 12345685}
},{
    $project: { 
        nom: true,
        prenom: true,
        numero: "$comptes.numero",
        solde: {$sum: "$comptes.operations.montant"},
        operations: "$comptes.operations"
    }
},{
    $project: { 
        "operations.date":false,
        "operations.type":false
    }
},{
    $out: "out_solde_compte"
}]);
// }]).forEach(printjson);




