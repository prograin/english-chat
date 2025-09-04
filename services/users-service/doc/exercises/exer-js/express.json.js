import express from "express";

const app = express();

app.use(express.json()); //For parsing json req if there is
