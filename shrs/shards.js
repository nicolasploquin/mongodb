var shard0 = {
  _id:"shard0",
  members:[
    {_id:1, host:"localhost:27200",priority:2},
    {_id:2, host:"localhost:27201"},
    {_id:3, host:"localhost:27202"}
  ]
};
rs.initiate(shard0);

var shard1 = {
  _id:"shard1",
  members:[
    {_id:1, host:"localhost:27210",priority:2},
    {_id:2, host:"localhost:27211"},
    {_id:3, host:"localhost:27212"}
  ]
};
rs.initiate(shard1);
