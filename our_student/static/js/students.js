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

const API_LIST_URL = "http://127.0.0.1:8000/student-list/";
const API_DETAIL_URL = "http://127.0.0.1:8000/student/";

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

// Initial load
loadStudents();
