let students = [];
 let selectedIndex = null;

 function saveStudentsToStorage() {
     localStorage.setItem("students_data", JSON.stringify(students));
 }

 function loadStudentsFromStorage() {
     const raw = localStorage.getItem("students_data");
     if (raw) {
         try {
             students = JSON.parse(raw);
         } catch (err) {
             console.error("Failed to parse students_data:", err);
             students = [];
         }
     }
 }

 function renderStudents() {
     const grid = document.getElementById("profile-grid");
     grid.innerHTML = "";
     students.forEach((s, idx) => {
         const card = document.createElement("div");
         card.className = "card";
         card.dataset.course = s.course;
         card.dataset.full = JSON.stringify(s);
         card.dataset.index = idx;
         card.innerHTML = `
          <img src="${s.img || ''}" alt="${s.name || ''}">
          <div class="pad">
            <h3 class="title">${s.name || ""}</h3>
            <p class="meta">Age: ${s.age || ""} | ${s.year || ""}</p>
            <p>Course: ${s.course || ""}</p>
          </div>
        `;
         card.addEventListener("click", () => openDetailModal(card));
         grid.appendChild(card);
     });
 }

 function initializeData() {
     loadStudentsFromStorage();
     if (students.length === 0) {
         document.querySelectorAll("#profile-grid .card").forEach(card => {
             const sData = JSON.parse(card.dataset.full);
             const name = card.querySelector(".title").innerText;
             const meta = card.querySelector(".meta").innerText;
             const parts = meta.split("|");
             let agePart = "",
                 yearPart = "";
             if (parts.length >= 2) {
                 agePart = parts[0].replace("Age:", "").trim();
                 yearPart = parts[1].trim();
             }
             students.push({
                 name: name,
                 age: agePart,
                 year: yearPart,
                 course: card.dataset.course,
                 img: card.querySelector("img").src,
                 student_number: sData.student_number || "",
                 dob: sData.dob || "",
                 gender: sData.gender || "",
                 address: sData.address || "",
                 email: sData.email || "",
                 contact: sData.contact || "",
                 skills: sData.skills || "",
                 hobbies: sData.hobbies || "",
                 achievements: sData.achievements || "",
                 motto: sData.motto || "",
                 education: sData.education || {
                     elementary: "",
                     junior: "",
                     senior: "",
                     college: ""
                 },
                 reason: sData.reason || ""
             });
         });
         saveStudentsToStorage();
     }
     renderStudents();
 }

 function toggleAddForm() {
     document.getElementById('add-student').classList.toggle('active');
 }

 function searchStudents() {
     const q = document.getElementById('search-bar').value.toLowerCase();
     document.querySelectorAll('#profile-grid .card').forEach(card => {
         const name = card.querySelector('.title').innerText.toLowerCase();
         card.style.display = name.includes(q) ? '' : 'none';
     });
 }

 function filterProfiles(course, evt) {
     document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
     if (evt && evt.target) {
         evt.target.classList.add('active');
     }
     document.querySelectorAll('#profile-grid .card').forEach(card => {
         card.style.display = (course === 'all' || card.dataset.course === course) ? '' : 'none';
     });
 }

 function addStudent() {
    const careerChoices = Array.from(
    document.querySelectorAll('.career-options input[type="checkbox"]:checked')
  ).map(cb => cb.value); 

     const newStud = {
         name: document.getElementById('new-name').value,
         student_number: document.getElementById('new-student-number').value,
         age: document.getElementById('new-age').value,
         year: document.getElementById('new-year').value,
         course: document.getElementById('new-course').value,
         dob: document.getElementById('new-dob').value,
         gender: document.getElementById('new-gender').value,
         contact: document.getElementById('new-contact').value,
         email: document.getElementById('new-email').value,
         address: document.getElementById('new-address').value,
         skills: document.getElementById('new-skills').value,
         hobbies: document.getElementById('new-hobbies').value,
         achievements: document.getElementById('new-achievements').value,
         motto: document.getElementById('new-motto').value,
         img: document.getElementById('new-img').value,
         education: {
             elementary: document.getElementById('new-elementary').value,
             junior: document.getElementById('new-junior').value,
             senior: document.getElementById('new-senior').value,
             college: document.getElementById('new-college').value
         },
         reason: document.getElementById('new-reason').value,
         careerInterests: careerChoices,
     };
     students.push(newStud);
     saveStudentsToStorage();
     renderStudents();
     toggleAddForm();
 }

 let selectedCard = null;

 function openDetailModal(card) {
     selectedCard = card;
     const idx = parseInt(card.dataset.index, 10);
     const s = students[idx];
     document.getElementById('view-name').innerText = s.name || "";
     document.getElementById('view-img').src = s.img || "";
     document.getElementById('view-student-number').innerText = s.student_number || "";
     document.getElementById('view-age').innerText = s.age || "";
     document.getElementById('view-year').innerText = s.year || "";
     document.getElementById('view-course').innerText = s.course || "";
     document.getElementById('view-dob').innerText = s.dob || "";
     document.getElementById('view-gender').innerText = s.gender || "";
     document.getElementById('view-contact').innerText = s.contact || "";
     document.getElementById('view-email').innerText = s.email || "";
     document.getElementById('view-address').innerText = s.address || "";
     document.getElementById('view-skills').innerText = s.skills || "";
     document.getElementById('view-hobbies').innerText = s.hobbies || "";
     document.getElementById('view-achievements').innerText = s.achievements || "";
     document.getElementById('view-motto').innerText = s.motto || "";
     document.getElementById('view-reason').innerText = s.reason || "";
     document.getElementById("view-career").textContent = (s.careerInterests || []).join(", ");
     document.getElementById('view-elementary').innerText = s.education.elementary || "";
     document.getElementById('view-junior').innerText = s.education.junior || "";
     document.getElementById('view-senior').innerText = s.education.senior || "";
     document.getElementById('view-college').innerText = s.education.college || "";

     document.getElementById('student-view').style.display = "block";
     document.getElementById('student-edit').style.display = "none";
     document.getElementById('student-modal').style.display = 'flex';
 }

 function closeModal() {
     document.getElementById('student-modal').style.display = "none";
 }

 function switchToEdit() {
  document.getElementById("student-view").style.display = "none";
  document.getElementById("student-edit").style.display = "block";

     const idx = parseInt(selectedCard.dataset.index, 10);
     const s = students[idx];
     document.getElementById('edit-name').value = s.name || "";
     document.getElementById('edit-student-number').value = s.student_number || "";
     document.getElementById('edit-age').value = s.age || "";
     document.getElementById('edit-year').value = s.year || "";
     document.getElementById('edit-course').value = s.course || "";
     document.getElementById('edit-dob').value = s.dob || "";
     document.getElementById('edit-gender').value = s.gender || "";
     document.getElementById('edit-contact').value = s.contact || "";
     document.getElementById('edit-email').value = s.email || "";
     document.getElementById('edit-address').value = s.address || "";
     document.getElementById('edit-skills').value = s.skills || "";
     document.getElementById('edit-hobbies').value = s.hobbies || "";
     document.getElementById('edit-achievements').value = s.achievements || "";
     document.getElementById('edit-motto').value = s.motto || "";
     document.getElementById('edit-img').value = s.img || "";
     document.getElementById('edit-elementary').value = s.education.elementary || "";
     document.getElementById('edit-junior').value = s.education.junior || "";
     document.getElementById('edit-senior').value = s.education.senior || "";
     document.getElementById('edit-college').value = s.education.college || "";
     document.getElementById('edit-reason').value = s.reason || "";
 }

     function cancelEdit() {
  document.getElementById("student-edit").style.display = "none";
  document.getElementById("student-view").style.display = "block";
}

 document.getElementById('student-edit').addEventListener('submit', function(e) {
     e.preventDefault();
     const idx = parseInt(selectedCard.dataset.index, 10);
     const s = students[idx];
     s.name = document.getElementById('edit-name').value;
     s.student_number = document.getElementById('edit-student-number').value;
     s.age = document.getElementById('edit-age').value;
     s.year = document.getElementById('edit-year').value;
     s.course = document.getElementById('edit-course').value;
     s.dob = document.getElementById('edit-dob').value;
     s.gender = document.getElementById('edit-gender').value;
     s.contact = document.getElementById('edit-contact').value;
     s.email = document.getElementById('edit-email').value;
     s.address = document.getElementById('edit-address').value;
     s.skills = document.getElementById('edit-skills').value;
     s.hobbies = document.getElementById('edit-hobbies').value;
     s.achievements = document.getElementById('edit-achievements').value;
     s.motto = document.getElementById('edit-motto').value;
     s.img = document.getElementById('edit-img').value;
     s.education.elementary = document.getElementById('edit-elementary').value;
     s.education.junior = document.getElementById('edit-junior').value;
     s.education.senior = document.getElementById('edit-senior').value;
     s.education.college = document.getElementById('edit-college').value;
     s.reason = document.getElementById('edit-reason').value;

     saveStudentsToStorage();
     renderStudents();
     closeModal();
 });

 function deleteStudent() {
  if (!selectedCard) return;

  const idx = parseInt(selectedCard.dataset.index, 10);
  const s = students[idx];

  // Confirm deletion with the user
  const confirmDelete = confirm(`Are you sure you want to remove ${s.name}?`);
  if (!confirmDelete) return;

  // Remove the student from array
  students.splice(idx, 1);

  // Save updated list and refresh grid
  saveStudentsToStorage();
  renderStudents();

  // Close the modal
  closeModal();

  alert(`${s.name} has been removed successfully.`);
}

 function openGalleryPopup(imgSrc) {
     const popup = document.getElementById('gallery-popup');
     const popupImg = document.getElementById('gallery-popup-img');
     popupImg.src = imgSrc;
     popup.style.display = 'flex';
 }

 function closeGalleryPopup() {
     const popup = document.getElementById('gallery-popup');
     popup.style.display = 'none';
 }

 window.addEventListener('DOMContentLoaded', () => {
     document.querySelectorAll('.gallery-card img').forEach(imgEl => {
         imgEl.addEventListener('click', (e) => {
             e.stopPropagation();
             openGalleryPopup(imgEl.src);
         });
     });
     const popup = document.getElementById('gallery-popup');
     popup.addEventListener('click', (e) => {
         if (e.target === popup) {
             closeGalleryPopup();
         }
     });
     initializeData();
 });

 // Show logged-in user's name
 document.addEventListener("DOMContentLoaded", () => {
     const user = localStorage.getItem("loggedInUser");
     const userDisplay = document.getElementById("user-display");

     if (userDisplay && user) {
         userDisplay.textContent = 'Welcome, ${user}! 👋';
     }
 });


 function logout() {
     localStorage.removeItem("loggedInUser");
     window.location.href = "welcome.html";
 }