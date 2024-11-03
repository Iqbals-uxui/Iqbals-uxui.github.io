let children = [];
let chores = [];

function addChild() {
    const childName = document.getElementById('childName').value.trim();
    if (childName) {
        children.push({ name: childName, points: 0, history: [] });
        document.getElementById('childName').value = '';
        updateLeaderboard();
    }
}

function addChore() {
    const choreName = document.getElementById('choreName').value.trim();
    const chorePoints = parseInt(document.getElementById('chorePoints').value);
    if (choreName && !isNaN(chorePoints)) {
        chores.push({ name: choreName, points: chorePoints });
        document.getElementById('choreName').value = '';
        document.getElementById('chorePoints').value = '';
        displayChores();
    }
}

function displayChores() {
    const choresList = document.getElementById('choresList');
    choresList.innerHTML = '';

    chores.forEach((chore, index) => {
        const choreItem = document.createElement('li');
        const assignButton = document.createElement('button');
        const removeButton = document.createElement('button');
        const childSelect = document.createElement('select');

        assignButton.classList.add('assign-button');
        assignButton.textContent = `Assign ${chore.points} points`;
        assignButton.onclick = () => assignPoints(index, childSelect.value);

        removeButton.classList.add('remove');
        removeButton.textContent = `Remove ${chore.points} points`;
        removeButton.onclick = () => removePoints(index, childSelect.value);

        children.forEach(child => {
            const option = document.createElement('option');
            option.value = child.name;
            option.textContent = child.name;
            childSelect.appendChild(option);
        });

        choreItem.textContent = chore.name;
        choreItem.style.color = getRandomColor(); // Random color for each chore
        choreItem.appendChild(childSelect);
        choreItem.appendChild(assignButton);
        choreItem.appendChild(removeButton);
        choresList.appendChild(choreItem);
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function assignPoints(choreIndex, selectedChildName) {
    const chore = chores[choreIndex];
    const child = children.find(c => c.name === selectedChildName);

    if (child) {
        const timestamp = new Date().toLocaleString();
        child.points += chore.points;
        child.history.push({ chore: chore.name, points: chore.points, time: timestamp });
        updateLeaderboard();
    }
}

function removePoints(choreIndex, selectedChildName) {
    const chore = chores[choreIndex];
    const child = children.find(c => c.name === selectedChildName);

    if (child) {
        const timestamp = new Date().toLocaleString();
        child.points -= chore.points;
        child.history.push({ chore: chore.name, points: -chore.points, time: timestamp });
        updateLeaderboard();
    }
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    children.sort((a, b) => b.points - a.points).forEach(child => {
        const item = document.createElement('li');
        item.textContent = `${child.name}: ${child.points} points`;
        item.onclick = () => showBreakdown(children.indexOf(child));
        leaderboardList.appendChild(item);
    });

    updateChart();
}

function updateChart() {
    const ctx = document.getElementById('leaderboardChart').getContext('2d');
    const labels = children.map(child => child.name);
    const data = children.map(child => child.points);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Points',
                data: data,
                backgroundColor: children.map(() => getRandomColor()),
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function showBreakdown(childIndex) {
    const child = children[childIndex];
    document.getElementById('breakdownTitle').textContent = `${child.name}'s Points Breakdown`;
    document.getElementById('breakdownList').innerHTML = '';
    
    child.history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.time}: ${entry.chore} - ${entry.points} points`;
        document.getElementById('breakdownList').appendChild(li);
    });

    document.getElementById('breakdownModal').style.display = "block";
}

function closeBreakdown() {
    document.getElementById('breakdownModal').style.display = "none";
}

function filterBreakdown() {
    // Implementation for filtering points breakdown based on selected month and year can go here
}
