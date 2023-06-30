console.log('Task Manager App')
const express = require("express");
const router = require("./routes/taskRoutes");
const connectDb = require("./db/dbConnection");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const dotenv = require("dotenv").config();
// connectDb();

const app = express();
app.use(express.static('./public'));
app.use(express.json());



app.use("/api/v1/tasks", router);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = 3000;

const start = async () => {
    try {
        await connectDb();
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        });

    } catch (err) {
        console.log(err);

    }
}

start();
