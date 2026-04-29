
import express from "express";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { runWorkflowStream } from "./workflow.js";

dotenv.config();
const app = express();

const server = app.listen(process.env.PORT, () => {
  console.log("Server running on 3000");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", async (msg) => {
    const { workflowName } = JSON.parse(msg);
    await runWorkflowStream(workflowName, ws);
  });
});
