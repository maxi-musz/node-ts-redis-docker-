import express from "express";
import colors from "colors";
import restaurantsRouter from "./routes/restaurants";
import cuisinesRouter from "./routes/cuisines";
import { error } from "console";
import { errorHandler } from "./middlewares/errorHandler";

const PORT = process.env.PORT || 1500;
const app = express();

app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
    console.log(colors.blue("Hello from the root route"));
    res.send("Hello from the root route");
    console.log(colors.green("Response sent"));
})

// route imports
app.use("/restaurants", restaurantsRouter);
app.use("/cuisines", cuisinesRouter);

app.listen(PORT, () => {
    console.log(colors.magenta(`Application is running on port ${PORT}`));
}).on("error", (err) => {
    console.error(colors.red(err.message));
    throw new Error(err.message);
})
