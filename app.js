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
        const childSelect = document.createElement('select');

        assignButton.classList.add('assign-button');
        assignButton.textContent = `Assign ${chore.points} points`;
        assignButton.onclick = () => assignPoints(index, childSelect.value);

        children.forEach(child => {
            const option = document.createElement('option');
            option.value = child.name;
            option.textContent = child.name;
            childSelect.appendChild(option);
        });

        choreItem.textContent = chore.name;
        choreItem.appendChild(childSelect);
        choreItem.appendChild(assignButton);
        choresList.appendChild(choreItem);
    });
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

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    children.sort((a, b) => b.points - a.points).forEach(child => {
        const item = document.createElement('li');
        item.textContent = `${child.name}: ${child.points} points`;
        item.onclick = () => showBreakdown(children.indexOf(child));
        leaderboardList.appendChild(item);
    });
}

function showBreakdown(childIndex) {
    const child = children[childIndex];
    document.getElementById('breakdownTitle').textContent = `${child.name}'s Point Breakdown`;
    populateDateFilters(child.history);
    filterBreakdown(childIndex);
    document.getElementById('breakdownModal').style.display = 'block';
}

function closeBreakdown() {
    document.getElementById('breakdownModal').style.display = 'none';
}

function populateDateFilters(history) {
    // No additional code needed for this example, but you may populate month/year dropdowns if necessary
}

function filterBreakdown(childIndex) {
    const monthFilter = document.getElementById('monthFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;
    const breakdownList = document.getElementById('breakdownList');
    breakdownList.innerHTML = '';

    children[childIndex].history
        .filter(entry => {
            const entryDate = new Date(entry.time);
            return (!monthFilter || entryDate.getMonth() + 1 === parseInt(monthFilter)) &&
                   (!yearFilter || entryDate.getFullYear() === parseInt(yearFilter));
        })
        .forEach(entry => {
            const item = document.createElement('li');
            item.textContent = `${entry.chore}: ${entry.points} points (on ${entry.time})`;
            breakdownList.appendChild(item);
        });
}
