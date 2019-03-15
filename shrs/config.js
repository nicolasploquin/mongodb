var cfg = {
  _id:"config",
  members:[
    {_id:1, host:"localhost:25200",priority:2},
    {_id:2, host:"localhost:25201"},
    {_id:3, host:"localhost:25202"}
  ]
};

//rs.initiate(cfg);
rs.reconfig(cfg);
