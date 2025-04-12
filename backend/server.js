import {
  express,
  http,
  cors,
  Server,
  apiRouter,
  cookieParser,
  cookie,
  jwt,
  sequelize,
} from "./imports.js";

const PORT = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use("/assets", express.static("assets", { maxAge: 31536000 }));
app.use("/api", apiRouter);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

sequelize.sync({ force: false }).then(() => {
  console.log("database in sync!");
});

export const connectedUsers = {};

io.on("connection", (socket) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  
  try {
    jwt.verify(cookies.jwtToken, process.env.SECRET_KEY);
    const currentUserTag = jwt.decode(cookies.jwtToken).tag;
    connectedUsers[currentUserTag] = socket.id;
  } catch (err) {}
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});
