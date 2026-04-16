async function loadStudents() {
  const res = await fetch('/api/students');
  const data = await res.json();

  const list = document.getElementById('list');
  list.innerHTML = "";

  data.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name} - ${s.age}`;
    list.appendChild(li);
  });
}

async function addStudent() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age })
  });

  loadStudents();
}

loadStudents();
