tab = [5,4,6,1,2,7,8,3];

printjson(
    tab
        .map( (val) => val * val )
        .reduce( function (val1,val2) { return val1 + val2; } )
);