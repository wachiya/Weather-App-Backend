
class SqlQuery {

    constructor(connection) {
        this.connection = connection;
    }
   
    query(query, params, callback) { //command
        this.connection.beginTransaction((err) => {
            this.connection.query(query, params, (err, result) => {
                if (err) { 
                    this.connection.rollback(); 
                    callback(err, null);
                }
                callback(null, result);
            });
        });
    }

    complete() {
        this.connection.commit((err) => { //TODO: Proper error-handling
            this.connection.release();
        });
    }
}
module.exports = SqlQuery;