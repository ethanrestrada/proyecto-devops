const express = require("express");
require("dotenv").config();

const sequelize = require("./db/db");
const ClienteRoutes = require("./routes/cliente.routes");
const ClienteModel = require("./models/cliente.model");

const app = express();
app.use(express.json());
var cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//Maquetar las rutas
app.use("/", ClienteRoutes);

async function connectWithRetry(retries = 15, delay = 3000) {
  while (retries) {
    try {
      await sequelize.authenticate();
      return true;
    } catch (e) {
      retries--;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("DB error");
}

(async () => {
  await connectWithRetry();
  await sequelize.sync();
  app.listen(3001, "0.0.0.0", () => {
    console.log("Backend escuchando en 3001");
    console.log("Cambio 2");
  });
})();
