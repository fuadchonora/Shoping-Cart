let MongoClient = require('mongodb').MongoClient;

let state = {
    db: null
};

module.exports.connect = function (done){
    if(state.db) return done();

    //connection URL
    const url = 'mongodb://localhost:27017';

    //Database Name
    const dbName = 'shopping';

    //Create new mongo Client
    const client = new MongoClient(url,{useNewUrlParser:true});

    //use connect method to connect to the server
    client.connect(function (err) {
        if(err)
            return done(err);

        //Connected Successfully
        const dbs = client.db(dbName);
        state.db = dbs;
        done();
    })
};

module.exports.get = function(){
    return state.db;
};