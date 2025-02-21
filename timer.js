// Timer functionality
class WorkoutTimer {
    constructor() {
        // Timer variables
        this.timerInterval = null;
        this.timeLeft = 0;
        this.isRunning = false;
        this.isEmom = false;
        this.currentRound = 1;
        this.totalRounds = 0;
        this.workSeconds = 0;
        this.restSeconds = 0;
        this.timerMode = 'standard'; // standard, emom, tabata, forTime, amrap
        this.isCountingDown = false;
        this.countdownSeconds = 10;
        
        // DOM elements
        this.timerDisplay = document.getElementById('timerDisplay');
        this.roundDisplay = document.getElementById('emomRound');
        this.phaseDisplay = document.getElementById('phaseDisplay');
        this.progressBar = document.getElementById('timerProgressBar');
    }
    
    // Create beep sound
    createBeepSound(frequency = 800, duration = 200, type = 'sine') {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = type;
            oscillator.frequency.value = frequency;
            gainNode.gain.value = 0.5;
            
            oscillator.start();
            
            // Vibrate if supported
            if ('vibrate' in navigator) {
                navigator.vibrate(duration);
            }
            
            setTimeout(() => {
                oscillator.stop();
            }, duration);
        } catch (e) {
            console.log("Audio not supported", e);
        }
    }
    
    // Show timer based on type
    showTimer(type) {
        document.getElementById('timerModal').classList.remove('hidden');
        
        // Hide all timer type settings first
        if (document.getElementById('emomSettings')) {
            document.getElementById('emomSettings').classList.add('hidden');
        }
        if (document.getElementById('tabataSettings')) {
            document.getElementById('tabataSettings').classList.add('hidden');
        }
        if (document.getElementById('amrapSettings')) {
            document.getElementById('amrapSettings').classList.add('hidden');
        }
        
        if (document.getElementById('emomRound')) {
            document.getElementById('emomRound').classList.add('hidden');
        }
        if (document.getElementById('phaseDisplay')) {
            document.getElementById('phaseDisplay').classList.add('hidden');
        }
        
        // Show settings based on type
        this.timerMode = type;
        
        switch(type) {
            case 'emom':
                document.getElementById('timerTitle').textContent = 'EMOM Timer';
                if (document.getElementById('emomSettings')) {
                    document.getElementById('emomSettings').classList.remove('hidden');
                }
                if (document.getElementById('emomRound')) {
                    document.getElementById('emomRound').classList.remove('hidden');
                }
                this.isEmom = true;
                break;
            case 'tabata':
                document.getElementById('timerTitle').textContent = 'Tabata Timer';
                if (document.getElementById('tabataSettings')) {
                    document.getElementById('tabataSettings').classList.remove('hidden');
                }
                if (document.getElementById('phaseDisplay')) {
                    document.getElementById('phaseDisplay').classList.remove('hidden');
                }
                if (document.getElementById('emomRound')) {
                    document.getElementById('emomRound').classList.remove('hidden');
                }
                break;
            case 'forTime':
                document.getElementById('timerTitle').textContent = 'For Time';
                // No special settings needed
                break;
            case 'amrap':
                document.getElementById('timerTitle').textContent = 'AMRAP Timer';
                if (document.getElementById('amrapSettings')) {
                    document.getElementById('amrapSettings').classList.remove('hidden');
                }
                break;
            default: // standard
                document.getElementById('timerTitle').textContent = 'Timer';
                this.isEmom = false;
                break;
        }
        
        this.resetTimer();
    }
    
    closeTimer() {
        document.getElementById('timerModal').classList.add('hidden');
        this.resetTimer();
    }
    
    updateTimerDisplay(timeInSeconds, totalTime = null) {
        if (!this.timerDisplay) {
            this.timerDisplay = document.getElementById('timerDisplay');
        }
        
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar if available
        if (this.progressBar && totalTime) {
            const percentComplete = Math.round((1 - (timeInSeconds / totalTime)) * 100);
            this.progressBar.style.width = `${percentComplete}%`;
        }
    }
    
    startCountdown() {
        this.isCountingDown = true;
        this.countdownSeconds = 10;
        
        if (document.getElementById('phaseDisplay')) {
            document.getElementById('phaseDisplay').textContent = "GET READY";
            document.getElementById('phaseDisplay').classList.remove('hidden');
            document.getElementById('phaseDisplay').className = 'text-xl font-bold text-yellow-600';
        }
        
        this.updateTimerDisplay(this.countdownSeconds);
        
        this.timerInterval = setInterval(() => {
            this.countdownSeconds--;
            this.updateTimerDisplay(this.countdownSeconds);
            
            // Special beeps for countdown
            if (this.countdownSeconds <= 3 && this.countdownSeconds > 0) {
                this.createBeepSound(880, 200);
            } else if (this.countdownSeconds === 0) {
                // GO beep
                this.createBeepSound(1200, 400);
                
                clearInterval(this.timerInterval);
                this.isCountingDown = false;
                
                if (document.getElementById('phaseDisplay')) {
                    document.getElementById('phaseDisplay').textContent = "GO!";
                    document.getElementById('phaseDisplay').className = 'text-xl font-bold text-green-600';
                    
                    // Hide "GO!" after 1 second
                    setTimeout(() => {
                        if (this.timerMode === 'tabata') {
                            document.getElementById('phaseDisplay').textContent = "WORK";
                        } else {
                            document.getElementById('phaseDisplay').classList.add('hidden');
                        }
                    }, 1000);
                }
                
                // Start the actual timer
                this.startActualTimer();
            }
        }, 1000);
    }
    
    startTimer() {
        if (this.isRunning) return;
        
        // Check if minutes and seconds are set
        const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
        const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
        
        // For EMOM, set rounds
        if (this.timerMode === 'emom' && document.getElementById('totalRounds')) {
            this.totalRounds = parseInt(document.getElementById('totalRounds').value) || 1;
            this.currentRound = 1;
            if (document.getElementById('emomRound')) {
                document.getElementById('emomRound').textContent = `Round: ${this.currentRound}`;
            }
        }
        
        // Set the time for the timer
        this.timeLeft = minutes * 60 + seconds;
        
        // Return if no time is set
        if (this.timeLeft <= 0 && this.timerMode !== 'forTime') return;
        
        this.isRunning = true;
        document.getElementById('startBtn').classList.add('hidden');
        document.getElementById('pauseBtn').classList.remove('hidden');
        
        // Start with countdown
        this.startCountdown();
    }
    
    startActualTimer() {
        // For standard timer or simple EMOM
        const totalTime = this.timeLeft;
        this.updateTimerDisplay(this.timeLeft, totalTime);
        
        if (this.timerMode === 'forTime') {
            // For Time is a count up timer
            let elapsedTime = 0;
            this.timerInterval = setInterval(() => {
                elapsedTime++;
                const minutes = Math.floor(elapsedTime / 60);
                const seconds = elapsedTime % 60;
                this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
            return;
        }
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay(this.timeLeft, totalTime);
            
            if (this.timeLeft <= 3 && this.timeLeft > 0) {
                this.createBeepSound(880);
            }
            
            if (this.timeLeft === 0) {
                if (this.isEmom && this.currentRound < this.totalRounds) {
                    // For EMOM, restart timer for next round
                    this.createBeepSound(440, 200);
                    this.createBeepSound(880, 200);
                    this.currentRound++;
                    if (document.getElementById('emomRound')) {
                        document.getElementById('emomRound').textContent = `Round: ${this.currentRound}`;
                    }
                    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
                    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
                    this.timeLeft = minutes * 60 + seconds;
                    this.updateTimerDisplay(this.timeLeft, totalTime);
                } else {
                    // Timer completed
                    this.createBeepSound(440, 300);
                    this.createBeepSound(880, 300);
                    this.createBeepSound(440, 300);
                    
                    clearInterval(this.timerInterval);
                    this.isRunning = false;
                    document.getElementById('startBtn').classList.remove('hidden');
                    document.getElementById('pauseBtn').classList.add('hidden');
                }
            }
        }, 1000);
    }
    
    pauseTimer() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        document.getElementById('startBtn').classList.remove('hidden');
        document.getElementById('pauseBtn').classList.add('hidden');
    }
    
    resetTimer() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.isCountingDown = false;
        this.timeLeft = 0;
        this.currentRound = 1;
        this.updateTimerDisplay(0);
        document.getElementById('startBtn').classList.remove('hidden');
        document.getElementById('pauseBtn').classList.add('hidden');
        
        if (this.isEmom && document.getElementById('emomRound')) {
            document.getElementById('emomRound').textContent = 'Round: 1';
        }
        
        if (document.getElementById('phaseDisplay')) {
            document.getElementById('phaseDisplay').classList.add('hidden');
        }
    }
}

// Create global instance
let workoutTimer;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    workoutTimer = new WorkoutTimer();
    
    // Add elements for Tabata if they don't exist
    if (!document.getElementById('tabataSettings')) {
        const tabataSettings = document.createElement('div');
        tabataSettings.id = 'tabataSettings';
        tabataSettings.className = 'hidden space-y-2';
        tabataSettings.innerHTML = `
            <label class="block text-sm font-medium text-gray-700">Rounds:</label>
            <input type="number" id="tabataRounds" placeholder="Number of rounds" class="w-full p-2 border rounded" min="1" value="8">
            
            <div class="flex space-x-2">
                <div class="w-1/2">
                    <label class="block text-sm font-medium text-gray-700">Work (sec):</label>
                    <input type="number" id="workSecondsInput" placeholder="Work seconds" class="w-full p-2 border rounded" min="1" value="20">
                </div>
                <div class="w-1/2">
                    <label class="block text-sm font-medium text-gray-700">Rest (sec):</label>
                    <input type="number" id="restSecondsInput" placeholder="Rest seconds" class="w-full p-2 border rounded" min="1" value="10">
                </div>
            </div>
        `;
        document.querySelector('.space-y-4').insertBefore(tabataSettings, document.getElementById('emomSettings').nextSibling);
    }
    
    // Add AMRAP settings if they don't exist
    if (!document.getElementById('amrapSettings')) {
        const amrapSettings = document.createElement('div');
        amrapSettings.id = 'amrapSettings';
        amrapSettings.className = 'hidden space-y-2';
        amrapSettings.innerHTML = `
            <label class="block text-sm font-medium text-gray-700">Warning at (sec):</label>
            <input type="number" id="amrapWarnTime" placeholder="Warning seconds" class="w-full p-2 border rounded" min="0" value="60">
        `;
        document.querySelector('.space-y-4').insertBefore(amrapSettings, document.getElementById('emomSettings').nextSibling);
    }
});

// Global functions that connect HTML to timer class
function showTimer(type) {
    if (!workoutTimer) {
        workoutTimer = new WorkoutTimer();
    }
    workoutTimer.showTimer(type);
}

function closeTimer() {
    if (workoutTimer) {
        workoutTimer.closeTimer();
    }
}

function startTimer() {
    if (workoutTimer) {
        workoutTimer.startTimer();
    }
}

function pauseTimer() {
    if (workoutTimer) {
        workoutTimer.pauseTimer();
    }
}

function resetTimer() {
    if (workoutTimer) {
        workoutTimer.resetTimer();
    }
}

function quickSet(minutes, seconds) {
    document.getElementById('minutesInput').value = minutes;
    document.getElementById('secondsInput').value = seconds;
}
