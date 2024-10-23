<template>
  <div class="chat-container">
    <h2>Chat Room</h2>
    <div class="messages" ref="messageBox">
      <div v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.user }}:</strong> {{ msg.content }}
      </div>
    </div>
    <div class="chat-input">
      <input v-model="message" placeholder="Type a message..." @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/counter.js';

const userStore = useUserStore();
const messages = ref([]);
const message = ref('');
const ws = ref(null);

const sendMessage = async () => {
  if (!message.value.trim()) return;

  const messageContent = {
    content: message.value,
    user: userStore.user?.username || 'Anonymous',
  };
  console.log("ds : ",userStore.sessionToken);
  // 发送消息到服务器
  try {
    const response = await axios.post('http://localhost:3000/conversation',
      {
        content: messageContent.content,
      },
      {
        headers: {
          'Authorization': `Bearer ${userStore.sessionToken}`,
        },
      }
    );
    if (response.data.success) {
      // 将发送的消息推送到本地消息列表
      messages.value.push(messageContent);
      message.value = '';  // 清空输入框
      scrollToBottom();  // 滚动到底部
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Error during sending message');
  }
};

const scrollToBottom = () => {
  const messageBox = document.querySelector('.messages');
  messageBox.scrollTop = messageBox.scrollHeight;
};

// WebSocket 实时接收消息
onMounted(() => {
  ws.value = new WebSocket('ws://localhost:3000/ws');

  ws.value.onmessage = (event) => {
    const receivedMsg = JSON.parse(event.data);
    messages.value.push(receivedMsg);
    scrollToBottom();  // 滚动到底部
  };

  ws.value.onclose = () => {
    console.log('WebSocket connection closed');
  };
});
</script>

<style scoped>
.chat-container {
  width: 400px;
  margin: 0 auto;
  text-align: center;
}

.messages {
  height: 300px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.chat-input {
  display: flex;
  justify-content: space-between;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
