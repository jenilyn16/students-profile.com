function filterByCareer(careerName) {
  const grid = document.getElementById("career-student-grid");
  const title = document.getElementById("career-title");
  title.textContent = `Students Interested in ${careerName}`;
  grid.innerHTML = "";

  // ✅ Load all students from localStorage
  const allStudents = JSON.parse(localStorage.getItem("students_data") || "[]");

  // ✅ Filter those who selected this career
  const filtered = allStudents.filter(stud =>
    stud.careerInterests && stud.careerInterests.includes(careerName)
  );

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No students selected this career yet.</p>";
    return;
  }

  filtered.forEach(stud => {
    const card = document.createElement("div");
    card.className = "student-card";
    card.innerHTML = `
      <img src="${stud.img || 'default.jpg'}" alt="${stud.name}">
      <h4>${stud.name}</h4>
      <p>${stud.course}</p>
      <p>Year: ${stud.year}</p>
    `;
    grid.appendChild(card);
  });
}
