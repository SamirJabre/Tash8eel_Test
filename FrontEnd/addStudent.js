let studentId = null;
let universityName = null;

const listUniversities = async () => {
  try {
    const response = await axios.get(
      "http://localhost/BackEnd/listUniversities.php"
    );
    console.log(response.data);
    const unis = response.data;
    const uniSelect = document.querySelector("#university");
    uniSelect.innerHTML = '<option value="">Select</option>';
    unis.forEach((uni) => {
      const option = document.createElement("option");
      option.value = uni.id;
      option.textContent = uni.name;
      uniSelect.appendChild(option);
    });

    uniSelect.addEventListener("change", (event) => {
      const selectedOption = event.target.options[event.target.selectedIndex];
      universityName = selectedOption.textContent;
    });
  } catch (err) {
    console.error("Error fetching universities:", err);
  }
};

const listStudents = async () => {
  try {
    const response = await axios.get(
      "http://localhost/BackEnd/listStudents.php"
    );
    console.log(response.data);
    const students = response.data;
    const studentSelect = document.querySelector("#student");

    studentSelect.innerHTML = '<option value="">Select</option>';
    students.forEach((student) => {
      const option = document.createElement("option");
      option.value = student.id;
      option.textContent = student.name;
      studentSelect.appendChild(option);
    });
    studentSelect.addEventListener("change", (event) => {
      studentId = event.target.value;
    });
  } catch (err) {
    console.error("Error fetching students:", err);
  }
};

document
  .getElementById("student-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(studentId, universityName);

    if (!studentId || !universityName) {
      alert("Please select both a student and a university.");
      return;
    }
    try {
      await axios
        .post("http://localhost/BackEnd/addStudent.php", {
          id: studentId,
          university: universityName,
        })
        .then(alert("Student added successfully!"));
    } catch (err) {
      console.error("Error adding student:", err);
      alert("An error occurred while adding the student.");
    }
  });

listUniversities();
listStudents();
