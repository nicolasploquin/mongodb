
// mongod.conf
//   authorization: disabled

db = db.getSiblingDB("admin"); // use admin

if(db.getUser("admin")){
    db.dropAllUsers();
}
db.createUser({
    user: "admin",
    pwd: <password>,
    // roles: ["root"]
    roles: [{
        role: "userAdminAnyDatabase", 
        db:"admin"
    },{
        role: "dbAdminAnyDatabase", 
        db:"admin"
    },{
        role: "readWriteAnyDatabase", 
        db:"admin"
    }]
});

// Ajouter des roles à l'utilisateur admin
// Rôles nécessaires pour exécuter les commandes mongodump, mongorestore
db = db.getSiblingDB("admin");
db.auth("admin", <password>);

db.grantRolesToUser("admin",[{
    role: "dbAdminAnyDatabase", 
    db:"admin"
},{
    role: "readWriteAnyDatabase", 
    db:"admin"
}]);

// db.changeUserPassword(username, <password>)