local = db.getSiblingDB("local");
local.oplog.rs.find({op: {"$ne":"n"}}).limit(50).forEach(printjson);
