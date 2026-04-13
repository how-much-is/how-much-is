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


// import { defineStore } from 'pinia';

// export const useLoginStore = defineStore('login', {
//   state: () => ({
//     userId: localStorage.getItem("userId") || '',
//     isLogged: localStorage.getItem("isLogged") === "true",
//   }),
//   actions: {
//     login(id) {
//       this.userId = id;
//       this.isLogged = true;

//       localStorage.setItem("userId", id);
//       localStorage.setItem("isLogged", "true");
//     },
//     logout() {
//       this.userId = '';
//       this.isLogged = false;

//       localStorage.removeItem("userId");
//       localStorage.removeItem("isLogged");
//     }
//   },
// });