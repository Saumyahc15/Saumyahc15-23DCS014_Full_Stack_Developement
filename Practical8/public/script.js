let count = 0;

// Fetch initial count from server
fetch('/api/count')
  .then(res => res.json())
  .then(data => {
    count = data.count;
    updateDisplay();
  });

// Update server count
function saveCount() {
  fetch('/api/count', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count })
  });
}

function changeCount(value) {
  count += value;
  if (count < 0) count = 0;
  updateDisplay();
  saveCount();
}

function resetCount() {
  count = 0;
  updateDisplay();
  saveCount();
}

function updateDisplay() {
  document.getElementById('counter').innerText = count;
}
