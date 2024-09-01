// Time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('time').textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// IP Address detection
async function fetchIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        document.getElementById('ipDisplay').firstChild.textContent = `IP: ${data.ip}`;
    } catch (error) {
        document.getElementById('ipDisplay').firstChild.textContent = 'IP: Unable to detect';
        console.error('Error fetching IP:', error);
    }
}
fetchIP();

// Elements
const welcomeText = document.getElementById('welcomeText');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');
const undoButton = document.getElementById('undoButton');
const ipDisplay = document.getElementById('ipDisplay');
const removeIPButton = document.getElementById('removeIP');
const widgets = document.getElementById('widgets');
const addWidgetForm = document.getElementById('addWidgetForm');
const widgetNameInput = document.getElementById('widgetName');
const widgetURLInput = document.getElementById('widgetURL');
const addWidgetButton = document.getElementById('addWidgetButton');

let originalState = {};

// Edit and save functionality
function saveOriginalState() {
    originalState = {
        welcomeText: welcomeText.textContent,
        widgetsHTML: widgets.innerHTML
    };
}

editButton.addEventListener('click', () => {
    saveOriginalState();

    welcomeText.contentEditable = true;
    welcomeText.style.border = '1px dashed #ffffff';
    ipDisplay.style.opacity = 0.5;
    removeIPButton.style.display = 'block';
    saveButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    undoButton.style.display = 'inline';
    editButton.style.display = 'none';

    // Show remove buttons on widgets
    document.querySelectorAll('.remove-widget').forEach(button => {
        button.style.display = 'block';
    });

    // Show add widget form
    addWidgetForm.style.display = 'block';
});

saveButton.addEventListener('click', () => {
    welcomeText.contentEditable = false;
    welcomeText.style.border = 'none';
    ipDisplay.style.opacity = 0.7;
    removeIPButton.style.display = 'none';
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
    undoButton.style.display = 'none';
    editButton.style.display = 'inline';

    // Save to local storage
    localStorage.setItem('welcomeText', welcomeText.textContent);

    // Hide remove buttons on widgets
    document.querySelectorAll('.remove-widget').forEach(button => {
        button.style.display = 'none';
    });

    // Hide add widget form
    addWidgetForm.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
    welcomeText.contentEditable = false;
    welcomeText.textContent = originalState.welcomeText;
    widgets.innerHTML = originalState.widgetsHTML;
    welcomeText.style.border = 'none';
    ipDisplay.style.opacity = 0.7;
    removeIPButton.style.display = 'none';
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
    undoButton.style.display = 'none';
    editButton.style.display = 'inline';

    // Reassign event listeners to newly added remove buttons
    document.querySelectorAll('.remove-widget').forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
        });
    });

    // Hide add widget form
    addWidgetForm.style.display = 'none';
});

undoButton.addEventListener('click', () => {
    welcomeText.textContent = originalState.welcomeText;
    widgets.innerHTML = originalState.widgetsHTML;
});

// Toggle IP visibility
removeIPButton.addEventListener('click', () => {
    ipDisplay.style.display = 'none';
    localStorage.setItem('ipHidden', 'true');
});

// Load saved welcome text and IP visibility
const savedWelcomeText = localStorage.getItem('welcomeText');
if (savedWelcomeText) {
    welcomeText.textContent = savedWelcomeText;
}

const ipHidden = localStorage.getItem('ipHidden');
if (ipHidden === 'true') {
    ipDisplay.style.display = 'none';
}

// Add widget functionality
addWidgetButton.addEventListener('click', () => {
    const widgetName = widgetNameInput.value.trim();
    const widgetURL = widgetURLInput.value.trim();

    if (widgetName && widgetURL) {
        const newWidget = document.createElement('div');
        newWidget.className = 'widget';
        newWidget.innerHTML = `<a href="${widgetURL}" target="_blank">${widgetName}</a><button class="remove-widget">&times;</button>`;

        newWidget.querySelector('.remove-widget').addEventListener('click', () => {
            newWidget.remove();
        });

        widgets.appendChild(newWidget);

        widgetNameInput.value = '';
        widgetURLInput.value = '';
    }
});

// Add widget remove functionality
document.querySelectorAll('.remove-widget').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.remove();
    });
});

// Toggle functionality for different sections
document.getElementById('toggleWelcome').addEventListener('change', function() {
    welcomeText.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('toggleTime').addEventListener('change', function() {
    document.getElementById('time').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('toggleIP').addEventListener('change', function() {
    ipDisplay.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('toggleSearch').addEventListener('change', function() {
    document.getElementById('searchBar').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('toggleWidgets').addEventListener('change', function() {
    widgets.style.display = this.checked ? 'flex' : 'none';
});
