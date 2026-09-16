
import userRouter from './routers/users.js'
import chatsRouter from './routers/chatsroom.js'

import express, { type Express } from "express";

import path from "path"


const app:Express = express();
const port = process.env.PORT || 3000;





app.use(express.json());
const frontendDistPath = path.resolve(__dirname, "../dist");
app.use(express.static(frontendDistPath));

app.use('/users', userRouter)
app.use('/chatRoom',chatsRouter)




app.get("*splat", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});