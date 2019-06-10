const client = require('cheerio-httpcli');
const sqlite = require('sqlite3').verbose();

const url = "https://datalab.naver.com/keyword/realtimeList.naver";

let param = [];

const db = new sqlite.Database("real.sqlite");

db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS words(word, time)");

    let stmt = db.prepare("INSERT INTO words VALUES(?, ?)");

    client.fetch(url, param, (err, $, res)=>{
        if(err) {
            console.log("에러 발생");
            return;
        }

        let words = $(".rank_list .title");
        let time = $("._title_hms").text();
        
        words.each((idx, item)=>{
            let word = $(item).text();

            stmt.run([word, time]);
        })
    });
});