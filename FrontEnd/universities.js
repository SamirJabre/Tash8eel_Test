const listUniversities = async () => {
  try {
    const response = await axios.get(
      "http://localhost/BackEnd/listUniversities.php"
    );
    console.log(response.data);
    const unis = response.data;
    const unisContainer = document.querySelector(".unis-container");
    unis.forEach((uni) => {
      const unisDiv = document.createElement("div");
      unisDiv.classList.add("uni");
      unisDiv.innerHTML = `
                <p>${uni.id}</p>
                <p>${uni.name}</p>
            `;
      unisContainer.appendChild(unisDiv);
    });
  } catch (err) {
    console.error("Error fetching unis:", err);
  }
};

listUniversities();
