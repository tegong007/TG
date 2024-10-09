module.exports = {
  async useDatebase(param = {}) {
    const fs = require("fs");
    const initSqlJs = require("sql.js");
    const { pathTool } = require("./toolkit");

    let result = [];
    const SQL = await initSqlJs();
    const path = pathTool("common/" + param.db + ".db", "exe");
    return new Promise((resolve, reject) => {
      let db = null;
      try {
        db = new SQL.Database(fs.readFileSync(path));
        if (param.sql.indexOf("select") == 0) {
          const data = db.exec(param.sql);
          if (data.length > 0) {
            data[0].values.forEach((element1) => {
              let obj = {};
              data[0].columns.forEach((element2, index2) => {
                obj[element2] = element1[index2];
              });
              result.push(obj);
            });
            resolve(result);
          } else {
            resolve(result);
          }
        } else if (param.sql.indexOf("update") == 0) {
          result = db.run(param.sql);
          fs.writeFileSync(path, Buffer.from(db.export()));
          db.close();
          resolve(result);
        }
      } catch (err) {
        if (db) db.close();
        reject(err);
      }
    });
  },
  useLibrary(param = {}) {
    const { open, load, close, DataType } = require("ffi-rs");

    return new Promise((resolve, reject) => {
      let result;
      try {
        if (param.open) {
          close(param.lib);
          open({ library: param.lib, path: param.path });
        }
        result = load({ library: param.lib, funcName: param.fName, retType: DataType.String, paramsType: [DataType.Boolean, DataType.String], paramsValue: [false, param.pValue] });
        if (param.close) close(param.lib);
        resolve(JSON.parse(result));
      } catch (err) {
        reject(err);
      }
    });
  },
};
