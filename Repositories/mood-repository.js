class MoodRepository {
    //dbase;
    constructor(dbase) {
        this.dbase = dbase;
    }

    getAll(callback) {
        this.dbase.query('SELECT * from moods', [], (err, results) => {
            if (err) callback(err, null);
            callback(null, results);
        });
    }

    insertOne(req) {
        return new Promise((resolve, reject) => {
            console.log('request', req.body);
            this.dbase.query("INSERT INTO moods SET ?", req.body, (err, results) => {
                let response = req.body;
                if (err) {
                    console.log("error: ", err);
                    reject(err)
                }
                else {
                    //console.log(results);
                    response.id = results.insertId;
                    resolve(response);
                }
            })
        })
    }

    // insertOne(req, callback) {
    //     console.log('request', req.body);
    //     this.dbase.query("INSERT INTO moods SET ?", req.body, (err, results) => {
    //         let response = req.body;
    //         if (err) {
    //             console.log("error: ", err);
    //             return callback(err, null);
    //         }
    //         else {
    //             //console.log(results);
    //             response.id = results.insertId;
    //             return callback(null, response);
    //         }
    //     })
    // }

    updateOne(req, callback) {
        this.dbase.query(`UPDATE moods SET mood_type = '${req.body.mood_type}' WHERE id= ${req.params.id}`, (err, results) => {
            if (err) {
                console.log('error on update', err)
                return calllback(err, null);
            } else {
                return callback(null, results);
            }
        })
    }

    deleteOne(req, callback) {
        this.dbase.query(`DELETE FROM moods WHERE id=${req.params.id}`, (err, results) => {
            if (err) {
                console.log('error on update', err)
                return calllback(err, null);
            } else {
                return callback(null, results);
            }
        });
    }

}
module.exports = MoodRepository;