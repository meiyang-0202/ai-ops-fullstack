
<template>
  <div>
    <button @click="run">运行</button>
    <div v-for="(l,i) in logs" :key="i">{{l}}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const logs = ref([]);
let ws;

function connect() {
  ws = new WebSocket("ws://localhost:3000");

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    logs.value.push(msg.type + ": " + JSON.stringify(msg.data));
  };
}

function run() {
  logs.value = [];
  if (!ws) connect();
  setTimeout(()=>{
    ws.send(JSON.stringify({ workflowName: "demo" }));
  },500);
}
</script>
