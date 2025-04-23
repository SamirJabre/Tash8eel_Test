document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value.trim();

    // Basic validation
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }
    try{
      await axios.post('http://localhost/BackEnd/login.php',{
        email: email,
        password: password
      }).then((response)=>{
        console.log(response);
        if (response.data.message === "Login successful") {
          alert("Login successful!");
          window.location.href = "students.html";
        } else {
          alert("Invalid email or password. Please try again.");
        }
      })
    }
    catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  });
});
