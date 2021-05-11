
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
