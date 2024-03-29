import mongoose from "mongoose";
import { color } from "../functions";

mongoose.set("strictQuery", true);

module.exports = () => {
    const MONGO_URI: string = process.env.MONGO_URI;
    if (!MONGO_URI) return console.log(color("text", `🍃 Mongo URI not found, ${color("error", "skipping.")}`));
    mongoose
        .connect(`${MONGO_URI}`, { dbName: process.env.MONGO_DATABASE_NAME })
        .then(() => console.log(color("text", `🍃 MongoDB connection has been ${color("variable", "established.")}`)))
        .catch(() => console.log(color("text", `🍃 MongoDB connection has been ${color("error", "failed.")}`)));
};
