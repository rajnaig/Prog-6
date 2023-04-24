const { createApp } = Vue;

createApp({
  data() {
    return {
      students: [],
    };
  },

  created() {
    this.fetchData();
  },
  computed: {
    studentCounter() {
      return this.students.length;
    },
    
  },

  methods: {
    async fetchData() {
      const url = "https://practiceapi.nikprog.hu/Student";
      this.students = await (await fetch(url)).json();
      console.log(this.students);
    },
    logStudentInfo(student) {
      console.log("Student Information:");
      console.log("ID:", student.id);
      console.log("Name:", student.name);
      console.log("Active:", student.isActive);
      console.log("Birth Year:", student.birthYear);
      console.log("Connections:", student.connections);
      console.log("Completed Credits:", student.completedCredits);
      console.log("Active Semester Count:", student.activeSemesterCount);
    },
    async deleteStudentById(studentId) {
      if (confirm("Are you sure you want to delete this student?")) {
        try {
         await fetch(
            `https://practiceapi.nikprog.hu/Student/${studentId}`,
            {
              method: "DELETE",
            }
          );
          
          // Remove the student from the array
          this.students = this.students.filter(
            (student) => student.id !== studentId
          );
        } catch (error) {
          console.error("Error deleting student:", error);
        }
      }
    },
  },
}).mount("#app");
