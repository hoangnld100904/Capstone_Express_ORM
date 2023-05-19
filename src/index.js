const express = require("express");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.static("."));
//CORS
app.use(cors());

app.listen(8080);



//Setup Router
const rootRouter = require("./routers/rootRoute");
app.use("/api", rootRouter);
