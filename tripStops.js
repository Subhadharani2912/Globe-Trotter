const stopsContainer = document.getElementById('stopsContainer');
const token = localStorage.getItem('token');

async function fetchStops() {
  try {
    const res = await fetch(`http://localhost:5000/api/tripstops/${tripId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const stops = await res.json();
    stopsContainer.innerHTML = '';
    stops.forEach(s => {
      const div = document.createElement('div');
      div.className = 'stop-card';
      div.innerHTML = `
        <h4>${s.city}</h4>
        <p>${s.date}</p>
        <button onclick="deleteStop(${s.id})">Delete</button>
      `;
      stopsContainer.appendChild(div);
    });
  } catch(err){ console.log(err); }
}

async function createStop() {
  const city = prompt('City:');
  const date = prompt('Date (YYYY-MM-DD):');
  if(!city || !date) return;

  try {
    await fetch('http://localhost:5000/api/tripstops', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({tripId, city, date})
    });
    fetchStops();
  } catch(err){ alert('Failed to create stop'); }
}

async function deleteStop(id){
  if(!confirm('Delete this stop?')) return;
  try {
    await fetch(`http://localhost:5000/api/tripstops/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchStops();
  } catch(err){ alert('Failed to delete stop'); }
}

window.addEventListener('load', fetchStops);
