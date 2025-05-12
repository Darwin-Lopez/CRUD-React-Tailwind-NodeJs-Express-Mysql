const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000;
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados",
});

app.use(cors());

app.use(express.json());

app.post("/create", (req, resp) => {
  const { id, nombre, edad, pais, cargo, anios } = req.body;

  db.query(
    "INSERT INTO empleados (id, nombre, edad, pais, cargo, anios) VALUES(?,?,?,?,?,?)",
    [id, nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        resp.send(result);
      }
    }
  );
});

app.get("/listar", (req, resp) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      resp.send(result);
    }
  });
});

app.put("/update", (req, resp) => {
  const { id, nombre, edad, pais, cargo, anios } = req.body;

  db.query(
    "UPDATE empleados SET nombre = ?, edad = ?, pais = ?, cargo = ?, anios = ? WHERE id = ?",
    [nombre, edad, pais, cargo, anios, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        resp.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, resp) => {
  const id = req.params.id;

  db.query("DELETE FROM empleados WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      resp.send("Usuario Eliminado con exito");
    }
  });
});

app.listen(port, () => {
  console.log("The server is running on port: " + port);
});
