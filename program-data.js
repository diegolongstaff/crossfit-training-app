// program-data.js - Contains all workout program data
const programData = {
    1: {
        Mon: {
            sections: {
                'WARMUP': [
                    '5 min: Light row/bike',
                    '3 rounds:',
                    '5 inchworm + shoulder taps',
                    '5 ring rows',
                    '10 air squats'
                ],
                'STRENGTH': [
                    'Back Squat',
                    '4 x 3 @ 80% (104kg)',
                    'Rest 2-3 min',
                    '1 x AMRAP @ 70% (91kg)'
                ],
                'CONDITIONING': [
                    'EMOM 24:',
                    'Min 1: 12 cal row',
                    'Min 2: 8 power clean (60kg)',
                    'Min 3: 15 wall balls (9kg)',
                    'Min 4: 12 burpees'
                ]
            },
            completed: false
        },
        // Continue with all other days for week 1
    },
    // Continue with weeks 2-4
};

// Helper functions related to the program
function initializeFromStorage() {
    const savedData = localStorage.getItem('trainingData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.assign(programData, parsedData);
    }

    const savedNotes = localStorage.getItem('workoutNotes');
    if (savedNotes) {
        document.getElementById('notes').value = savedNotes;
    }
}

function saveToStorage() {
    localStorage.setItem('trainingData', JSON.stringify(programData));
}

function saveNotes() {
    const notes = document.getElementById('notes').value;
    localStorage.setItem('workoutNotes', notes);
    alert('Notes saved!');
}

function changeWeek(week) {
    currentWeek = week;
    document.querySelectorAll('.week-btn').forEach(btn => {
        const btnWeek = parseInt(btn.dataset.week);
        btn.className = `week-btn px-4 py-2 rounded ${btnWeek === week ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`;
    });
    displayWorkout();
}

function toggleCompletion(day) {
    const weekData = programData[currentWeek];
    if (weekData && weekData[day]) {
        weekData[day].completed = !weekData[day].completed;
        saveToStorage();
        displayWorkout();
    }
}

function displayWorkout() {
    const container = document.getElementById('workout-display');
    container.innerHTML = '';

    const week = programData[currentWeek];
    if (!week) return;

    Object.entries(week).forEach(([day, dayData]) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'bg-gray-50 rounded p-4 mb-4';

        // Day header with completion toggle
        const header = document.createElement('div');
        header.className = 'flex justify-between items-center mb-2';
        header.innerHTML = `
            <h2 class="text-xl font-bold">${day}</h2>
            <input type="checkbox" 
                   ${dayData.completed ? 'checked' : ''} 
                   onchange="toggleCompletion('${day}')"
                   class="h-6 w-6">
        `;
        dayElement.appendChild(header);

        // Workout sections
        Object.entries(dayData.sections).forEach(([section, exercises]) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'mb-4';
            sectionElement.innerHTML = `
                <h3 class="font-semibold text-blue-600 mb-2">${section}</h3>
                <ul class="list-none pl-4">
                    ${exercises.map(ex => `<li class="mb-1">${ex}</li>`).join('')}
                </ul>
            `;
            dayElement.appendChild(sectionElement);
        });

        container.appendChild(dayElement);
    });
}

// Add global variables
let currentWeek = 1;
let currentDay = new Date().getDay();
const dayMapping = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    0: 'Sun'
};

// Initialize 
document.addEventListener('DOMContentLoaded', () => {
    initializeFromStorage();
    changeWeek(1);
});

// Helper functions
function quickSet(minutes, seconds) {
    document.getElementById('minutesInput').value = minutes;
    document.getElementById('secondsInput').value = seconds;
}
