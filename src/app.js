import express from "express";
import catchAsync from "./utils/catchAsync.js";

import User from "./models/user.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).send("Hello! Welcome to my docker api!!");
});

app.get("/greet", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Assalamu alaikum brother!!"
    });
});

app.post("/user", catchAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });

    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: user,
    });
}));

app.get("/user", catchAsync(async (req, res) => {
    const { name } = req.query;
    const user = await User.findOne({ name });

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        });
    }

    res.status(200).json({
        status: "success",
        data: user
    });
}));


app.use((req, res, next) => {
    const err = new Error(`Can't find route on this server`);
    err.statusCode = 404;
    next(err);
});
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') console.error(err);

    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(status).json({
        success: false,
        message: message,
        code: err.code
    });
});

export default app;