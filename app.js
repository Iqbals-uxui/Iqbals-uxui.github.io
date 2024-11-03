// Data structures to hold children and chores
const children = [];
const chores = [];

// Adds a child
function addChild() {
    const childName = document.getElementById('childName').value.trim();
    if (childName) {
        children.push({ name: childName, points: 0 });
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

// Displays chores list with options to assign points
function displayChores() {
    const choresList = document.getElementById('choresList');
    choresList.innerHTML = '';

    chores.forEach((chore, index) => {
        const choreItem = document.createElement('li');
        choreItem.innerHTML = `${chore.name} (${chore.points} points) 
            <button onclick="assignPoints(${index})">Assign</button>`;
        choresList.appendChild(choreItem);
    });
}

// Assigns points to a selected child
function assignPoints(choreIndex) {
    const chore = chores[choreIndex];
    const childName = prompt(`Assign points to which child? Enter the name:`);
    const child = children.find(c => c.name.toLowerCase() === childName.toLowerCase());

    if (child) {
        child.points += chore.points;
        updateLeaderboard();
    } else {
        alert("Child not found!");
    }
}

// Updates the leaderboard by sorting children by points
function updateLeaderboard() {
    children.sort((a, b) => b.points - a.points);
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    children.forEach(child => {
        const childItem = document.createElement('li');
        childItem.textContent = `${child.name} - ${child.points} points`;
        leaderboardList.appendChild(childItem);
    });
}
