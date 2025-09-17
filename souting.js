let counts = {
    L4: 0,
    L3: 0,
    L2: 0,
    L1: 0,
    Barge: 0,
    Processor: 0
};

function updateCount(position, delta) {
    counts[position] += delta;
    if (counts[position] < 0) counts[position] = 0;
    document.getElementById(position + "Count").textContent = counts[position];
}

document.getElementById("scoutingForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const data = {
        teamNumber: document.getElementById("teamNumber").value,
        matchNumber: document.getElementById("matchNumber").value,
        L4: counts.L4,
        L3: counts.L3,
        L2: counts.L2,
        L1: counts.L1,
        Barge: counts.Barge,
        Processor: counts.Processor,
        notes: document.getElementById("notes").value
    };

    // Send to backend server to save in SQL database
    try {
        const response = await fetch("/api/scouting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            document.getElementById("submitStatus").textContent = "Data saved!";
            // Optionally reset form and counts
            document.getElementById("scoutingForm").reset();
            counts.L4 = 0;
            counts.L3 = 0;
            counts.L2 = 0;
            counts.L1 = 0;
            counts.Barge = 0;
            counts.Processor = 0;
            updateCount("L4", 0);
            updateCount("L3", 0);
            updateCount("L2", 0);
            updateCount("L1", 0);
            updateCount("Barge", 0);
            updateCount("Processor", 0);
        } else {
            document.getElementById("submitStatus").textContent = "Error saving data.";
        }
    } catch (err) {
        document.getElementById("submitStatus").textContent = "Network error.";
    }
});