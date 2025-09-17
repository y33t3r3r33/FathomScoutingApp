const TBA_API_KEY = "Db64dHfID87PQopWGKYvU1ZY5PlU2GftfVNu1SEKkHQNDfrYyFV6bvMFfOSlR4v2 ";
const eventKey = "LADEN";

async function fetchEventInfo() {
    const url = `https://www.thebluealliance.com/api/v3/event/${eventKey}`;
    const response = await fetch(url, {
        headers: { "X-TBA-Auth-Key": TBA_API_KEY }
    });
    const event = await response.json();
    document.getElementById("event-details").innerHTML = `
        <strong>${event.name}</strong> (${event.location})<br>
        Date: ${event.start_date} — ${event.end_date}
    `;
}

fetchEventInfo();