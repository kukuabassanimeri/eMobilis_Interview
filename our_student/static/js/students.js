//* CSRF helper (you already have this)
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

const API_LIST_URL = "http://127.0.0.1:8000/student-list/"; //* Load all students from the database.

const API_DETAIL_URL = "http://127.0.0.1:8000/student/"; //* Delete student.

function loadStudents() {
  fetch(API_LIST_URL)
    .then(res => res.json())
    .then(data => {
      let list = document.getElementById("students");
      list.innerHTML = "";

      data.forEach(student => {
        list.innerHTML += `
          <li>
            ${student.stud_no} ${student.stud_name} (${student.course})
            <button onclick="deleteStudent(${student.id})">Delete</button>
          </li>
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

loadStudents();
