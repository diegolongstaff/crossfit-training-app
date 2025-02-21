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
        this.timerMode = 'standard'; // standard, emom, tabata, forTime, amrap, interval
        
        // DOM elements
        this.timerDisplay = document.getElementById('timerDisplay');
        this.roundDisplay = document.getElementById('emomRound');
        this.phaseDisplay = document.getElementById('phaseDisplay');
        this.progressBar = document.getElementById('timerProgressBar');
        
        // Initialize timer presets
        this.initializePresets();
    }
    
    // Initialize saved presets
    initializePresets() {
        const savedPresets = localStorage.getItem('timerPresets');
        if (savedPresets) {
            const presetContainer = document.getElementById('presetContainer');
            if (presetContainer) {
                const presets = JSON.parse(savedPresets);
                presetContainer.innerHTML = '';
                
                presets.forEach((preset, index) => {
                    const presetBtn = document.createElement('button');
                    presetBtn.className = 'preset-btn px-3 py-1 m-1 bg-gray-200 text-gray-800 rounded text-sm';
                    presetBtn.textContent = preset.name;
                    presetBtn.onclick = () => this.loadPreset(preset);
                    presetContainer.appendChild(presetBtn);
                });
            }
        }
    }
    
    // Load a preset
    loadPreset(preset) {
        document.getElementById('minutesInput').value = Math.floor(preset.time / 60);
        document.getElementById('secondsInput').value = preset.time % 60;
        
        if (preset.type === 'emom') {
            this.showTimer('emom');
            document.getElementById('totalRounds').value = preset.rounds;
        } else if (preset.type === 'tabata') {
            this.showTimer('tabata');
            document.getElementById('tabataRounds').value = preset.rounds;
            document.getElementById('workSecondsInput').value = preset.workTime;
            document.getElementById('restSecondsInput').value = preset.restTime;
        } else if (preset.type === 'interval') {
            this.showTimer('interval');
            document.getElementById('intervalRounds').value = preset.rounds;
            document.getElementById('workMinutesInput').value = Math.floor(preset.workTime / 60);
            document.getElementById('workSecondsInput').value = preset.workTime % 60;
            document.getElementById('restMinutesInput').value = Math.floor(preset.restTime / 60);
            document.getElementById('restSecondsInput').value = preset.restTime % 60;
        } else {
            this.showTimer('standard');
        }
    }
    
    // Save current settings as preset
    savePreset() {
        const presetName = prompt('Enter a name for this timer preset:');
        if (!presetName) return;
        
        let preset = {
            name: presetName,
            type: this.timerMode,
            time: parseInt(document.getElementById('minutesInput').value) * 60 + 
                  parseInt(document.getElementById('secondsInput').value)
        };
        
        if (this.timerMode === 'emom') {
            preset.rounds = parseInt(document.getElementById('totalRounds').value);
        } else if (this.timerMode === 'tabata') {
            preset.rounds = parseInt(document.getElementById('tabataRounds').value);
            preset.workTime = parseInt(document.getElementById('workSecondsInput').value);
            preset.restTime = parseInt(document.getElementById('restSecondsInput').value);
        } else if (this.timerMode === 'interval') {
            preset.rounds = parseInt(document.getElementById('intervalRounds').value);
            preset.workTime = parseInt(document.getElementById('workMinutesInput').value) * 60 + 
                             parseInt(document.getElementById('workSecondsInput').value);
            preset.restTime = parseInt(document.getElementById('restMinutesInput').value) * 60 + 
                             parseInt(document.getElementById('restSecondsInput').value);
        }
        
        // Save to localStorage
        let presets = [];
        const savedPresets = localStorage.getItem('timerPresets');
        if (savedPresets) {
            presets = JSON.parse(savedPresets);
        }
        presets.push(preset);
        localStorage.setItem('timerPresets', JSON.stringify(presets));
        
        // Refresh presets display
        this.initializePresets();
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
        document.getElementById('emomSettings').classList.add('hidden');
        document.getElementById('tabataSettings').classList.add('hidden');
        document.getElementById('intervalSettings').classList.add('hidden');
        document.getElementById('amrapSettings').classList.add('hidden');
        
        document.getElementById('emomRound').classList.add('hidden');
        document.getElementById('phaseDisplay').classList.add('hidden');
        
        // Show settings based on type
        this.timerMode = type;
        
        switch(type) {
            case 'emom':
                document.getElementById('timerTitle').textContent = 'EMOM Timer';
                document.getElementById('emomSettings').classList.remove('hidden');
                document.getElementById('emomRound').classList.remove('hidden');
                this.isEmom = true;
                break;
            case 'tabata':
                document.getElementById('timerTitle').textContent = 'Tabata Timer';
                document.getElementById('tabataSettings').classList.remove('hidden');
                document.getElementById('phaseDisplay').classList.remove('hidden');
                document.getElementById('emomRound').classList.remove('hidden');
                break;
            case 'forTime':
                document.getElementById('timerTitle').textContent = 'For Time';
                // No special settings needed
                break;
            case 'amrap':
                document.getElementById('timerTitle').textContent = 'AMRAP Timer';
                document.getElementById('amrapSettings').classList.remove('hidden');
                break;
            case 'interval':
                document.getElementById('timerTitle').textContent = 'Interval Timer';
                document.getElementById('intervalSettings').classList.remove('hidden');
                document.getElementById('emomRound').classList.remove('hidden');
                document.getElementById('phaseDisplay').classList.remove('hidden');
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
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar if available
        if (this.progressBar && totalTime) {
            const percentComplete = Math.round((1 - (timeInSeconds / totalTime)) * 100);
            this.progressBar.style.width = `${percentComplete}%`;
        }
    }
    
    startTimer() {
        if (this.isRunning) return;
        
        if (!this.timeLeft) {
            // Request wake lock to keep screen on
            if ('wakeLock' in navigator) {
                try {
                    navigator.wakeLock.request('screen').then(lock => {
                        this.wakeLock = lock;
                    });
                } catch (err) {
                    console.log('Wake Lock error:', err);
                }
            }
            
            switch(this.timerMode) {
                case 'emom':
                    this.startEmomTimer();
                    break;
                case 'tabata':
                    this.startTabataTimer();
                    break;
                case 'forTime':
                    this.startForTimeTimer();
                    break;
                case 'amrap':
                    this.startAmrapTimer();
                    break;
                case 'interval':
                    this.startIntervalTimer();
                    break;
                default:
                    this.startStandardTimer();
                    break;
            }
        } else {
            // Resume existing timer
            this.isRunning = true;
            document.getElementById('startBtn').classList.add('hidden');
            document.getElementById('pauseBtn').classList.remove('hidden');
            
            this.timerInterval = setInterval(() => {
                this.timeLeft--;
                this.updateTimerDisplay(this.timeLeft);
                
                if (this.timeLeft <= 3 && this.timeLeft > 0) {
                    this.createBeepSound(880);
                }
                
                if (this.timeLeft === 0) {
                    this.handleTimerCompletion();
                }
            }, 1000);
        }
    }
    
    startStandardTimer() {
        const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
        const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
        const totalTime = minutes * 60 + seconds;
        
        if (totalTime <= 0) return;
        
        this.timeLeft = totalTime;
        this.isRunning = true;
        document.getElementById('startBtn').classList.add('hidden');
        document.getElementById('pauseBtn').classList.remove('hidden');
        
        this.updateTimerDisplay(this.timeLeft, totalTime);
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay(this.timeLeft, totalTime);
            
            if (this.timeLeft <= 3 && this.timeLeft > 0) {
                this.createBeepSound(880);
            }
            
            if (this.timeLeft === 0) {
                // Timer completed
                this.createBeepSound(440, 300);
                this.createBeepSound(880, 300);
                this.createBeepSound(440, 300);
                
                clearInterval(this.timerInterval);
                this.isRunning = false;
                document.getElementById('startBtn').classList.remove('hidden');
                document.getElementById('pauseBtn').classList.add('hidden');
                
                this.releaseWakeLock();
            }
        }, 1000);
    }
    
    startEmomTimer() {
        const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
        const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
        const intervalTime = minutes * 60 + seconds;
        this.totalRounds = parseInt(document.getElementById('totalRounds').value) || 1;
        
        if (intervalTime <= 0) return;
        
        this.currentRound = 1;
        this.timeLeft = intervalTime;
        this.isRunning = true;
        
        document.getElementById('emomRound').textContent = `Round: ${this.currentRound}/${this.totalRounds}`;
        document.getElementById('startBtn').classList.add('hidden');
        document.getElementById('pauseBtn').classList.remove('hidden');
        
        this.updateTimerDisplay(this.timeLeft, intervalTime);
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay(this.timeLeft, intervalTime);
            
            if (this.timeLeft <= 3 && this.timeLeft > 0) {
                this.createBeepSound(880);
            }
            
            if (this.timeLeft === 0) {
                if (this.currentRound < this.totalRounds) {
                    // Next round
                    this.createBeepSound(440, 200);
                    this.createBeepSound(880, 200);
                    
                    this.currentRound++;
                    document.getElementById('emomRound').textContent = `Round: ${this.currentRound}/${this.totalRounds}`;
                    this.timeLeft = intervalTime;
                    this.updateTimerDisplay(this.timeLeft, intervalTime);
                } else {
                    // Workout complete
                    this.createBeepSound(440, 300);
                    this.createBeepSound(880, 300);
                    this.createBeepSound(440, 300);
                    
                    clearInterval(this.timerInterval);
                    this.isRunning = false;
                    document.getElementById('startBtn').classList.remove('hidden');
                    document.getElementById('pauseBtn').classList.add('hidden');
                    
                    this.releaseWakeLock();
                }
            }
        }, 1000);
    }
    
    startTabataTimer() {
        const rounds = parseInt(document.getElementById('tabataRounds').value) || 8;
        this.workSeconds = parseInt(document.getElementById('workSecondsInput').value) || 20;
        this.restSeconds = parseInt(document.getElementById('restSecondsInput').value) || 10;
        
        this.currentRound = 1;
        this.isWorkPhase = true;
        this.timeLeft = this.workSeconds;
        this.isRunning = true;
        
        document.getElementById('emomRound').textContent = `Round: ${this.currentRound}/${rounds}`;
        document.getElementById('phaseDisplay').textContent = 'WORK';
        document.getElementById('phaseDisplay').className = 'text-xl font-bold text-green-600';
        document.getElementById('startBtn').classList.add('hidden');
        document.getElementById('pauseBtn').classList.remove('hidden');
        
        this.updateTimerDisplay(this.timeLeft, this.workSeconds);
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            
            if (this.isWorkPhase) {
                this.updateTimerDisplay(this.timeLeft, this.workSeconds);
            } else {
                this.updateTimerDisplay(this.timeLeft, this.restSeconds);
            }
            
            if (this.timeLeft <= 3 && this.timeLeft > 0) {
                this.createBeepSound(880);
            }
            
            if (this.timeLeft === 0) {
                if (this.isWorkPhase) {
                    // Switch to rest
                    this.createBeepSound(440, 200);
                    this.isWorkPhase = false;
                    this.timeLeft = this.restSeconds;
                    document.getElementById('phaseDisplay').textContent = 'REST';
                    document.getElementById('phaseDisplay').className = 'text-xl font-bold text-red-600';
                    this.updateTimerDisplay(this.timeLeft, this.restSeconds);
                } else {
                    // End of round
                    if (this.currentRound < rounds) {
                        this.createBeepSound(880, 200);
                        this.currentRound++;
                        this.isWorkPhase = true;
                        this.timeLeft = this.workSeconds;
                        document.getElementById('emomRound').textContent = `Round: ${this.currentRound}/${rounds}`;
                        document.getElementById('phaseDisplay').textContent = 'WORK';
                        document.getElementById('phaseDisplay').className = 'text-xl font-bold text-green-600';
                        this.updateTimerDisplay(this.timeLeft, this.workSeconds);
                    } else {
                        // Workout complete
                        this.createBeepSound(440, 300);
                        this.createBeepSound(880, 300);
                        this.createBeepSound(440, 300);
                        
                        clearInterval(this.timerInterval);
                        this.isRunning = false;
                        document.getElementById('startBtn').classList.remove('hidden');
                        document.getElementById('pauseBtn').classList.add('hidden');
                        
                        this.releaseWakeLock();
                    }
                }
            }
        }, 1000);
    }
    
    startIntervalTimer() {
        const rounds = parseInt(document.getElementById('intervalRounds').value) || 5;
        const workMinutes = parseInt(document.getElementById('workMinutesInput').value) || 0;
        const workSeconds = parseInt(document.getElementById('workSecondsInput').value) || 0;
        const restMinutes = parseInt(document.getElementById('restMinutesInput').value) || 0;
        const restSeconds = parseInt(document.getElementById('restSecondsInput').value) || 0;
        
        this.workSeconds = workMinutes * 60 + workSeconds;
        this.restSeconds = restMinutes * 60 + restSeconds;
        
        this.currentRound = 1;
        this.isWorkPhase = true;
        this.timeLeft = this.workSeconds;
        this.isRunning = true;
        
        document.getElementById('emomRound').textContent = `Round: ${this.currentRound}/${rounds}`;
        document.getElementById('phaseDisplay').textContent = 'WORK';
        document.getElementById('phaseDisplay').className = 'text-xl font-bold text-green-600';
        document.getElementById('startBtn').classList.add('hidden');
        document.getElementById('pauseBtn').classList.remove('hidden');
        
        this.updateTimerDisplay(this.timeLeft, this.workSeconds);
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            
            if (this.isWorkPhase) {
                this.updateTimerDisplay(this.timeLeft, this.workSeconds);
            } else {
                this.updateTimerDisplay(this.timeLeft, this.restSeconds);
            }
            
            if (this.timeLeft <= 3 && this.timeLeft > 0) {
                this.createBeepSound(880);
            }
            
            if (this.timeLeft === 0) {
                if (this.isWorkPhase) {
                    // Switch to rest
                    this.createBeepSound(440, 200);
                    this.isWorkPhase = false;
                    this.timeLeft = this.restSeconds;
                    document.getElementById('phaseDisplay').textContent = 'REST';
                    document.getElementById('phaseDisplay').className = 'text-xl font-bold text-red-600';
                    this.updateTimerDisplay(this.timeLeft, this.restSeconds);
                } else {
                    // End of round
                    if (this.currentRound < rounds) {
                        this.createBeepSound(880, 200);
                        this.currentRound++;
                        this.isWorkPhase = true;
                        this.timeLeft = this.workSeconds;
                        document.getElementById('emomRound').textContent = `Round: ${this.currentRound}/${rounds}`;
                        document.getElementById('phaseDisplay').textContent = 'WORK';
                        document.getElementById('phaseDisplay').className = 'text-xl font-bold text-green-600';
                        this.updateTimerDisplay(this.timeLeft, this.workSeconds);
                    } else {
                        // Workout complete
                        this.createBeepSound(440, 300);
                        this.createBeepSound(880, 300);
                        this.createBeepSound(440, 300);
                        
                        clearInterval(this.timerInterval);
                        this.isRunning = false;
                        document.getElementById('startBtn').classList.remove('hidden');
                        document.getElementById('pauseBtn').classList.add('hidden');
                        
                        this.releaseWakeLock();
                    }
                }
            }
        }, 1000);
    }
    
    startForTimeTimer() {
        // Just a running clock
        const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
        const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
        const capTime = minutes * 60 + seconds;
        
        this.timeLeft = 0; // Counts up
        this.totalTime = capTime; // Time cap
        this.isRunning = true;
        
        document.getElementById('startBtn').classList.add('hidden');
        document.getElementById('pauseBtn').classList.remove('hidden');
        
        this.timerDisplay.textContent = '00:00';
        
        let elapsedTime = 0;
        
        this.timerInterval = setInterval(() => {
            elapsedTime++;
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // If there's a time cap
            if (capTime > 0 && elapsedTime >= capTime) {
                this.createBeepSound(440, 300);
                this.createBeepSound(880, 300);
                this.createBeepSound(440, 300);
                
                clearInterval(this.timerInterval);
                this.isRunning = false;
                document.getElementById('startBtn').classList.remove('hidden');
                document.getElementById('pauseBtn').classList.add('hidden');
                
                this.releaseWakeLock();
            }
        }, 1000);
    }
    
    startAmrapTimer() {
        const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
        const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
        const amrapTime = minutes * 60 + seconds;
        const warnTime = parseInt(document.getElementById('amrapWarnTime').value) || 0;
        
        if (amrapTime <= 0) return;
        
        this.timeLeft = amrapTime;
        this.isRunning = true;
        
        document.getElementById('startBtn').classList.add('hidden');
        document.getElementById('pauseBtn').classList.remove('hidden');
        
        this.updateTimerDisplay(this.timeLeft, amrapTime);
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay(this.timeLeft, amrapTime);
            
            // Warning beep at specified time
            if (warnTime > 0 && this.timeLeft === warnTime) {
                this.createBeepSound(660, 500);
            }
            
            if (this.timeLeft <= 3 && this.timeLeft > 0) {
                this.createBeepSound(880);
            }
            
            if (this.timeLeft === 0) {
                // AMRAP completed
                this.createBeepSound(440, 300);
                this.createBeepSound(880, 300);
                this.createBeepSound(440, 300);
                
                clearInterval(this.timerInterval);
                this.isRunning = false;
                document.getElementById('startBtn').classList.remove('hidden');
                document.getElementById('pauseBtn').classList.add('hidden');
                
                this.releaseWakeLock();
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
        this.timeLeft = 0;
        this.currentRound = 1;
        this.updateTimerDisplay(0);
        document.getElementById('startBtn').classList.remove('hidden');
        document.getElementById('pauseBtn').classList.add('hidden');
        
        if (this.timerMode === 'emom') {
            document.getElementById('emomRound').textContent = 'Round: 1';
        }
        
        this.releaseWakeLock();
    }
    
    releaseWakeLock() {
        if (this.wakeLock) {
            this.wakeLock.release().then(() => {
                this.wakeLock = null;
            });
        }
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.workoutTimer = new WorkoutTimer();
});

// Global functions that connect HTML to timer class
function showTimer(type) {
    window.workoutTimer.showTimer(type);
}

function closeTimer() {
    window.workoutTimer.closeTimer();
}

function startTimer() {
    window.workoutTimer.startTimer();
}

function pauseTimer() {
    window.workoutTimer.pauseTimer();
}

function resetTimer() {
    window.workoutTimer.resetTimer();
}

function savePreset() {
    window.workoutTimer.savePreset();
}
