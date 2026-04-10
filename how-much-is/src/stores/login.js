// import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    userId: '',
    isLogged: false,
  }),
  actions: {
    login(id) {
      this.userId = id;
      this.isLogged = true;
    },
  },
});
