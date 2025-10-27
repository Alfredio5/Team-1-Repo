// Shared course data
const courses = [
  { number: "INFO450", department: "INFO", instructor: "Dr. McGarry", credits: 3, prereq: "INFO300", modality: "Hybrid", max: 30, enrolled: 10 },
  { number: "SCMA320", department: "SCMA", instructor: "Dr. Johnson", credits: 3, prereq: "MATH200", modality: "In-person", max: 40, enrolled: 25 },
  { number: "MGMT303", department: "MGMT", instructor: "Dr. Ruiz", credits: 3, prereq: "MGMT210", modality: "In-person", max: 40, enrolled: 5 },
  { number: "ACCT204", department: "ACCT", instructor: "Dr. Krumwiedie", credits: 3, prereq: "ACT203", modality: "In-person", max: 40, enrolled: 35 },
  { number: "MATH200", department: "MATH", instructor: "Dr. Lee", credits: 4, prereq: "None", modality: "Hybrid", max: 35, enrolled: 20 },
  { number: "HIST300", department: "HIST", instructor: "Dr. Astarion", credits: 3, prereq: "HIST200", modality: "In-person", max: 35, enrolled: 18 },
  { number: "LANG320", department: "LANG", instructor: "Dr. Astarion", credits: 3, prereq: "LANG101", modality: "Hybrid", max: 30, enrolled: 12 },
  { number: "DART452", department: "DART", instructor: "Dr. Astarion", credits: 4, prereq: "DART300", modality: "Online", max: 40, enrolled: 20 },
  { number: "PHAR200", department: "PHAR", instructor: "Dr. Mario", credits: 4, prereq: "CHEM101", modality: "In-person", max: 35, enrolled: 22 },
  { number: "MEDI300", department: "MEDI", instructor: "Dr. Mario", credits: 3, prereq: "BIOL150", modality: "Hybrid", max: 40, enrolled: 25 },
  { number: "MBIO350", department: "MBIO", instructor: "Dr. Mario", credits: 4, prereq: "MBIO200", modality: "In-person", max: 30, enrolled: 15 },
  { number: "FORE303", department: "FORE", instructor: "Dr. Kennedy", credits: 3, prereq: "FORE150", modality: "In-person", max: 40, enrolled: 28 },
  { number: "ENV200", department: "ENV", instructor: "Dr. Kennedy", credits: 3, prereq: "ENV100", modality: "Hybrid", max: 35, enrolled: 19 },
  { number: "BIOH250", department: "BIOH", instructor: "Dr. Kennedy", credits: 4, prereq: "BIOH101", modality: "Online", max: 30, enrolled: 14 }
];


// Utility function to display any list of courses
function displayCourses(courseList) {
  const table = document.getElementById("resultsTable");
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = ""; // Clear current table rows

  // If no courses match search
  if (courseList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; font-weight:bold;">No courses found</td>
      </tr>
    `;
    return;
  }

  // Otherwise populate table
  courseList.forEach(c => {
    const spotsLeft = c.max - c.enrolled;
    tbody.innerHTML += `
      <tr>
        <td>${c.number}</td>
        <td>${c.department}</td>
        <td>${c.instructor}</td>
        <td>${c.credits}</td>
        <td>${c.prereq}</td>
        <td>${c.modality}</td>
        <td>${c.enrolled} / ${c.max} (${spotsLeft} spots left)</td>
      </tr>
    `;
  });
}

// Search functionality
function searchCourses() {
  const dept = (document.getElementById("department")?.value || "").toLowerCase();
  const instr = (document.getElementById("instructor")?.value || "").toLowerCase();
  const num  = (document.getElementById("courseNumber")?.value || "").toLowerCase();

  const results = courses.filter(c =>
    (!dept  || c.department.toLowerCase().includes(dept)) &&
    (!instr || c.instructor.toLowerCase().includes(instr)) &&
    (!num   || c.number.toLowerCase().includes(num))
  );

  displayCourses(results);
}

// Clear filters & repopulate with full list
function clearFilters() {
  document.getElementById("department").value = "";
  document.getElementById("instructor").value = "";
  document.getElementById("courseNumber").value = "";
  displayCourses(courses); // Show full list
}

// Load all courses when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  displayCourses(courses);
});
