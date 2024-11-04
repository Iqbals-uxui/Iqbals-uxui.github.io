let children = JSON.parse(localStorage.getItem('children')) || [];
let chores = JSON.parse(localStorage.getItem('chores')) || [];

function addChild() {
    const childName = document.getElementById('childName').value.trim();
    if (childName) {
        children.push({ name: childName, points: 0, history: [] });
        document.getElementById('childName').value = '';
        updateLocalStorage();
        updateLeaderboard();
    }
}

function removeChild(childIndex) {
    children.splice(childIndex, 1);
    updateLocalStorage();
    updateLeaderboard();
}

function addChore() {
    const choreName = document.getElementById('choreName').value.trim();
    const chorePoints = parseInt(document.getElementById('chorePoints').value);
    if (choreName && !isNaN(chorePoints)) {
        chores.push({ name: choreName, points: chorePoints, color: getRandomColor() });
        document.getElementById('choreName').value = '';
        document.getElementById('chorePoints').value = '';
        updateLocalStorage();
        displayChores();
    }
}

function displayChores() {
    const choresList = document.getElementById('choresList');
    choresList.innerHTML = '';

    chores.forEach((chore, index) => {
        const choreItem = document.createElement('li');
        choreItem.classList.add('chore-item');
        choreItem.style.backgroundColor = chore.color;
        choreItem.innerHTML = `${chore.name} (${chore.points} points)`;

        const assignButton = document.createElement('button');
        const removeButton = document.createElement('button');
        const editButton = document.createElement('button');
        const childSelect = document.createElement('select');

        assignButton.classList.add('assign-button');
        assignButton.textContent = `Assign ${chore.points} points`;
        assignButton.onclick = () => assignPoints(index, childSelect.value);

        removeButton.classList.add('remove');
        removeButton.textContent = `Remove ${chore.points} points`;
        removeButton.onclick = () => removePoints(index, childSelect.value);

        editButton.classList.add('edit');
        editButton.textContent = 'Edit Chore';
        editButton.onclick = () => editChore(index);

        children.forEach(child => {
            const option = document.createElement('option');
            option.value = child.name;
            option.textContent = child.name;
            childSelect.appendChild(option);
        });

        choreItem.appendChild(childSelect);
        choreItem.appendChild(assignButton);
        choreItem.appendChild(removeButton);
        choreItem.appendChild(editButton);
        choresList.appendChild(choreItem);
    });
}

function editChore(choreIndex) {
    const newName = prompt('Enter new chore name:', chores[choreIndex].name);
    const newPoints = prompt('Enter new points:', chores[choreIndex].points);
    if (newName && !isNaN(newPoints)) {
        chores[choreIndex].name = newName;
        chores[choreIndex].points = parseInt(newPoints
