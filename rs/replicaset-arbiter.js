var cfg = {
  _id:"replicaArbiter",
  members:[
    {_id:4, host:"localhost:27004"},
    {_id:5, host:"localhost:27005"},
    {_id:6, host:"localhost:27006", arbiterOnly: true}
  ]
};

rs.initiate(cfg);
//rs.reconfig(cfg);
