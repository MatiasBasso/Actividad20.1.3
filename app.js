const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE MISTERIOSA";

// Aquí importamos los routers
const mobileRoute = require("./routes/mobileRoute");


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

app.use("/mobile_price", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

// Asociamos el router de people con la ruta /people
app.use("/mobile_price", mobileRoute);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
