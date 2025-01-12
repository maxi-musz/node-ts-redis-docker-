import express from 'express';
import colors from "colors";

const router = express.Router();

router.get("/", (req, res) => {
    console.log(colors.yellow("This is the cuisines route"));
    res.send("Hello from the cuisines route");
    console.log(colors.cyan("Response sent"));
})

export default router;

// import express from 'express';

// const router = express.Router();

// export default router;