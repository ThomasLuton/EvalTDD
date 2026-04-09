import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/baskets", (request: Request, response: Response) => { });

app.post<number>("/totalPrice", (request: Request, response: Response) => {
    console.log(request.body)
    response.send(1)
})

export default app;
