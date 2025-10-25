// students.js
// Simulated in-memory "database" for student accounts and registration data

// 🔹 Preloaded mock student data
const students = [
  {
    id: "001",
    name: "Jill Valentine",
    username: "jillv",
    password: "pass123",
    enrolledCourses: ["BIO101", "CHEM101"],
    blockedCourses: ["BIO201"]
  },
  {
    id: "002",
    name: "Chris Redfield",
    username: "chrisr",
    password: "pass123",
    enrolledCourses: ["HIST200"],
    blockedCourses: ["PHYS300"]
  },
  {
    id: "003",
    name: "Carlos Oliveira",
    username: "carlos",
    password: "pass123",
    enrolledCourses: ["MATH101"],
    blockedCourses: ["STAT250"]
  },
  {
    id: "004",
    name: "Ada Wong",
    username: "adaw",
    password: "pass123",
    enrolledCourses: ["CS101", "INFO300"],
    blockedCourses: ["INFO450"]
  },
  {
    id: "005",
    name: "Ethan Winters",
    username: "ethanw",
    password: "pass123",
    enrolledCourses: ["ENG111"],
    blockedCourses: ["PHIL230"]
  },
  {
    id: "006",
    name: "Draymond Green",
    username: "drayg",
    password: "pass123",
    enrolledCourses: ["MGMT210"],
    blockedCourses: ["FIN305"]
  },
  {
    id: "007",
    name: "James Bond",
    username: "jbond",
    password: "shaken007",
    enrolledCourses: ["SPY101"],
    blockedCourses: ["ETH300"]
  },
  {
    id: "008",
    name: "Arthur Morgan",
    username: "arthurm",
    password: "wildwest",
    enrolledCourses: ["HIST101"],
    blockedCourses: ["LAW205"]
  }
];

// 🔹 Register new student dynamically when a user creates an account
function addStudent(username, password) {
  // Generate a new ID based on next sequential number
  const newId = String(students.length + 1).padStart(3, "0");
  const newStudent = {
    id: newId,
    name: username, // or could be expanded later with full name
    username,
    password,
    enrolledCourses: [],
    blockedCourses: []
  };
  students.push(newStudent);
  console.log(`✅ Student added: ${username} (ID: ${newId})`);
  return newStudent;
}

// 🔹 Advisor search functions (for future UI integration)
function findStudentById(id) {
  return students.find(s => s.id === id);
}

function findStudentByName(name) {
  return students.filter(s =>
    s.name.toLowerCase().includes(name.toLowerCase())
  );
}

// 🔹 Prerequisite override simulation
function overridePrerequisite(studentId, courseCode) {
  const student = findStudentById(studentId);
  if (!student) {
    console.log("❌ Student not found");
    return "Student not found";
  }

  // Remove from blockedCourses if present
  const blockedIndex = student.blockedCourses.indexOf(courseCode);
  if (blockedIndex !== -1) {
    student.blockedCourses.splice(blockedIndex, 1);
  }

  // Add to enrolledCourses
  if (!student.enrolledCourses.includes(courseCode)) {
    student.enrolledCourses.push(courseCode);
  }

  console.log(`✅ ${student.name} successfully enrolled in ${courseCode}.`);
  return `${student.name} successfully enrolled in ${courseCode}.`;
}
