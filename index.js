const express = require('express');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
    host: "localhost",
    database: "inventory",
    user: "root",
    password: "",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Database connected");

    app.get("/", (req, res) => {
        const sql = "SELECT * FROM inventory";
        db.query(sql, (err, result) => {
            if (err) throw err;
            const users = result; // No need to JSON.stringify and parse
            res.render("index", { users: users, title: "DATABASE PERANGKAT" });
        });
    });

    app.post("/tambah", (req, res) => {
        const insertSql = "INSERT INTO inventory (NAMA, MITRA, PERANGKAT, NOMOR_REGISTRASI, TANGGAL) VALUES (?, ?, ?, ?, ?)";
        const values = [req.body.NAMA, req.body.MITRA, req.body.PERANGKAT, req.body.NOMOR_REGISTRASI, req.body.TANGGAL];
        db.query(insertSql, values, (err, result) => {
            if (err) throw err;
            res.redirect("/");
        });
    });
});

app.listen(8000, () => {
    console.log('Server ready');
});
