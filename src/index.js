const express = require("express");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.static("."));
//CORS
app.use(cors());

app.listen(8080);

// Prisma 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); //tương tự initModel của sequelize