async function createTrip() {
    const token = localStorage.getItem("token");

    const name = document.getElementById("tripName").value;
    const description = document.getElementById("tripDescription").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!name || !startDate || !endDate) {
        showMessage("⚠️ Fill required fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description,
                startDate,
                endDate
            })
        });

        const data = await res.json();

        if (!res.ok) {
            showMessage("❌ " + data.message);
            return;
        }

        showMessage("🎉 Trip created successfully!");
        closeCreateTrip();

        console.log("Trip:", data); // for dashboard later

    } catch (err) {
        showMessage("❌ Server error");
    }
}
