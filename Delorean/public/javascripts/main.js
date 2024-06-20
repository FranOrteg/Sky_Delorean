document.addEventListener('DOMContentLoaded', async () => {
    try {
        const users = await fetchUsers();
        renderUsers(users);
        renderUserData(users);
        // Aquí puedes llamar a más funciones para añadir más elementos
        createInputElement();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});

async function fetchUsers() {
    const response = await fetch('/api/user');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function renderUsers(users) {
    const usersContainer = document.getElementById('users-container');
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.textContent = `ID: ${user.contact_id}, Name: ${user.Name}, Email: ${user.Email} `;
        usersContainer.appendChild(userDiv);
    });
}

function renderUserData(users) {
    const userData = document.getElementById('users-data');
    users.forEach(user => {
        const dataDiv = document.createElement('div');
        dataDiv.textContent = `Country: ${user.Country}, BagMinutes: ${user.bagMinutes} `;
        userData.appendChild(dataDiv);
    });
}
