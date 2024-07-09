document.addEventListener('DOMContentLoaded', async () => {
    try {
        const users = await fetchUsers();
        populateUserSelect(users);
        handleUserSelection();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    document.querySelector('.btn-warning').addEventListener('click', handleSaveButtonClick);
    document.querySelector('.insert').addEventListener('click', handleInsertButtonClick);


     // Video modal handling
     var video = document.getElementById('modalVideo');
     var exampleModal = document.getElementById('jokeModal');
 
     exampleModal.addEventListener('shown.bs.modal', function () {
         video.play();
     });
 
     exampleModal.addEventListener('hidden.bs.modal', function () {
         video.pause();
         video.currentTime = 0;  // Reset video to the beginning
     });
});

async function fetchUsers() {
    const response = await fetch('/api/user');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function fetchUserData(userId) {
    const response = await fetch(`/api/user/${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function populateUserSelect(users) {
    const userSelect = document.getElementById('user-select');
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.contact_id;
        option.textContent = user.Name;
        userSelect.appendChild(option);
    });
}

function handleUserSelection() {
    const userSelect = document.getElementById('user-select');
    userSelect.addEventListener('change', async (event) => {
        const userId = event.target.value;
        if (userId) {
            const userData = await fetchUserData(userId);
            createUserTable(userData);
        }
    });
};

function formatDateTime(input){
    const date = new Date(input);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hour < 10) hour = '0' + hour;
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    
    const dateformatted = `${year}-${month}-${day} ${hour}:${min}:${sec}`

    return dateformatted
}

function createUserTable(data) {
    const tableBody = document.getElementById('user-data-table-body');
    tableBody.innerHTML = '';

    data.forEach(row => {
        const tableRow = document.createElement('tr');

        const selectCell = document.createElement('td');
        const selectInput = document.createElement('input');
        selectInput.type = 'radio';
        selectInput.classList.add('form-check-input');
        selectInput.name = 'selected-row';
        selectInput.value = row.id;
        selectCell.appendChild(selectInput);
        tableRow.appendChild(selectCell);

        const idCell = document.createElement('td');
        idCell.textContent = row.id;
        tableRow.appendChild(idCell);

        const startCell = document.createElement('td');
        const startInput = document.createElement('input');
        startInput.type = 'text';
        startInput.value = formatDateTime(row.start);
        startInput.classList.add('form-control');
        startInput.setAttribute('data-id', row.id);
        startInput.setAttribute('data-field', 'start');
        startCell.appendChild(startInput);
        tableRow.appendChild(startCell);

        const endCell = document.createElement('td');
        const endInput = document.createElement('input');
        endInput.type = 'text';
        endInput.value = row.end ? formatDateTime(row.end) : 'N/A';
        endInput.classList.add('form-control');
        endInput.setAttribute('data-id', row.id);
        endInput.setAttribute('data-field', 'end');
        endCell.appendChild(endInput);
        tableRow.appendChild(endCell);

        tableBody.appendChild(tableRow);
    });
};

function handleSaveButtonClick() {
    const selectedRow = document.querySelector('input[name="selected-row"]:checked');
    if (!selectedRow) {
        alert('Please select a row to save.');
        return;
    }

    const rowId = selectedRow.value;
    const startInput = document.querySelector(`input[data-id="${rowId}"][data-field="start"]`).value;
    const endInput = document.querySelector(`input[data-id="${rowId}"][data-field="end"]`).value;

    const updatedData = {
        id: rowId,
        start: formatDateTime(startInput),
        end: endInput !== 'N/A' ? formatDateTime(endInput) : null,
    };

    updateUserData(updatedData);
}

async function updateUserData(data) {
    const response = await fetch('/api/user/startEndDay', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('User data updated successfully');
        window.location.reload();
    } else {
        alert('Failed to update user data');
    }
}


function handleInsertButtonClick() {
    const start = document.getElementById('start-input').value;
    const end = document.getElementById('end-input').value;
    const userSelect = document.getElementById('user-select');

    if (!userSelect.value || userSelect.value === 'Users') {
        alert('Please select a user.');
        return;
    }

    if (!start) {
        alert('Please enter a start date.');
        return;
    }

    if (!end) {
        alert('Please enter an end date.');
        return;
    }

    const insertData = {
        start: start,
        end: end !== 'N/A' ? end : null,
        userId: userSelect.value,
    };

    insertNewData(insertData);
}

async function insertNewData(data) {
    const response = await fetch('/api/user/startEndDay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('User data inserted successfully');
        document.getElementById('start-input').value = '';
        document.getElementById('end-input').value = '';
        window.location.reload();
    } else {
        alert('Failed to insert user data');
    }
}



