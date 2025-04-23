const listStudents = async (filterName = "") => {
  try {
    const response = await axios.get(
      "http://localhost/BackEnd/listStudents.php"
    );
    const students = response.data;

    const filteredStudents = filterName
      ? students.filter((student) =>
          student.name.toLowerCase().includes(filterName.toLowerCase())
        )
      : students;

    const studentsContainer = document.querySelector(".students-container");

    studentsContainer.innerHTML = `
      <div>
        <p>StudentID</p>
        <p>Name</p>
        <p>Phone Number</p>
        <p>Email</p>
        <p>University</p>
      </div>
    `;
    filteredStudents.forEach((student) => {
      const studentDiv = document.createElement("div");
      studentDiv.classList.add("student");
      studentDiv.innerHTML = `
                <p>${student.id}</p>
                <p>${student.name}</p>
                <p>${student.phone_number}</p>
                <p>${student.email}</p>
                <p>${student.university}</p>
            `;
      studentsContainer.appendChild(studentDiv);
    });
  } catch (err) {
    console.error("Error fetching students:", err);
  }
};

const searchForm = document.getElementById("student-search");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = searchForm.querySelector("input").value;
  listStudents(searchInput);
});

listStudents();
