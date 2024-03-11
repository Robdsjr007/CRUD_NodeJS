import express from "express";
import cors from "cors";
import { connectClient } from "./db";

const router = express.Router();
router.use(cors());

router.get("/contests", async (req, res) => {
    try {
        // Pega os dados do MongoDB
        const client = await connectClient();

        const contests = await client.collection("contests")
            .find()
            .project({
                id: 1,
                categoryName: 1,
                contestName: 1,
                _id: 0,
            })
            .toArray();

        res.send({ contests });
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

router.get("/contests/:contestId", async (req, res) => {
    try {
        const client = await connectClient();

        const contest = await client
            .collection("contests")
            .findOne({ id: req.params.contestId });

        res.send({ contest });
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

export default router;
