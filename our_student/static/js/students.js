//* CSRF helper
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");

const API_LIST_URL = "http://127.0.0.1:8000/student-list/"; //* List and add students API endpoint

const API_DETAIL_URL = "http://127.0.0.1:8000/student/"; //* List, update and delete student API endpoint

//* Load students into table
function loadStudents() {
  fetch(API_LIST_URL)
    .then(res => res.json())
    .then(data => {
      const tableBody = document.getElementById("students");
      tableBody.innerHTML = "";

      data.forEach(student => {
        tableBody.innerHTML += `
          <tr>
            <td>${student.id}</td>
            <td>${student.stud_no}</td>
            <td>${student.stud_name}</td>
            <td>${student.stud_age}</td>
            <td>${student.course}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" onclick="editStudent(${student.id})">
                <i class="bi bi-pencil-square"></i> Update
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">
                <i class="bi bi-trash"></i> Delete
              </button>
            </td>
          </tr>
        `;
      });
    });
}

//* DELETE student
function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  fetch(API_DETAIL_URL + id + "/", {
    method: "DELETE",
    headers: {
      "X-CSRFToken": csrftoken
    }
  })
  .then(res => {
    console.log("DELETE STATUS:", res.status);
    loadStudents();
  })
  .catch(err => console.log(err));
}

//* Update student
function editStudent(id) {
  fetch(API_DETAIL_URL + id + "/")
    .then(res => res.json())
    .then(student => {
      document.getElementById("student_id").value = student.id;
      document.getElementById("stud_no").value = student.stud_no;
      document.getElementById("stud_name").value = student.stud_name;
      document.getElementById("stud_age").value = student.stud_age;
      document.getElementById("course").value = student.course;

      document.querySelector("#studentForm button").textContent = "Update Student";
    });
}

//* HANDLE form submission for ADD + UPDATE
document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const id = document.getElementById("student_id").value;
  const studentData = {
    stud_no: document.getElementById("stud_no").value,
    stud_name: document.getElementById("stud_name").value,
    stud_age: document.getElementById("stud_age").value,
    course: document.getElementById("course").value
  };

  const method = id ? "PUT" : "POST";
  const url = id ? API_DETAIL_URL + id + "/" : API_LIST_URL;

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken
    },
    body: JSON.stringify(studentData)
  })
  .then(res => res.json())
  .then(data => {
    loadStudents();                    
    this.reset();                      
    document.getElementById("student_id").value = "";
    document.querySelector("#studentForm button").textContent = "Add Student";
  })
  .catch(err => console.log(err));
});

//* Initial load
loadStudents();
