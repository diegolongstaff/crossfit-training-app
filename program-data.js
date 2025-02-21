// program-data.js - 8-week Murph training program
const programData = {
    // Weeks 1-4 remain mostly the same, with Annie added and Murph test in Week 4
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
        Tue: {
            sections: {
                'WARMUP': [
                    '5 min: Jump rope/run',
                    '3 rounds:',
                    '5 strict pull-ups',
                    '10 push-ups',
                    '15 mountain climbers'
                ],
                'STRENGTH': [
                    'A. Strict Press',
                    '5 x 5 linear progression',
                    'Start @ 75%, +2kg/set',
                    'Rest 2 min',
                    '',
                    'B. Weighted Pull-ups',
                    '5 x 3 consistent load',
                    'Rest 90 sec'
                ],
                'CONDITIONING': [
                    'For Time (12 min cap):',
                    '50 wallballs (9kg)',
                    '40 cal bike',
                    '30 devil press (2x22kg)',
                    '20 cal bike',
                    '10 wallballs'
                ]
            },
            completed: false
        },
        Wed: {
            sections: {
                'REST': ['Active Recovery']
            },
            completed: false
        },
        Thu: {
            sections: {
                'WARMUP': [
                    '5 min: Light assault bike',
                    '3 rounds:',
                    '10 PVC pass-throughs',
                    '10 jumping lunges',
                    '5 strict HSPU prog'
                ],
                'STRENGTH': [
                    'Clean & Jerk Complex',
                    'Every 3 min x 7 sets:',
                    '1 clean pull',
                    '1 hang clean',
                    '1 clean',
                    '1 jerk',
                    'Build sets 1-5, maintain 6-7'
                ],
                'CONDITIONING': [
                    '5 Rounds:',
                    '400m run',
                    '15 power snatch (43kg)',
                    'Rest 2 min'
                ]
            },
            completed: false
        },
        Fri: {
            sections: {
                'WARMUP': [
                    '5 min: Row/bike/run',
                    '2 rounds:',
                    '10 GHD hip ext',
                    '10 KB swings',
                    '10 ring rows'
                ],
                'STRENGTH': [
                    'Deadlift',
                    '5 x 2 @ 85%',
                    '3 x 5 @ 75%',
                    'Rest 2-3 min'
                ],
                'ANNIE': [
                    'For Time:',
                    '50-40-30-20-10 reps of:',
                    'Double-unders',
                    'Sit-ups'
                ]
            },
            completed: false
        },
        Sat: {
            sections: {
                'REST': ['Recovery']
            },
            completed: false
        },
        Sun: {
            sections: {
                'ZONE 2': [
                    '50-70 min:',
                    'Run/bike/row',
                    'Keep HR 65-75% max',
                    'Conversational pace'
                ]
            },
            completed: false
        }
    },
    
    // Remaining weeks from original program...
    // [WEEKS 2-3 CONTENT HERE]

    // Modified Week 4 with Murph Test
    4: {
        Mon: {
            sections: {
                'WARMUP': [
                    '1200m easy run',
                    '2 rounds:',
                    '10 pull-ups',
                    '20 push-ups',
                    '30 air squats'
                ],
                'STRENGTH': [
                    'Front Squat',
                    '3 x 3 @ 80% (88kg)',
                    '2 x 5 @ 70% (77kg)',
                    'Rest 2-3 min'
                ],
                'CONDITIONING': [
                    'A. 1 mile time trial',
                    'Record time',
                    'Rest 5 minutes',
                    '',
                    'B. 5 rounds:',
                    '10 pull-ups',
                    '20 push-ups',
                    '30 air squats',
                    'Record total time'
                ]
            },
            completed: false
        },
        Tue: {
            sections: {
                'WARMUP': [
                    '800m run',
                    '2 rounds:',
                    '5 pull-ups',
                    '10 push-ups',
                    '15 air squats'
                ],
                'STRENGTH': [
                    'Push Press',
                    '5 x 2 @ 75%',
                    'Focus: bar speed',
                    'Rest 2 min'
                ],
                'ANNIE': [
                    'For Time:',
                    '50-40-30-20-10 reps of:',
                    'Double-unders',
                    'Sit-ups',
                    'Compare to Week 1'
                ]
            },
            completed: false
        },
        Wed: {
            sections: {
                'REST': ['Active Recovery']
            },
            completed: false
        },
        Thu: {
            sections: {
                'WARMUP': [
                    '1 mile easy run',
                    'Light pull-up/push-up',
                    'Movement prep',
                    'Joint mobility'
                ],
                'SKILL': [
                    'A. Pull-ups',
                    '5 x failure',
                    'Rest 3 min',
                    '',
                    'B. Push-ups',
                    '3 x failure',
                    'Rest 2 min'
                ],
                'REST': [
                    'Rest & Recovery for Murph'
                ]
            },
            completed: false
        },
        Fri: {
            sections: {
                'WARMUP': [
                    '800m easy run',
                    'Full body mobility',
                    'Movement practice',
                    'Very light prep'
                ],
                'MURPH TEST': [
                    '1 mile run',
                    '100 pull-ups',
                    '200 push-ups',
                    '300 air squats',
                    '1 mile run',
                    'Record time for comparison'
                ]
            },
            completed: false
        },
        Sat: {
            sections: {
                'REST': ['Full Recovery Day']
            },
            completed: false
        },
        Sun: {
            sections: {
                'ACTIVE RECOVERY': [
                    '30-40 min:',
                    'Very light movement',
                    'Walking/swimming/cycling',
                    'Focus on recovery'
                ]
            },
            completed: false
        }
    },

    // WEEKS 5-8: PROGRESSION TOWARD FINAL MURPH
    5: {
        Mon: {
            sections: {
                'WARMUP': [
                    '800m easy run',
                    '3 rounds:',
                    '5 pull-ups',
                    '10 push-ups',
                    '15 air squats'
                ],
                'STRENGTH': [
                    'Back Squat',
                    '5 x 3 @ 82.5% (107kg)',
                    'Rest 2 min',
                    '1 x AMRAP @ 75% (97.5kg)'
                ],
                'CONDITIONING': [
                    '6 Rounds:',
                    '400m run',
                    '10 pull-ups',
                    '20 push-ups',
                    '30 air squats',
                    'Rest 2:30 between rounds'
                ]
            },
            completed: false
        },
        Tue: {
            sections: {
                'WARMUP': [
                    '5 min: Row/bike',
                    '3 rounds:',
                    '8 ring rows',
                    '12 push-ups',
                    '16 mountain climbers'
                ],
                'STRENGTH': [
                    'A. Bench Press',
                    '5 x 5 @ 75-80%',
                    'Rest 2 min',
                    '',
                    'B. Strict Pull-ups',
                    '4 x max reps',
                    'Rest 2 min'
                ],
                'CONDITIONING': [
                    'AMRAP 15 min:',
                    '15 wallballs (9kg)',
                    '15 cal assault bike',
                    '15 box jumps (24")',
                    '15 KB swings (32kg)'
                ]
            },
            completed: false
        },
        Wed: {
            sections: {
                'REST': ['Active Recovery']
            },
            completed: false
        },
        Thu: {
            sections: {
                'WARMUP': [
                    '1000m easy run',
                    '3 rounds:',
                    '8 push-ups',
                    '12 air squats',
                    '5 strict pull-ups'
                ],
                'STRENGTH': [
                    'Front Squat',
                    '4 x 3 @ 82.5% (90kg)',
                    '2 x 5 @ 75% (82.5kg)',
                    'Rest 2-3 min'
                ],
                'ANNIE': [
                    'For Time:',
                    '50-40-30-20-10 reps of:',
                    'Double-unders',
                    'Sit-ups',
                    'Record time'
                ]
            },
            completed: false
        },
        Fri: {
            sections: {
                'WARMUP': [
                    '5 min: row/bike/run',
                    '2 rounds:',
                    '10 KB swings',
                    '10 DB RDLs',
                    '10 Russian twists'
                ],
                'STRENGTH': [
                    'Deadlift',
                    '5 x 2 @ 87.5%',
                    '2 x 5 @ 77.5%',
                    'Rest 2-3 min'
                ],
                'CONDITIONING': [
                    'EMOM 24 min:',
                    'Min 1: 12 cal row',
                    'Min 2: 12 pull-ups',
                    'Min 3: 12 push-ups',
                    'Min 4: 24 air squats'
                ]
            },
            completed: false
        },
        Sat: {
            sections: {
                'REST': ['Recovery']
            },
            completed: false
        },
        Sun: {
            sections: {
                'ZONE 2': [
                    '60-80 min:',
                    'Run/bike/row',
                    'Keep HR 65-75% max',
                    'Conversational pace'
                ]
            },
            completed: false
        }
    },
    6: {
        Mon: {
            sections: {
                'WARMUP': [
                    '1000m easy run',
                    '3 rounds:',
                    '8 pull-ups',
                    '16 push-ups',
                    '24 air squats'
                ],
                'STRENGTH': [
                    'Push Press',
                    '6 x 2 @ 82.5%',
                    'Rest 2 min'
                ],
                'CONDITIONING': [
                    'For Time:',
                    '800m run',
                    '25 pull-ups',
                    '50 push-ups',
                    '75 air squats',
                    '800m run',
                    'Repeat for 2 total rounds',
                    '20 min cap'
                ]
            },
            completed: false
        },
        Tue: {
            sections: {
                'WARMUP': [
                    '5 min: Row/bike',
                    '3 rounds:',
                    '10 band pull-aparts',
                    '10 strict press',
                    '10 reverse lunges/leg'
                ],
                'STRENGTH': [
                    'A. Bench Press',
                    '5 x 3 @ 80-85%',
                    'Rest 2-3 min',
                    '',
                    'B. Weighted Pull-ups',
                    '5 x 3 + 1 AMRAP set',
                    'Rest 2 min'
                ],
                'ANNIE': [
                    'For Time:',
                    '50-40-30-20-10 reps of:',
                    'Double-unders',
                    'Sit-ups',
                    'Compare to previous times'
                ]
            },
            completed: false
        },
        Wed: {
            sections: {
                'REST': ['Active Recovery']
            },
            completed: false
        },
        Thu: {
            sections: {
                'WARMUP': [
                    '1200m easy run',
                    '3 rounds:',
                    '10 ring rows',
                    '15 push-ups',
                    '20 air squats'
                ],
                'STRENGTH': [
                    'Back Squat',
                    '3 x 5 @ 80% (104kg)',
                    '2 x 2 @ 90% (117kg)',
                    'Rest 2-3 min'
                ],
                'CONDITIONING': [
                    'EMOM 30 min:',
                    'Min 1: 10 pull-ups',
                    'Min 2: 20 push-ups',
                    'Min 3: 30 air squats',
                    'Min 4: 15 cal row/assault bike',
                    'Min 5: Rest',
                    '6 complete rounds'
                ]
            },
            completed: false
        },
        Fri: {
            sections: {
                'WARMUP': [
                    '5 min: Row/bike/run',
                    '3 rounds:',
                    '8 DB snatch each arm',
                    '8 DB RDLs',
                    '16 Russian twists'
                ],
                'STRENGTH': [
                    'Deadlift',
                    '5 x 1 @ 90%',
                    '3 x 3 @ 80%',
                    'Rest 3 min'
                ],
                'CONDITIONING': [
                    '4 Rounds:',
                    '800m run',
                    '15 pull-ups',
                    '30 push-ups',
                    '45 air squats',
                    'Rest 3 min between rounds',
                    'Focus on consistent pacing'
                ]
            },
            completed: false
        },
        Sat: {
            sections: {
                'REST': ['Recovery']
            },
            completed: false
        },
        Sun: {
            sections: {
                'ZONE 2': [
                    '60-80 min:',
                    'Run/bike/row',
                    'Keep HR 65-75% max',
                    'Conversational pace'
                ]
            },
            completed: false
        }
    },
    7: {
        Mon: {
            sections: {
                'WARMUP': [
                    '1 mile easy run',
                    '2 rounds:',
                    '10 pull-ups',
                    '20 push-ups',
                    '30 air squats'
                ],
                'STRENGTH': [
                    'Front Squat',
                    '3 x 3 @ 85% (93.5kg)',
                    '2 x 5 @ 75% (82.5kg)',
                    'Rest 2-3 min'
                ],
                'CONDITIONING': [
                    'A. 1 mile time trial',
                    'Record time',
                    'Rest 5 minutes',
                    '',
                    'B. 5 rounds for time:',
                    '15 pull-ups',
                    '30 push-ups',
                    '45 air squats'
                ]
            },
            completed: false
        },
        Tue: {
            sections: {
                'WARMUP': [
                    '800m run',
                    '3 rounds:',
                    '10 push-ups',
                    '15 air squats',
                    '8 strict pull-ups'
                ],
                'STRENGTH': [
                    'A. Strict Press',
                    '6 x 3 @ 80%',
                    'Rest 2 min',
                    '',
                    'B. Pull-up Ladder',
                    '1-2-3-4-5-6-7-8-9-10',
                    'Rest as needed'
                ],
                'CONDITIONING': [
                    'For Time:',
                    '100 pull-ups',
                    '200 push-ups',
                    '300 air squats',
                    'Partition as needed',
                    '25 min cap'
                ]
            },
            completed: false
        },
        Wed: {
            sections: {
                'REST': ['Active Recovery']
            },
            completed: false
        },
        Thu: {
            sections: {
                'WARMUP': [
                    '1200m easy run',
                    'Dynamic stretching',
                    'Movement prep',
                    'Light pull-up/push-up activation'
                ],
                'ANNIE': [
                    'For Time:',
                    '50-40-30-20-10 reps of:',
                    'Double-unders',
                    'Sit-ups',
                    'Goal: fastest time so far'
                ],
                'STRENGTH': [
                    'A. Back Squat',
                    '3 x 3 @ 85% (110.5kg)',
                    'Rest 3 min'
                ]
            },
            completed: false
        },
        Fri: {
            sections: {
                'WARMUP': [
                    '800m easy run',
                    '2 rounds:',
                    '8 pull-ups',
                    '16 push-ups',
                    '24 air squats'
                ],
                'SKILL/PRACTICE': [
                    'Practice efficient movement patterns:',
                    'Pull-up technique & cycling',
                    'Push-up form & breathing',
                    'Air squat efficiency',
                    'Running form & pacing'
                ],
                'CONDITIONING': [
                    '30-20-10 reps for time:',
                    'Pull-ups',
                    'Push-ups',
                    'Air squats',
                    '400m run between each round',
                    'Focus on movement efficiency'
                ]
            },
            completed: false
        },
        Sat: {
            sections: {
                'REST': ['Full Recovery Day']
            },
            completed: false
        },
        Sun: {
            sections: {
                'ZONE 2': [
                    '40-50 min:',
                    'Easy run',
                    'Keep HR low',
                    'Recovery focus for next week'
                ]
            },
            completed: false
        }
    },
    8: {
        Mon: {
            sections: {
                'WARMUP': [
                    '1 mile easy run',
                    '2 rounds:',
                    '8 pull-ups',
                    '16 push-ups',
                    '24 air squats'
                ],
                'STRENGTH': [
                    'Light day:',
                    'Back Squat',
                    '3 x 5 @ 70% (91kg)',
                    'Rest 2 min'
                ],
                'CONDITIONING': [
                    '3 Rounds:',
                    '400m run',
                    '15 pull-ups',
                    '30 push-ups',
                    '45 air squats',
                    'Rest 3 min between rounds',
                    'Focus on perfect form'
                ]
            },
            completed: false
        },
        Tue: {
            sections: {
                'WARMUP': [
                    '800m easy run',
                    '2 rounds:',
                    '5 pull-ups',
                    '10 push-ups',
                    '15 air squats'
                ],
                'ANNIE': [
                    'Final ANNIE Test:',
                    '50-40-30-20-10 reps of:',
                    'Double-unders',
                    'Sit-ups',
                    'Record your best time'
                ],
                'SKILL': [
                    'Murph strategy review:',
                    'Pacing plan',
                    'Rep scheme planning',
                    'Nutrition/hydration plan'
                ]
            },
            completed: false
        },
        Wed: {
            sections: {
                'REST': ['Active Recovery',
                    'Light mobility only',
                    'Extra hydration',
                    'Focus on sleep quality'
                ]
            },
            completed: false
        },
        Thu: {
            sections: {
                'WARMUP': [
                    '800m very easy run',
                    'Light movement pattern practice:',
                    '5 pull-ups',
                    '10 push-ups',
                    '15 air squats',
                    'Focus on quality'
                ],
                'SKILL': [
                    'Movement efficiency practice:',
                    '3 sets of:',
                    '5 perfect pull-ups',
                    '10 perfect push-ups',
                    '15 perfect air squats',
                    'Rest as needed'
                ],
                'RECOVERY': [
                    'Full body mobility',
                    'Extra hydration',
                    'Early to bed'
                ]
            },
            completed: false
        },
        Fri: {
            sections: {
                'WARMUP': [
                    '800m easy run',
                    'Dynamic stretching',
                    'Movement activation',
                    'Mental preparation'
                ],
                'FINAL MURPH TEST': [
                    '1 mile run',
                    '100 pull-ups',
                    '200 push-ups',
                    '300 air squats',
                    '1 mile run',
                    'Compare to Week 4 time',
                    'Goal: improvement from first test'
                ]
            },
            completed: false
        },
        Sat: {
            sections: {
                'REST': ['Complete Recovery Day']
            },
            completed: false
        },
        Sun: {
            sections: {
                'ACTIVE RECOVERY': [
                    '30-40 min:',
                    'Very light movement',
                    'Walking/swimming/cycling',
                    'Celebrate your accomplishment!'
                ]
            },
            completed: false
        }
    }
};

// Helper functions
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
            
            // Special formatting for important sections
            let sectionClass = 'text-blue-600';
            if (section === 'MURPH TEST' || section === 'FINAL MURPH TEST') {
                sectionClass = 'text-red-600 text-lg';
            } else if (section === 'ANNIE') {
                sectionClass = 'text-purple-600';
            }
            
            sectionElement.innerHTML = `
                <h3 class="font-semibold ${sectionClass} mb-2">${section}</h3>
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
