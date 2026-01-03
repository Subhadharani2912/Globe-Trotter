const budgetContainer = document.getElementById('budgetContainer');
const token = localStorage.getItem('token');

async function fetchBudget() {
  try {
    const res = await fetch(`http://localhost:5000/api/budget/${tripId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const items = await res.json();
    budgetContainer.innerHTML = '';
    items.forEach(b => {
      const div = document.createElement('div');
      div.className = 'budget-card';
      div.innerHTML = `
        <h4>${b.item}</h4>
        <p>Amount: $${b.amount}</p>
        <button onclick="deleteBudget(${b.id})">Delete</button>
      `;
      budgetContainer.appendChild(div);
    });
  } catch(err){ console.log(err); }
}

async function createBudget() {
  const item = prompt('Item/Expense name:');
  const amount = prompt('Amount:');
  if(!item || !amount) return;

  try {
    await fetch('http://localhost:5000/api/budget', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({tripId, item, amount})
    });
    fetchBudget();
  } catch(err){ alert('Failed to add budget'); }
}

async function deleteBudget(id){
  if(!confirm('Delete this item?')) return;
  try {
    await fetch(`http://localhost:5000/api/budget/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchBudget();
  } catch(err){ alert('Failed to delete item'); }
}

window.addEventListener('load', fetchBudget);
