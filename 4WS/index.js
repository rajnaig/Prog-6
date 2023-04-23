const { createApp } = Vue

createApp({
  data() {
    return {
      students: [],
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const url =
        "https://practiceapi.nikprog.hu/Student";
      this.students = (await (await fetch(url)).json());
      console.log(this.students);
    },
  },
}).mount("#app");
