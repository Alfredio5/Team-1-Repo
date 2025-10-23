// Shared course data
const courses = [
  { number: "INFO450", department: "INFO", instructor: "Dr. McGarry", credits: 3, prereq: "INFO300", modality: "Hybrid", max: 30, enrolled: 10 },
  { number: "SCMA320", department: "SCMA", instructor: "Prof. Johnson", credits: 3, prereq: "MATH200", modality: "In-person", max: 40, enrolled: 25 },
  { number: "MGMT303", department: "MGMT", instructor: "Prof. Ruiz", credits: 3, prereq: "MGMT210", modality: "In-person", max: 40, enrolled: 5 },
  { number: "ACCT204", department: "ACCT", instructor: "Dr. Krumwiedie", credits: 3, prereq: "ACT203", modality: "In-person", max: 40, enrolled: 35 },
  { number: "MATH200", department: "MATH", instructor: "Dr. Lee", credits: 4, prereq: "None", modality: "Hybrid", max: 35, enrolled: 20 }
];

// ✅ Utility function to display any list of courses
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

// 🔍 Search functionality
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

// 🔄 Clear filters & repopulate with full list
function clearFilters() {
  document.getElementById("department").value = "";
  document.getElementById("instructor").value = "";
  document.getElementById("courseNumber").value = "";
  displayCourses(courses); // Show full list
}

// ✅ Automatically load all courses when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  displayCourses(courses);
});
