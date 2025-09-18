// Score positions
const counts = {
    L4: 0,
    L3: 0,
    L2: 0,
    L1: 0,
    Processor: 0,
    Barge: 0
};

// Update the UI count for each position
function updateCount(position, delta) {
    counts[position] += delta;
    if (counts[position] < 0) counts[position] = 0;
    document.getElementById(position + "Count").textContent = counts[position];
}

document.addEventListener("DOMContentLoaded", function() {
    // Attach listeners to all buttons with class 'score-btn'
    document.querySelectorAll(".score-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const pos = btn.getAttribute("data-pos");
            const delta = parseInt(btn.getAttribute("data-delta"), 10);
            updateCount(pos, delta);
        });
    });

    // Handle form submission
    document.getElementById("scoutingForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const data = {
            teamNumber: document.getElementById("teamNumber").value,
            matchNumber: document.getElementById("matchNumber").value,
            L4: counts.L4,
            L3: counts.L3,
            L2: counts.L2,
            L1: counts.L1,
            Processor: counts.Processor,
            Barge: counts.Barge,
            notes: document.getElementById("notes").value
        };

        try {
            const response = await fetch("/api/scouting", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                document.getElementById("submitStatus").textContent = "Data saved!";
                document.getElementById("scoutingForm").reset();
                // Reset counts and UI
                Object.keys(counts).forEach(pos => {
                    counts[pos] = 0;
                    document.getElementById(pos + "Count").textContent = "0";
                });
            } else {
                document.getElementById("submitStatus").textContent = "Error saving data.";
            }
        } catch (err) {
            document.getElementById("submitStatus").textContent = "Network error.";
        }
    });
});