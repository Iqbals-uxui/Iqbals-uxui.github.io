// Data structures to hold children, chores, and point breakdown
const children = [];
const chores = [];

// Adds a child
function addChild() {
    const childName = document.getElementById('childName').value.trim();
    if (childName) {
        children.push({ name: childName, points: 0, history: [] });
        document.getElementById('childName').value = '';
        updateLeaderboard();
    }
}

// Adds a chore
function addChore() {
    const choreName = document.getElementById('choreName').value.trim();
    const chorePoints = parseInt(document.getElementById('chorePoints').value, 10);
    if (choreName && chorePoints > 0) {
        chores.push({ name: choreName, points: chorePoints });
        document.getElementById('choreName').value = '';
        document.getElementById('chorePoints').value = '';
        displayChores();
    }
}

// Displays chores list with colorful "Assign" buttons
function displayChores() {
    const choresList = document.getElementById('choresList');
    choresList.innerHTML = '';

    chores.forEach((chore, index) => {
        const choreItem = document.createElement('li');
        const assignButton = document.createElement('button');

        assignButton.classList.add('assign-button');
        assignButton.style.backgroundColor = `hsl(${index * 30}, 70%, 80%)`; // Unique color
        assignButton.textContent = `Assign ${chore.points} points`;
        assignButton.onclick = () => assignPoints(index);

        choreItem.textContent = chore.name;
        choreItem.appendChild(assignButton);
        choresList.appendChild(choreItem);
    });
}

// Assigns points to a selected child and logs timestamp
function assignPoints(choreIndex) {
    const chore = chores[choreIndex];
    const childName = prompt(`Assign points to which child? Enter the name:`);
    const child = children.find(c => c.name.toLowerCase() === childName.toLowerCase());

    if (child) {
        const timestamp = new Date().toLocaleString();
        child.points += chore.points;
        child.history.push({ chore: chore.name, points: chore.points, time: timestamp });
        updateLeaderboard();
    } else {
        alert("Child not found!");
    }
}

// Opens modal with detailed point breakdown for a child
function showBreakdown(childIndex) {
    const child = children[childIndex];
    const breakdownTitle = document.getElementById('breakdownTitle');
    const breakdownList = document.getElementById('breakdownList');

    breakdownTitle.textContent = `${child.name}'s Point Breakdown`;
    breakdownList.innerHTML = '';
    
    child.history.forEach(entry => {
        const item = document.createElement('li');
        item.textContent = `${entry.chore}: ${entry.points} points (on ${entry.time})`;
        breakdownList.appendChild(item);
    });

    document.getElementById('breakdownModal').style.display = 'block';
}

// Closes breakdown modal
function closeBreakdown() {
    document.getElementById('breakdownModal').style.display = 'none';
}

// Updates leaderboard and displays a bar chart
function updateLeaderboard() {
    children.sort((a, b) => b.points - a.points);
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    children.forEach((child, index) => {
        const childItem = document.createElement('li');
        const bar = document.createElement('div');
        
        bar.classList.add('bar');
        bar.style.width = `${child.points * 2}px`; // Adjust scaling as needed

        childItem.innerHTML = `<span onclick="showBreakdown(${index})">${child.name} - ${child.points} points</span>`;
        childItem.appendChild(bar);
        leaderboardList.appendChild(childItem);
    });
}
