import express from 'express';
import colors from "colors";

const router = express.Router();

router.get("/", (req, res) => {
    console.log(colors.yellow("This is the restaurants route"));
    res.send("Hello from the restaurants route");
    console.log(colors.cyan("Response sent"));
})



export default router;