var Model = (function() {
    return {
        User: {
            tablename:"user",
            columns: [
                {name: "name", datatype: DataType.TEXT},
                {name: "email", datatype: DataType.TEXT},
                {name: "sex", datatype: DataType.INT},
                {name: "status", datatype: DataType.INT}
            ]
        }
    };
})();
