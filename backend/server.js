const express = require("express");
const http = require("http");
const cors = require("cors");
const dotnev = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

dotnev.config();

const app = express();
const server = http.createServer(app);

const connectDb = require("./config/db");
connectDb();


app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/meetings",require("./routes/meetingRoutes"));
app.use("/api/emails",require("./routes/emailRoutes"));



const io = new Server(server,{
    cors:{
        origin:"*",
        methods: ["GET","POST"]
    }
});

require("./sockets")(io);

const PORT = process.env.PORT || 5001;
server.listen(PORT,()=>{
    console.log("server running")
})