import express from "express";
import os from "node:os";

import config from "./config";
import apiRouter from "./api-router";
import serverRender from "./render";

const server = express();

server.use(express.static("dist"));

server.set("view engine", "ejs")

server.use("/api", apiRouter);

server.get("/", async (req, res) => {
    const { initialMarkup, initialData } = await serverRender();
    res.render("index", {
        initialMarkup,
        initialData,
    });
});

server.listen(config.PORT as number, config.HOST as string, () => {
    console.info(
        `O servidor express se encontra em ${config.SERVER_URL}`,
        `Free Mem: ${os.freemem() / 1024 / 1024}`,
    );
});