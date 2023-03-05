import { ipcMain } from "electron";
import pg from "pg";

ipcMain.handle("make-db-connection", async (event, args) => {
  console.log(args, "DB args");
  const client = new pg.Client({
    host: args.url,
    port: args.port,
    user: args.userName,
    password: args.password,
  });
  await client.connect();

  const query = {
    name: "get-name",
    text: "SELECT datname FROM pg_database;",
    values: [],
    rowMode: "array",
  };

  return client
    .query(query)
    .then((res) => {
      return {
        success: true,
        message: "Operation successful",
        data: res.rows,
        resultCount: res.rowCount,
      };
    })
    .catch((err) => {
      return {
        success: false,
        message: "Connection failed",
        error: err,
      };
    });
});
