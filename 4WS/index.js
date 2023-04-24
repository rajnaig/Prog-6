const { createApp } = Vue;

createApp({
  data() {
    return {
      currentStudent:  {
        id: "",
        name: "",
        isActive: false,
        birthYear: 0,
        connections: 0,
        completedCredits: 0,
        activeSemesterCount: 0,
        image: ""
      },
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
    rowColor() {
      return (status) => {
        if (status === true) {
          return "table-success";
        } else {
          return "table-danger";
        }
      };
    },
    borderColor(){
      return (status) => {
        if (status === true) {
          return "border border-success border-3";
        } else {
          return "border border-danger border-3";
        }
      };
    },
    studentNameColor(){
      return (status) => {
        if (status === true) {
          return "text-success";
        } else {
          return "text-danger";
        }
      };
    }
    
  },

  methods: {
    async fetchData() {
      const url = "https://practiceapi.nikprog.hu/Student";
      this.students = await (await fetch(url)).json();
      console.log(this.students);
    },
    logStudentInfo(student) {
      this.currentStudent  = student;
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
    addStudent(studentJson) {
      fetch('https://practiceapi.nikprog.hu/Student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: studentJson
      })
        .then
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.students.push(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async updateStudent() {
      if (this.currentStudent.id) {
        try {
          const response = await fetch(
            'https://practiceapi.nikprog.hu/Student/',
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.currentStudent),
            }
          );
    
          if (response.ok) {
            const updatedStudent = await response.json();
            const studentIndex = this.students.findIndex(
              (student) => student.id === updatedStudent.id
            );
    
            if (studentIndex !== -1) {
              this.students.splice(studentIndex, 1, updatedStudent);
            }
    
            console.log("Student updated:", updatedStudent);
          } else {
            console.error("Failed to update student");
          }
        } catch (error) {
          console.error("Error updating student:", error);
        }
      } else {
        console.error("No student selected for update");
      }
    },
  },
}).mount("#app");
