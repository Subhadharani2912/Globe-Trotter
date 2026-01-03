document.getElementById("tripForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const destination = document.getElementById("destination").value;
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ title, destination })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Trip created!");
    loadTrips(); // reload trips after creation
  } else {
    alert(data.message || "Failed to create trip");
  }
});
