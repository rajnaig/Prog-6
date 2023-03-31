import { Student } from './student.js'

async function createStudentArray() {
  let resp = await fetch("https://practiceapi.nikprog.hu/Student")
  let data = await resp.json()

  let studs = []
  data.forEach(item => {
      studs.push(new Student(
          item.id,
          item.name,
          item.isActive,
          item.birthYear,
          item.connections,
          item.completedCredits,
          item.activeSemesterCount,
          item.image
      ))
  })

  return studs
}

export { createStudentArray}



let fakeStudents = [
    {
      "id": 1,
      "name": "Sarah Johnson",
      "isActive": true,
      "birthYear": 2000,
      "connections": 256,
      "completedCredits": 48,
      "activeSemesterCount": 4,
      "image": "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      "id": 2,
      "name": "John Smith",
      "isActive": true,
      "birthYear": 2001,
      "connections": 135,
      "completedCredits": 32,
      "activeSemesterCount": 3,
      "image": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      "id": 3,
      "name": "Emily Davis",
      "isActive": false,
      "birthYear": 1999,
      "connections": 87,
      "completedCredits": 64,
      "activeSemesterCount": 6,
      "image": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      "id": 4,
      "name": "Michael Brown",
      "isActive": true,
      "birthYear": 2002,
      "connections": 42,
      "completedCredits": 24,
      "activeSemesterCount": 2,
      "image": "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ];