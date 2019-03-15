var cfg = {
  _id:"replicaset",
  members:[
    {_id:1, host:"localhost:27001", priority:2},
    {_id:2, host:"localhost:27002"},
    {_id:3, host:"localhost:27003"}
  ]
};

//rs.initiate(cfg);
rs.reconfig(cfg);
