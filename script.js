// Base URL for API requests
const API_BASE_URL = 'https://ra1g.kobohome.eu/api/f1/admin';

const env_local = {
    url: 'http://localhost:9000/api/f1/admin',
}
const env_prod = {
    url: 'https://ra1g.kobohome.eu/api/f1/admin',
}

let env;
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    env = env_local;
} else {
    env = env_prod;
}

// Fetch events and populate the table
function fetchEvents() {
    const token = sessionStorage.getItem('admin_token');
    if (!token) {
        alert('Token not found. Please log in.');
        window.location.href = 'index.html';
        return;
    }

    fetch(`${env.url}/events`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.status === 401) {
                alert('Invalid token. Please log in again.');
                sessionStorage.removeItem('admin_token');
                window.location.href = 'index.html';
                return;
            }
            return response.json();
        })
        .then(events => {
            const tableBody = document.getElementById('event-table-body');
            tableBody.innerHTML = '';

            events.forEach(event => {
                const row = `
                <tr>
                    <td>${event.name}</td>
                    <td>
                        <ul>
                            ${event.sessions.map(session => `<li>${session.definition.name} (${session.date_start} - ${session.date_end})</li>`).join('')}
                        </ul>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editEvent('${event.id}')">Edit</button>
                    </td>
                </tr>
            `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching events:', error));
}

// Fetch session definitions
let sessionDefinitions = [];
function fetchSessionDefinitions(token) {
    fetch(`${env.url}/session-definitions`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            sessionDefinitions = Object.entries(data).map(([id, name]) => ({ id: parseInt(id), name }));
        })
        .catch(error => console.error('Error fetching session definitions:', error));
}

// Edit event
function editEvent(eventId) {
    const token = sessionStorage.getItem('admin_token');
    if (!token) {
        alert('Token not found. Please log in.');
        window.location.href = 'index.html';
        return;
    }

    fetch(`${env.url}/events/${eventId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(event => {
            const eventNameInput = document.getElementById('event-name');
            const sessionsContainer = document.getElementById('sessions-container');
            const infosContainer = document.getElementById('infos-container');

            // Populate event name
            eventNameInput.value = event.name;

            // Clear containers
            sessionsContainer.innerHTML = '';
            infosContainer.innerHTML = '';

            // Populate sessions
            event.sessions.forEach(session => {
                const sessionDiv = document.createElement('div');
                sessionDiv.className = 'mb-3';
                sessionDiv.innerHTML = `
                <label>Session Name</label>
                <select name="sessions[${session.id}][event_session_definition_id]" class="form-select">
                    ${sessionDefinitions.map(def => `<option value="${def.id}" ${def.id === session.event_session_definition_id ? 'selected' : ''}>${def.name}</option>`).join('')}
                </select>
                <label>Date Start</label>
                <input type="datetime-local" name="sessions[${session.id}][date_start]" class="form-control" value="${formatDate(session.date_start)}" required>
                <label>Date End</label>
                <input type="datetime-local" name="sessions[${session.id}][date_end]" class="form-control" value="${formatDate(session.date_end)}">
            `;
                sessionsContainer.appendChild(sessionDiv);
            });

            // Populate infos
            event.infos.forEach(info => {
                const infoDiv = document.createElement('div');
                infoDiv.className = 'mb-3';
                infoDiv.innerHTML = `
                <label for="info_${info.id}">${info.definition.key}</label>
                <input type="text" id="info_${info.id}" name="infos[${info.id}][value]" class="form-control" value="${info.value}" required>
            `;
                infosContainer.appendChild(infoDiv);
            });

            $('#editEventModal').modal('show');
        })
        .catch(error => console.error('Error fetching event details:', error));
}

// Save event
function saveEvent() {
    const token = sessionStorage.getItem('admin_token');
    if (!token) {
        alert('Token not found. Please log in.');
        window.location.href = 'index.html';
        return;
    }

    const formData = new FormData(document.getElementById('edit-event-form'));
    const event = {};
    formData.forEach((value, key) => {
        let [type, id, field] = key.split('[').map(part => part.replace(']', ''));
        if (!event[type]) event[type] = {};
        if (!event[type][id]) event[type][id] = {};
        event[type][id][field] = value;
    });

    const eventId = Object.keys(event.sessions)[0];

    fetch(`${env.url}/events/${eventId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById('event-name').value,
            sessions: event.sessions,
            infos: event.infos
        })
    })
        .then(response => {
            if (response.ok) {
                alert('Event updated successfully.');
                $('#editEventModal').modal('hide');
                fetchEvents();
            } else {
                alert('Failed to update event.');
            }
        })
        .catch(error => console.error('Error saving event:', error));
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.toISOString().split('T')[0]}T${date.toTimeString().split(' ')[0]}`;
}

// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const token = document.getElementById('token').value.trim();
    if (!token) {
        alert('Please enter a valid token.');
        return;
    }

    sessionStorage.setItem('admin_token', token);
    window.location.href = 'panel.html';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('admin_token');
    if (window.location.pathname.includes('panel.html') && !token) {
        alert('Token not found. Please log in.');
        window.location.href = 'index.html';
        return;
    }

    if (window.location.pathname.includes('panel.html') && token) {
        fetchEvents();
        fetchSessionDefinitions(token);
    }
});