import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.routes.js";
import mongoose from "mongoose";
import usersRoutes from "./routes/users.routes.js";
import productsRouter from "./routes/products.routes.js";
import usersRouter from "./routes/users.routes.js"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 3000;
//const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/ecommerce' --> LOCALHOST
const MONGOOSE_URL = "mongodb+srv://administrador:Admin1234@cluster0.wttbr2c.mongodb.net/ecommerce"; //Mongo Atlas en la nube

const app = express();

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRoutes);
app.use("/static", express.static(`${__dirname}/public`));

const startServer = async () => {
  try {
    await mongoose.connect(MONGOOSE_URL);
    const httpServer = app.listen(PORT, () => {
      console.log(`Backend activo en puerto ${PORT} conectado a BBDD`);
    });

    // Crear el servidor de Socket.IO después de iniciar el servidor Express
    const io = new Server(httpServer, {
      cors: {
        origin: "*", // Ajusta los orígenes permitidos según tu aplicación
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false,
      },
    });

    app.set("io", io); // Asignar io a la aplicación después de crearlo

    io.on("connection", (socket) => {
      try {
        // Manejadores de eventos de Socket.IO
        socket.on("user_connected", (data) => {
          socket.broadcast.emit("user_connected", data);
        });

        socket.on("message", (data) => {
          // Manejar el mensaje y almacenarlo en la base de datos o un servicio externo
          const message = {
            user: data.user,
            message: data.message,
            timestamp: new Date(),
          };
          // Almacenar el mensaje en la base de datos o un servicio externo

          io.emit("messageLogs", message); // Emitir los mensajes actualizados
        });
      } catch (error) {
        console.error("Error en Socket.IO:", error);
      }
    });
  } catch (error) {
    console.log(`Error al inicializar servidor (${error.message})`);
  }
};

startServer();
