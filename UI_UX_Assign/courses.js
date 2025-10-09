// Shared course data
const courses = [
  { number: "INFO450", department: "INFO", instructor: "Dr. McGarry", credits: 3, prereq: "INFO300", modality: "Hybrid",   max: 30, enrolled: 0 },
  { number: "SCMA320", department: "SCMA", instructor: "Prof. Johnson", credits: 3, prereq: "MATH200",  modality: "In-person", max: 40, enrolled: 0 },
  { number: "MGMT303", department: "MGMT", instructor: "Prof. Ruiz", credits: 3, prereq: "MGMT210",  modality: "In-person", max: 40, enrolled: 0 },
  { number: "ACCT204", department: "ACCT", instructor: "Dr. Krumwiedie", credits: 3, prereq: "ACT203",  modality: "In-person", max: 40, enrolled: 0 },
  { number: "MATH200", department: "MATH", instructor: "Dr. Lee",     credits: 4, prereq: "None",     modality: "Hybrid",   max: 35, enrolled: 0 }
];

// Course Search (used on course-search.html)
function searchCourses() {
  const dept = (document.getElementById("department")?.value || "").toLowerCase();
  const instr = (document.getElementById("instructor")?.value || "").toLowerCase();
  const num  = (document.getElementById("courseNumber")?.value || "").toLowerCase();

  const results = courses.filter(c =>
    (!dept  || c.department.toLowerCase().includes(dept)) &&
    (!instr || c.instructor.toLowerCase().includes(instr)) &&
    (!num   || c.number.toLowerCase().includes(num))
  );

  const table = document.getElementById("resultsTable");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  results.forEach(c => {
    tbody.innerHTML += `<tr>
      <td>${c.number}</td>
      <td>${c.department}</td>
      <td>${c.instructor}</td>
      <td>${c.credits}</td>
      <td>${c.prereq}</td>
      <td>${c.modality}</td>
      <td>${c.max}</td>
    </tr>`;
  });
}
