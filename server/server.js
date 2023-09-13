const express = require("express");
const knex = require("knex")(
    require("./database/knexfile.js")[process.env.NODE_ENV || "development"]
);
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// {marker_id: 0, latitude: "39.056198", longitude: "-95.695312"}
// Read
app.get("/", async (req, res) => {
    try {
        const data = await knex("markers")
            .select("*")
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "We're sorry. All our representatives are currently helping other customers. Please call again later." });
    }
});
// Create
app.post("/", async (req, res) => {
    try {
        await knex("markers").insert({
            marker_id: req.body.marker_id,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });
        const data = await knex("markers").select("*")
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "We're sorry. All our representatives are currently helping other customers. Please call again later." });
    }
});
//Update
app.patch("/", async (req, res) => {
    try {
        if (req.body.marker_id !== undefined) {
            await knex("markers").where("marker_id", req.body.marker_id).update({
                latitude: req.body.latitude,
                longitude: req.body.longitude
            })
        }
        const data = await knex("markers").select("*")
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "We're sorry. All our representatives are currently helping other customers. Please call again later." });
    }
});

// Fetch: `http://localhost:8080?marker_id=${newDelete.marker_id}`
//Delete
app.delete("/", async (req, res) => {
    try {
        let { marker_id } = req.query;

        if (marker_id !== undefined) {
            await knex("markers").where("marker_id", marker_id).del();
            const data = await knex("markers").select("*")
            res.status(200).json(data);
        } else {
            const data = await knex("markers").select("*")
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "We're sorry. All our representatives are currently helping other customers. Please call again later." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});