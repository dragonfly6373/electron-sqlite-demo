var DataAdapter = (function() {
    var DB_NAME;
    var __connection;
    function getConnection() {
        if (__connection != null) return __connection;
        console.log("try to connect db:", DB_NAME);
        __connection = new sqlite3.Database(DB_NAME);
        return __connection;
    }
    function convertDataByType(value, datatype) {
        switch(datatype) {
            case DataType.INT:
            case DataType.REAL:
            case DataType.NUMERIC:
                return value ? value : 0;
            case DataType.TEXT:
            case DataType.BLOB:
                return "'" + value + "'";
            default:
                return value ? value : 0;
        }
    }
    return {
        connect: function(path, callback) {
            DB_NAME = path;
            __connection = getConnection();
            return __connection;
        },
        insert: function(clazz, data, callback) {
            console.log("Create:", clazz.tablename, data);
            var db = getConnection();
            var values = clazz.columns.map(col => {
                return convertDataByType(data[col.name], col.datatype);
            }).join(",");
            // conn.run("Update user Set name = '$name' where id = $id", {$name: "AAA", $id}, function(result) {
            //     console.log("result:", result);
            // });
            // return;
            db.run(String.format("INSERT INTO {0} ({1}) VALUES({2})", clazz.tablename, clazz.columns.map((col) => col.name).join(","), values),
                [],
                function(output) {
                    if (callback) callback(output);
                }
            );
        },
        insertMulti: function(clazz, list, callback) {
            console.log("Insert Multi:", clazz.tablename, data);
        },
        update: function(clazz, data, condition, callback) {
            console.log("Update:", clazz.tablename, data);
            var conn = getConnection();
            // conn.run("UPDATE ...");
        },
        delete: function(clazz, id, callback) {
            console.log("Delete:", clazz.tablename, id);
            var conn = getConnection();
            // conn.run("DELETE ...");
        },
        getAll: function(clazz, condition, callback) {
            console.log("Get all:", clazz.tablename, (condition ? " with condition " + condition.build() : ""));
            var db = getConnection();
            var sql = String.format("SELECT {0} FROM {1} WHERE {2}",
                        "rowid oid, " + clazz.columns.map((col)=> col.name).join(),
                        clazz.tablename,
                        condition ? condition.build() : "1 = 1");
            console.log("### SQL:", sql);
            db.all(sql, [], function(err, result) {
                    console.log("### getAll:", err, result);
                    if (!err) callback(result);
                });
        },
        getById: function(clazz, id, callback) {
            console.log("Get by Id:", clazz.tablename, id);
            var conn = getConnection();
            conn.get("SELECT * FROM $tablename WHERE id = $id", {$tablename: clazz.tablename, $id: id}, callback);
        },
        query: function(sql, callback) {
            console.log("Query by condition: ", clazz.tablename, condition);
            var conn = getConnection();
            conn.all("SELECT * FROM $tablename WHERE ")
        }
    }
})();

var DataType = { INT: 1, TEXT: 2, BLOB: 3, REAL: 4, NUMERIC: 5 };
