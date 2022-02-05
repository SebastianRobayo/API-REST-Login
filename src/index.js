const express = require("express");
const app = express();
const cors = require("cors");

// Puerto
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Rutas
const router = require("./routes/router");
app.use("/api", router);

// Servidor corriendo
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
