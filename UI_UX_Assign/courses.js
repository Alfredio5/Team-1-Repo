/****************************************************
 *  COURSES.JS — FINAL CLEAN VERSION
 ****************************************************/

/* ==================================================
   DATA VERSIONING (Auto-reset when structure changes)
================================================== */
const COURSES_VERSION = "v3";

if (localStorage.getItem("coursesVersion") !== COURSES_VERSION) {
  console.warn("⚠️ Course data changed — resetting saved course data.");
  localStorage.removeItem("coursesData");
  localStorage.setItem("coursesVersion", COURSES_VERSION);
}

/* ==================================================
   COURSE DATA (Default if storage empty)
================================================== */
let courses = JSON.parse(localStorage.getItem("coursesData")) || [
  { number: "INFO450", department: "INFO", instructor: "Dr. McGarry",
    credits: 3, prereq: "INFO300", modality: "Hybrid",
    max: 30, enrolled: 10,
    meetingDays: ["Mon","Wed","Fri"], startTime: 10.00, endTime: 10.83 },

  { number: "INFO465", department: "INFO", instructor: "Dr. McGarry",
    credits: 3, prereq: "INFO300", modality: "Hybrid",
    max: 30, enrolled: 10,
    meetingDays: ["Tue","Thu"], startTime: 14.00, endTime: 15.25 },

  { number: "INFO420", department: "INFO", instructor: "Dr. McGarry",
    credits: 3, prereq: "INFO300", modality: "Hybrid",
    max: 30, enrolled: 10,
    meetingDays: ["Mon","Wed"], startTime: 13.00, endTime: 14.25 },

  // Extra instructors & courses...
  { number: "SCMA320", department: "SCMA", instructor: "Dr. Johnson",
    credits: 3, prereq: "MATH200", modality: "In-person",
    max: 40, enrolled: 25,
    meetingDays: ["Mon","Wed","Fri"], startTime: 9.00, endTime: 9.83 },

  { number: "MGMT303", department: "MGMT", instructor: "Dr. Ruiz",
    credits: 3, prereq: "MGMT210", modality: "In-person",
    max: 40, enrolled: 5,
    meetingDays: ["Tue","Thu"], startTime: 11.00, endTime: 12.25 },

  { number: "ACCT204", department: "ACCT", instructor: "Dr. Krumwiedie",
    credits: 3, prereq: "ACT203", modality: "In-person",
    max: 40, enrolled: 35,
    meetingDays: ["Mon","Wed"], startTime: 15.00, endTime: 16.25 },

  { number: "MATH200", department: "MATH", instructor: "Dr. Lee",
    credits: 4, prereq: "None", modality: "Hybrid",
    max: 35, enrolled: 20,
    meetingDays: ["Tue","Thu"], startTime: 9.30, endTime: 10.75 },

  { number: "HIST300", department: "HIST", instructor: "Dr. Astarion",
    credits: 3, prereq: "HIST200", modality: "In-person",
    max: 35, enrolled: 18,
    meetingDays: ["Mon","Wed","Fri"], startTime: 8.00, endTime: 8.83 },

  { number: "LANG320", department: "LANG", instructor: "Dr. Astarion",
    credits: 3, prereq: "LANG101", modality: "Hybrid",
    max: 30, enrolled: 12,
    meetingDays: ["Tue","Thu"], startTime: 12.30, endTime: 13.75 },

  { number: "DART452", department: "DART", instructor: "Dr. Astarion",
    credits: 4, prereq: "DART300", modality: "Online",
    max: 40, enrolled: 20,
    meetingDays: ["Mon"], startTime: 16.00, endTime: 18.00 },

  { number: "PHAR200", department: "PHAR", instructor: "Dr. Mario",
    credits: 4, prereq: "CHEM101", modality: "In-person",
    max: 35, enrolled: 22,
    meetingDays: ["Mon","Wed"], startTime: 13.00, endTime: 14.25 },

  { number: "MEDI300", department: "MEDI", instructor: "Dr. Mario",
    credits: 3, prereq: "BIOL150", modality: "Hybrid",
    max: 40, enrolled: 25,
    meetingDays: ["Tue","Thu"], startTime: 15.00, endTime: 16.25 },

  { number: "MBIO350", department: "MBIO", instructor: "Dr. Mario",
    credits: 4, prereq: "MBIO200", modality: "In-person",
    max: 30, enrolled: 15,
    meetingDays: ["Fri"], startTime: 10.00, endTime: 12.00 },

  { number: "FORE303", department: "FORE", instructor: "Dr. Kennedy",
    credits: 3, prereq: "FORE150", modality: "In-person",
    max: 40, enrolled: 28,
    meetingDays: ["Tue","Thu"], startTime: 10.00, endTime: 11.25 },

  { number: "ENV200", department: "ENV", instructor: "Dr. Kennedy",
    credits: 3, prereq: "ENV100", modality: "Hybrid",
    max: 35, enrolled: 19,
    meetingDays: ["Mon","Wed"], startTime: 14.30, endTime: 15.75 },

  { number: "BIOH250", department: "BIOH", instructor: "Dr. Kennedy",
    credits: 4, prereq: "BIOH101", modality: "Online",
    max: 30, enrolled: 14,
    meetingDays: ["Thu"], startTime: 16.00, endTime: 18.00 }
];

/* ==================================================
   SAVE COURSES
================================================== */
function persistCourses() {
  localStorage.setItem("coursesData", JSON.stringify(courses));
}

/* ==================================================
   TIME FORMATTER
================================================== */
function formatTime(t) {
  let hour = Math.floor(t);
  let minutes = Math.round((t - hour) * 60);
  let suffix = hour >= 12 ? "PM" : "AM";

  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}

/* ==================================================
   DISPLAY COURSES (Course Search Page)
================================================== */
function displayCourses(courseList) {
  const table = document.querySelector("#resultsTable tbody");
  if (!table) return; // Avoid error on pages without table

  table.innerHTML = "";

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  courseList.forEach(course => {
    const seatsLeft = course.max - course.enrolled;

    let button = `<button onclick="enroll('${course.number}')">Enroll</button>`;

    if (user?.role === "student") {
      const st = students.find(s => s.username === user.username);
      if (st?.enrolledCourses.includes(course.number)) {
        button = `<button onclick="unenroll('${course.number}')" class="unenroll-btn">Unenroll</button>`;
      }
    }

    table.innerHTML += `
      <tr>
        <td>${course.number}</td>
        <td>${course.department}</td>
        <td>${course.instructor}</td>
        <td>${course.credits}</td>
        <td>${course.prereq}</td>
        <td>${course.meetingDays.join(", ")}</td>
        <td>${formatTime(course.startTime)} - ${formatTime(course.endTime)}</td>
        <td>${course.modality}</td>
        <td>${course.enrolled} / ${course.max} (${seatsLeft} left)</td>
        <td>${button}</td>
      </tr>
    `;
  });
}

/* ==================================================
   TIME CONFLICT CHECK
================================================== */
function hasTimeConflict(course, student) {
  const enrolled = student.enrolledCourses
    .map(code => courses.find(x => x.number === code))
    .filter(Boolean);

  for (let existing of enrolled) {
    const sharedDay = existing.meetingDays.some(d => course.meetingDays.includes(d));
    if (!sharedDay) continue;

    const overlap =
      !(course.endTime <= existing.startTime ||
        course.startTime >= existing.endTime);

    if (overlap) return existing.number;
  }

  return null;
}

/* ==================================================
   ENROLL
================================================== */
function enroll(courseNum) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== "student") return alert("You must log in first.");

  const student = students.find(s => s.username === user.username);
  const course = courses.find(c => c.number === courseNum);

  if (!student || !course) return;

  if (student.enrolledCourses.includes(courseNum))
    return alert("Already enrolled.");

  const conflict = hasTimeConflict(course, student);
  if (conflict)
    return alert(`❌ TIME CONFLICT: ${course.number} overlaps with ${conflict}`);

  if (course.enrolled >= course.max)
    return alert("Course is full.");

  student.enrolledCourses.push(courseNum);
  course.enrolled++;

  persistStudents();
  persistCourses();
  displayCourses(courses);

  if (typeof renderStudentSchedule === "function") {
    renderStudentSchedule();
  }

}

/* ==================================================
   UNENROLL
================================================== */
function unenroll(courseNum) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== "student") return;

  const student = students.find(s => s.username === user.username);
  const course = courses.find(c => c.number === courseNum);

  if (!student || !course) return;

  student.enrolledCourses =
    student.enrolledCourses.filter(code => code !== courseNum);

  if (course.enrolled > 0) course.enrolled--;

  persistStudents();
  persistCourses();
  displayCourses(courses);

  if (typeof renderStudentSchedule === "function") {
    renderStudentSchedule();
  }

}

/* ==================================================
   COURSE MODAL (Used on Student Schedule Page)
================================================== */
function showCourseDetails(courseNum) {
  const course = courses.find(c => c.number === courseNum);
  if (!course) return;

  const modal = document.getElementById("courseModal");
  const title = document.getElementById("modalCourseTitle");
  const info = document.getElementById("modalCourseInfo");

  if (!modal || !title || !info) {
    console.warn("Course modal not present on this page.");
    return;
  }

  title.textContent = `${course.number} — ${course.department}`;

  info.innerHTML = `
    <strong>Instructor:</strong> ${course.instructor}<br>
    <strong>Credits:</strong> ${course.credits}<br>
    <strong>Prerequisites:</strong> ${course.prereq}<br>
    <strong>Days:</strong> ${course.meetingDays.join(", ")}<br>
    <strong>Time:</strong> ${formatTime(course.startTime)} – ${formatTime(course.endTime)}<br>
    <strong>Modality:</strong> ${course.modality}<br>
    <strong>Enrollment:</strong> ${course.enrolled} / ${course.max}
  `;

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("courseModal");
  if (modal) modal.style.display = "none";
}

/* ==================================================
   PAGE INITIALIZATION
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  displayCourses(courses);  // Only fills table if the page has one
});
