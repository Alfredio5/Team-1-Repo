// =============================================
// students.js  (FINAL VERSION WITH PERSISTENCE)
// =============================================

// Load students from localStorage OR fallback to defaults
let students = JSON.parse(localStorage.getItem("studentsData")) || [
  {
    id: "001",
    name: "Jill Valentine",
    username: "jillv",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["BIO201"]
  },
  {
    id: "002",
    name: "Chris Redfield",
    username: "chrisr",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["PHYS300"]
  },
  {
    id: "003",
    name: "Carlos Oliveira",
    username: "carlos",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["STAT250"]
  },
  {
    id: "004",
    name: "Ada Wong",
    username: "adaw",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["INFO450"]
  },
  {
    id: "005",
    name: "Ethan Winters",
    username: "ethanw",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["PHIL230"]
  },
  {
    id: "006",
    name: "Draymond Green",
    username: "drayg",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["FIN305"]
  },
  {
    id: "007",
    name: "James Bond",
    username: "jbond",
    password: "shaken007",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["ETH300"]
  },
  {
    id: "008",
    name: "Arthur Morgan",
    username: "arthurm",
    password: "wildwest",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["LAW205"]
  },
  {
    id: "I001",
    name: "Dr. McGarry",
    username: "mcgarrym",
    password: "1234",
    role: "instructor",
    enrolledCourses: [],
    blockedCourses: []
  }
];

// =============================================
// SAVE STUDENT STATE
// =============================================
function persistStudents() {
  localStorage.setItem("studentsData", JSON.stringify(students));
}

// =============================================
// Helper Functions
// =============================================
function findUserByUsername(username) {
  return students.find(u => u.username === username);
}

function addStudent(username, password) {
  const newId = String(students.length + 1).padStart(3, "0");
  const newStudent = {
    id: newId,
    name: username,
    username,
    password,
    role: "student",
    enrolledCourses: [],
    blockedCourses: []
  };

  students.push(newStudent);
  persistStudents();
  return newStudent;
}
