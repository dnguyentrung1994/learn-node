const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const cors = require("cors");
const port = 5000;

app.use(cors());

// Add database information as needed
const connection = mysql
  .createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
  })
  .then((r) => {
    console.log("Connected to MySQL");
    return r;
  });
app.get("/test/:title", async (req, res) => {
  const { title } = req.params;
  const [result, _metadata] = await (
    await connection
  ).query(
    "SELECT * FROM document.drawing_master where Title like ? LIMIT 200;",
    [`%${title}%`]
  );

  return res.status(200).json(
    result.map((row) => ({
      製品番号: row.Title ?? "",
      名称: row.ExtProdName ?? "",
      設変: row.ExtChgNo ?? "",
      得意先: row.ExtCustCd ?? "",
      登録日: row.AddDate,
      更新日: row.UpdateDate,
      図面:
        row.Activate === "True"
          ? `http://172.16.0.17/document/${row.FileName}.${row.Prefix}`
          : "無し",
      画像:
        row.IdentifyActivate === "True"
          ? `http://172.16.0.17/identify/${row.FileName}.${row.Prefix}`
          : "無し",
    }))
  );
});

app.listen(port, () => {
  console.log("Connected to server!");
});
