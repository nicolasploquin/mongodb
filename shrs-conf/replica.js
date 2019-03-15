
// mongo --port 25001
var cfg = {
  _id:"config",
  members:[
    {_id:1, host:"localhost:25001",priority:2},
    {_id:2, host:"localhost:25002"},
    {_id:3, host:"localhost:25003"}
  ]
};
rs.initiate(cfg);
//rs.reconfig(cfg);

// mongo --port 27011
var shardA = {
  _id:"shardA",
  members:[
    {_id:1, host:"localhost:27011",priority:2},
    {_id:2, host:"localhost:27012"},
    {_id:3, host:"localhost:27013"}
  ]
};
rs.initiate(shardA);

// mongo --port 27021
var shardB = {
  _id:"shardB",
  members:[
    {_id:1, host:"localhost:27021",priority:2},
    {_id:2, host:"localhost:27022"},
    {_id:3, host:"localhost:27023"}
  ]
};
rs.initiate(shardB);
