const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("test.sqlite");

db.serialize(()=>{//순차적으로 실행하게만듬
    db.run("CREATE TABLE IF NOT EXISTS items(name,value)");//존재하지않으면 만들어라
    
    let stmt = db.prepare("INSERT INTO items VALUES(?,?)");
    stmt.run(["gondr",59]);
    stmt.run(["gondr99",22]);
    stmt.run(["abcd",23]);

    stmt.finalize();//없으면 실행안됌
    // npm init -y
    // npm install --save cheerio-httpcli request
    //npm i --save sqlite3
    //node sqlite
    //https://sqlitebrowser.org/
});