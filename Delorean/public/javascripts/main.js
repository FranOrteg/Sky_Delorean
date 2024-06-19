// public/javascripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/user')
        .then(response => response.json())
        .then(users => {
            const usersContainer = document.getElementById('users-container');
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `ID: ${user.contact_id}, Name: ${user.Name}`;
                usersContainer.appendChild(userDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
});
