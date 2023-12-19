import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.routes.js";
import mongoose from "mongoose";
import usersRoutes from './routes/users.routes.js'
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 3000;
const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/ecommerce'

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

(async () => {
  try {
    await mongoose.connect(MONGOOSE_URL);
    const httpServer = app.listen(PORT, () => {
      console.log(`Servicio activo en puerto ${PORT}`);
    });

    const chat_messages = [];

    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false,
      },
    });

    io.on("connection", (socket) => {
      socket.on("user_connected", (data) => {
        socket.broadcast.emit("user_connected", data);
      });

      socket.on("message", (data) => {
        // Consider storing a limited history of messages instead of pushing all messages
        chat_messages.push(data);
        io.emit("messageLogs", chat_messages);
      });
    });

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set("io", io);
    app.use("/", viewsRouter);
    app.use("/static", express.static(`${__dirname}/public`));
    app.use("/users", usersRoutes);
  } catch (error) {
    console.log(`Error al inicialiar servidor (${error.message})`);
  }
})();