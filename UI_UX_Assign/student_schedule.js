/****************************************************
 * student_schedule.js
 * Builds weekly calendar and plots enrolled courses
 ****************************************************/

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const START_HOUR = 8;   // 8:00
const END_HOUR   = 18;  // 6:00 PM
const ROW_HEIGHT = 40;  // must match .calendar-grid row height in CSS

document.addEventListener("DOMContentLoaded", () => {
  buildCalendarGrid();
  renderStudentSchedule();
});

function buildCalendarGrid() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  grid.innerHTML = "";

  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    // Time column
    const timeCell = document.createElement("div");
    timeCell.className = "time-cell";
    timeCell.textContent = formatHourLabel(hour);
    grid.appendChild(timeCell);

    // One cell per weekday
    DAYS.forEach(day => {
      const cell = document.createElement("div");
      cell.className = "day-cell";
      cell.dataset.day = day;
      cell.dataset.hour = hour;
      grid.appendChild(cell);
    });
  }
}

function formatHourLabel(h) {
  let suffix = h >= 12 ? "PM" : "AM";
  let hour = h > 12 ? h - 12 : h;
  if (hour === 0) hour = 12;
  return `${hour}:00`;
}

function renderStudentSchedule() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  // Remove any existing blocks
  grid.querySelectorAll(".class-block").forEach(el => el.remove());

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== "student") return;

  const student = students.find(s => s.username === user.username);
  if (!student) return;

  const studentCourses = student.enrolledCourses
    .map(code => courses.find(c => c.number === code))
    .filter(Boolean);

  // Assign a consistent color per course
  const colorClasses = ["block-1", "block-2", "block-3", "block-4", "block-5"];
  const colorMap = {};
  let idx = 0;

  studentCourses.forEach(course => {
    if (!colorMap[course.number]) {
      colorMap[course.number] = colorClasses[idx % colorClasses.length];
      idx++;
    }
  });

  // Place each course on the grid
  studentCourses.forEach(course => {
    course.meetingDays.forEach(day => {
      placeCourseBlock(day, course, colorMap[course.number]);
    });
  });
}

function placeCourseBlock(day, course, colorClass) {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  const startHour = Math.floor(course.startTime);
  const durationHours = course.endTime - course.startTime;

  const selector = `.day-cell[data-day="${day}"][data-hour="${startHour}"]`;
  const cell = grid.querySelector(selector);
  if (!cell) return;

  const block = document.createElement("div");
  block.classList.add("class-block");      // important for cursor + styling
  if (colorClass) block.classList.add(colorClass);

  block.textContent = course.number;

  const offsetWithinHour = (course.startTime - startHour) * ROW_HEIGHT;
  const height = durationHours * ROW_HEIGHT;

  block.style.top = `${offsetWithinHour}px`;
  block.style.height = `${height}px`;

  // Click -> show details modal (defined in courses.js)
  block.addEventListener("click", () => {
    if (typeof showCourseDetails === "function") {
      showCourseDetails(course.number);
    }
  });

  cell.appendChild(block);
}
