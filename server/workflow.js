
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function send(ws, type, data) {
  ws.send(JSON.stringify({ type, data }));
}

export async function runWorkflowStream(name, ws) {
  send(ws, "start", "开始执行");

  const plan = ["写大纲", "扩展内容", "总结"];
  send(ws, "plan", plan);

  const results = [];

  for (const step of plan) {
    send(ws, "exec", step);

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "执行任务" },
        { role: "user", content: step }
      ]
    });

    const text = res.choices[0].message.content;
    results.push(text);
    send(ws, "result", text);
  }

  send(ws, "end", "完成");
}
