
// mongod.conf
//   authorization: enabled

var db = db.getSiblingDB("admin"); // use admin
db.auth("admin","password");

var userFormation = {
    user: "formation",
    pwd: <password>,
    roles: [{
        role: "readWrite", db:"banque"
    },{
        role: "readWrite", db:"association"
    }]
}; 

if(!db.getUser("formation")){
    db.createUser(userFormation);
}else{
    db.updateUser(userFormation);
}
