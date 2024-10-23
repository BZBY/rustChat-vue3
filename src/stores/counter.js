import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', () => {
  // 用户信息状态
  const user = ref(null);  // 保存用户信息
  const sessionToken = ref(null);  // 保存 session_token

  // 动作：设置用户信息和 session_token
  function setUser(userData, token) {
    user.value = userData;
    sessionToken.value = token;
  }

  // 动作：清空用户信息（例如在登出时）
  function logout() {
    user.value = null;
    sessionToken.value = null;
  }

  // 返回状态和方法
  return {
    user,
    sessionToken,
    setUser,
    logout,
  };
});
