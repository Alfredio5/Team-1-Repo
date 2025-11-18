/****************************************************
 *  STUDENT DATA VERSIONING
 ****************************************************/

const STUDENTS_VERSION = "v4";  // bump version to FORCE reload

if (localStorage.getItem("studentsVersion") !== STUDENTS_VERSION) {
  console.warn("⚠️ Student data changed — resetting saved student data.");
  localStorage.removeItem("studentsData");
  localStorage.setItem("studentsVersion", STUDENTS_VERSION);
}

/****************************************************
 *  DEFAULT STUDENT LIST
 ****************************************************/

let students = JSON.parse(localStorage.getItem("studentsData")) || [

  {
    id: "001",
    name: "Jill Valentine",
    username: "jillv",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["BIOH250"]
  },
  {
    id: "002",
    name: "Chris Redfield",
    username: "chrisr",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["ENV200"]
  },
  {
    id: "003",
    name: "Carlos Oliveira",
    username: "carlos",
    password: "pass123",
    role: "student",
    enrolledCourses: [],
    blockedCourses: ["PHAR200"]
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

/****************************************************
 *  SAVE STUDENTS
 ****************************************************/
function persistStudents() {
  localStorage.setItem("studentsData", JSON.stringify(students));
}

/****************************************************
 *  ADVISOR OVERRIDE — FINAL SINGLE VERSION
 ****************************************************/
function overridePrerequisite(studentId, courseNum) {
  const student = students.find(s => s.id === studentId);
  const course = courses.find(c => c.number === courseNum);

  if (!student) return "Error: Student not found.";
  if (!course) return "Error: Course not found.";

  // Remove from blocked
  student.blockedCourses = student.blockedCourses.filter(c => c !== courseNum);

  // Expand class if needed (override allowed)
  if (course.enrolled >= course.max) {
    course.max++;  // automatically expand capacity
  }

  // Prevent duplicate
  if (!student.enrolledCourses.includes(courseNum)) {
    student.enrolledCourses.push(courseNum);
    course.enrolled++;
  }

  persistStudents();
  persistCourses();

  return `Override completed. ${student.name} is now enrolled in ${courseNum}.`;
}

/****************************************************
 *  UTILITIES
 ****************************************************/
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
