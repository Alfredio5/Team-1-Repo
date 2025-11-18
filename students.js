// students.js
// Simulated in-memory "database" for user accounts (students & instructors)

// 🔹 Preloaded mock users (students + instructor)
const students = [
  {
    id: "001",
    name: "Jill Valentine",
    username: "jillv",
    password: "pass123",
    role: "student",
    enrolledCourses: ["BIO101", "CHEM101"],
    blockedCourses: ["BIO201"]
  },
  {
    id: "002",
    name: "Chris Redfield",
    username: "chrisr",
    password: "pass123",
    role: "student",
    enrolledCourses: ["HIST200"],
    blockedCourses: ["PHYS300"]
  },
  {
    id: "003",
    name: "Carlos Oliveira",
    username: "carlos",
    password: "pass123",
    role: "student",
    enrolledCourses: ["MATH101"],
    blockedCourses: ["STAT250"]
  },
  {
    id: "004",
    name: "Ada Wong",
    username: "adaw",
    password: "pass123",
    role: "student",
    enrolledCourses: ["CS101", "INFO300"],
    blockedCourses: ["INFO450"]
  },
  {
    id: "005",
    name: "Ethan Winters",
    username: "ethanw",
    password: "pass123",
    role: "student",
    enrolledCourses: ["ENG111"],
    blockedCourses: ["PHIL230"]
  },
  {
    id: "006",
    name: "Draymond Green",
    username: "drayg",
    password: "pass123",
    role: "student",
    enrolledCourses: ["MGMT210"],
    blockedCourses: ["FIN305"]
  },
  {
    id: "007",
    name: "James Bond",
    username: "jbond",
    password: "shaken007",
    role: "student",
    enrolledCourses: ["SPY101"],
    blockedCourses: ["ETH300"]
  },
  {
    id: "008",
    name: "Arthur Morgan",
    username: "arthurm",
    password: "wildwest",
    role: "student",
    enrolledCourses: ["HIST101"],
    blockedCourses: ["LAW205"]
  },

  // 🔹 Instructor Account (as requested)
  {
    id: "I001",
    name: "Dr. McGarry",
    username: "mcgarrym",
    password: "1234",
    role: "instructor",
    enrolledCourses: [],     // Instructors don't enroll in courses
    blockedCourses: []       // Not applicable
  }
];

// 🔹 Register new student dynamically when a user creates an account
function addStudent(username, password) {
  // Generate a new numeric ID padded to 3 digits
  const newId = String(students.length + 1).padStart(3, "0");
  const newStudent = {
    id: newId,
    name: username, // You can change this later to accept full name
    username,
    password,
    role: "student",
    enrolledCourses: [],
    blockedCourses: []
  };
  students.push(newStudent);
  console.log(`✅ Student added: ${username} (ID: ${newId})`);
  return newStudent;
}

// 🔹 Lookup Helpers
function findStudentById(id) {
  return students.find(s => s.id.toLowerCase() === id.toLowerCase());
}

function findStudentByName(name) {
  return students.filter(s =>
    s.name.toLowerCase().includes(name.toLowerCase())
  );
}

function findUserByUsername(username) {
  return students.find(s => s.username === username);
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
