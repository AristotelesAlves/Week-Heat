import "dotenv/config"
import http from "http";
import  express  from "express";
import { router } from "./router";
import { Server } from "socket.io";
import cors from "cors";
import { Socket } from "socket.io/dist/socket";


const app = express();
const serverHttp = http.createServer(app); 

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});

io.on("Connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})
app.use(cors());
app.use(express.json());
app.use(router);

app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback", (request, response) => {
    const { code } = request.query;
    return response.json(code)
})

export { serverHttp, io}