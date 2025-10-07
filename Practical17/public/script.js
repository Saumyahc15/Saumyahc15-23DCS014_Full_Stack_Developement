const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const classInput = document.getElementById('class');
const emailInput = document.getElementById('email');
const studentIdInput = document.getElementById('studentId');
const submitBtn = document.getElementById('submitBtn');
const studentTable = document.getElementById('studentTable');

const API_URL = '/api/students';

async function fetchStudents() {
  const res = await fetch(API_URL);
  const data = await res.json();
  studentTable.innerHTML = '';
  if (data.success) {
    data.students.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${s.name}</td>
        <td>${s.age}</td>
        <td>${s.class}</td>
        <td>${s.email}</td>
        <td>
          <button onclick="editStudent('${s._id}','${s.name}',${s.age},'${s.class}','${s.email}')">Edit</button>
          <button onclick="deleteStudent('${s._id}')">Delete</button>
        </td>
      `;
      studentTable.appendChild(tr);
    });
  }
}

async function addOrUpdateStudent() {
  const id = studentIdInput.value;
  const studentData = {
    name: nameInput.value,
    age: ageInput.value,
    class: classInput.value,
    email: emailInput.value
  };

  if (!studentData.name || !studentData.age || !studentData.class || !studentData.email) {
    alert('Please fill all fields');
    return;
  }

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
  }

  resetForm();
  fetchStudents();
}

function editStudent(id, name, age, cls, email) {
  studentIdInput.value = id;
  nameInput.value = name;
  ageInput.value = age;
  classInput.value = cls;
  emailInput.value = email;
  submitBtn.textContent = 'Update Student';
}

async function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
  }
}

function resetForm() {
  studentIdInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  classInput.value = '';
  emailInput.value = '';
  submitBtn.textContent = 'Add Student';
}

submitBtn.addEventListener('click', addOrUpdateStudent);

// Load students on page load
fetchStudents();
