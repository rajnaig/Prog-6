import { Student } from './student.js'
import { createStudentArray } from './arrayCreator.js'
import { Renderer } from './renderer.js';



let ul = document.querySelector('#content');
let students = await createStudentArray()
let studentsCount = students.length
let studentsCount_p = document.querySelector("#studentsCount");
studentsCount_p.textContent += studentsCount;
console.log(students)
let renderer = new Renderer()
render()



// ----------------------------------------------
//             Render
// ----------------------------------------------
function render () {
    ul.innerHTML = renderer.renderStudentCards(students)

    document.querySelectorAll('#delete-student-btn').forEach(x => {
        x.addEventListener('click', deleteStudent)
    })

    document.querySelectorAll('#update-student-btn').forEach(x => {
      x.addEventListener('click', updateStudent)
    })
  }

  function updateStudent(e){
    let toUpdate = e.target.dataset.studId;
    
    // get the form inputs for the current student
    let nameInput = document.querySelector(`#detailsModal${toUpdate} #update-name`);
    let isActiveInput = document.querySelector(`#detailsModal${toUpdate} #update-isActive`);
    let birthYearInput = document.querySelector(`#detailsModal${toUpdate} #update-birthYear`);
    let connectionsInput = document.querySelector(`#detailsModal${toUpdate} #update-connections`);
    let completedCreditsInput = document.querySelector(`#detailsModal${toUpdate} #update-completedCredits`);
    let activeSemesterCountInput = document.querySelector(`#detailsModal${toUpdate} #update-activeSemesterCount`);
    let imageInput = document.querySelector(`#detailsModal${toUpdate} #update-image`);
    
    // update the student with the new values
    let updatedStudent = new Student(
      toUpdate,
      nameInput ? nameInput.value : '',
      isActiveInput ? isActiveInput.checked : false,
      birthYearInput ? birthYearInput.value : '',
      connectionsInput ? connectionsInput.value : '',
      completedCreditsInput ? completedCreditsInput.value : '',
      activeSemesterCountInput ? activeSemesterCountInput.value : '',
      imageInput ? imageInput.value : ''
    );
  
    // update the student on the server
    fetch("https://practiceapi.nikprog.hu/Student/", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: toUpdate, ...updatedStudent})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // update the student in the local array
      let index = students.findIndex(x => x.id === toUpdate);
      students[index] = updatedStudent;
      // re-render the student cards
      render();
    })
    .catch(error => console.log(error));
  }
  


  function deleteStudent(e) {
    let idToDelete = e.target.dataset.studId;
    if (confirm("Are you sure you want to delete this student?")) {
      fetch("https://practiceapi.nikprog.hu/Student/" + idToDelete, {
        method: "DELETE",
      })
      .then((response) => response.json())
      .then(data => {
        //remove from array
        let index = students.findIndex(x=>x.id === idToDelete)
        students.splice(index,1)
        //re-render table
        render()
      });
    }
  }
  

document
  .querySelector("#add-new-student-btn")
  .addEventListener("click", addNewStudent);


function addNewStudent() {
    console.log('test')
    let stud = new Student(
      "",
      document.querySelector("#input-name").value,
      document.querySelector("#input-isActive").checked,
      document.querySelector("#input-birthYear").value,
      document.querySelector("#input-connections").value,
      document.querySelector("#input-completedCredits").value,
      document.querySelector("#input-activeSemesterCount").value,
      document.querySelector("#input-image").value
    );
    fetch("https://practiceapi.nikprog.hu/Student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stud),
    })
  
      .then((response) => response.json())
      .then((data) => {
        console.log("SUCCESS:",data)
        //add response data to the array
        students.push(
          new Student(
            data.id,
            data.name,
            data.isActive,
            data.birthYear,
            data.connections,
            data.completedCredits,
            data.activeSemesterCount,
            data.image
          )
        );
        console.log(students)
  
        render()
      })
  
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }

// ----------------------------------------------
//             Dark Mode
// ----------------------------------------------

// function disableDarkModeByDefault() {
//     document.styleSheets[3].disabled = true;
//   }

// document
//     .querySelector("#flexSwitchCheckDefaultDarkMode")
//     .addEventListener("click", switchMode)

// function switchMode(){
//     document.styleSheets[3].disabled =!document.styleSheets[3].disabled
// }