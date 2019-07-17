class ActivityRepository {
    //dbase;
    constructor(dbase) {
        this.dbase = dbase;
    }

    getAll(callback) {
        this.dbase.query('SELECT * from activities', [], (err, results) => {
            if (err) callback(err, null);
            callback(null, results);
        });
    }

    insertOne(req, callback) {
        console.log('request', req.body);
        this.dbase.query("INSERT INTO activities SET ?", req.body, (err, results) => {

            if (err) {
                console.log("error: ", err);
                return callback(err, null);
            }
            else {
                console.log(results.insertId);
                return callback(null, results.insertId);
            }
        })
    }

    updateOne(req, callback) {
        this.dbase.query(`UPDATE activities SET activity_type = '${req.body.activity_type}' WHERE id= ${req.params.id}`, (err, results) => {
            if (err) {
                console.log('error on update', err)
                return calllback(err, null);
            } else {
                return callback(null, results);
            }
        })
    }

    deleteOne(req, callback) {
        this.dbase.query(`DELETE FROM activities WHERE id=${req.params.id}`, (err, results) => {
            if (err) {
                console.log('error on update', err)
                return calllback(err, null);
            } else {
                return callback(null, results);
            }
        });
    }

}
module.exports = ActivityRepository;