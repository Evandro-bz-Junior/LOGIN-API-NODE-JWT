import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);


app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});


//evandro
//Hy0cAO3eU921hkqy
//mongodb+srv://evandro:Hy0cAO3eU921hkqy@users.hynv8tg.mongodb.net/?retryWrites=true&w=majority&appName=Users