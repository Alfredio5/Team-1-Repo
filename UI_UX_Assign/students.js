/****************************************************
 *  STUDENT DATA VERSIONING
 ****************************************************/


const STUDENTS_VERSION = "v3";   // bump when student data changes

// If version mismatch → reset stored student data
if (localStorage.getItem("studentsVersion") !== STUDENTS_VERSION) {
  console.warn("⚠️ Student data changed — resetting saved student data.");
  localStorage.removeItem("studentsData");
  localStorage.setItem("studentsVersion", STUDENTS_VERSION);
}

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
    blockedCourses: ["BIOH250"]
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

/****************************************************
 *  ADVISOR OVERRIDE SYSTEM
 ****************************************************/

function overridePrerequisite(studentId, courseNumber) {
  const student = students.find(s => s.id === studentId);
  const course = courses.find(c => c.number === courseNumber);

  if (!student) return "Error: Student not found.";
  if (!course) return "Error: Course not found.";

  // If student already enrolled, skip
  if (student.enrolledCourses.includes(courseNumber)) {
    return `${student.name} is already enrolled in ${courseNumber}.`;
  }

  // If course is full — override still allowed?
  // Your instructions say advisors SHOULD override capacity.
  // If you want to block at capacity, tell me.
  if (course.enrolled >= course.max) {
    // course.max++ would "expand" class capacity automatically
    course.max++; 
  }

  // Remove from blocked courses
  student.blockedCourses = student.blockedCourses.filter(c => c !== courseNumber);

  // Add to enrolled
  student.enrolledCourses.push(courseNumber);
  course.enrolled++;

  // Save updated structures
  persistStudents();
  persistCourses();

  return `Override completed. ${student.name} is now enrolled in ${courseNumber}.`;
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

/****************************************************
 *  OVERRIDE PREREQUISITE & FORCE ENROLL
 ****************************************************/
function overridePrerequisite(studentId, courseNum) {
  const student = students.find(s => s.id === studentId);
  const course = courses.find(c => c.number === courseNum);

  if (!student) return "Student not found.";
  if (!course) return "Course not found.";

  // 1. Remove from blockedCourses
  student.blockedCourses = student.blockedCourses.filter(c => c !== courseNum);

  // 2. Prevent duplicate enrollment
  if (!student.enrolledCourses.includes(courseNum)) {
    student.enrolledCourses.push(courseNum);
    course.enrolled++;
  }

  // 3. Persist changes
  persistStudents();
  persistCourses();

  return `Override applied — ${student.name} enrolled in ${courseNum}.`;
}

