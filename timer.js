// Simple Timer Functionality
let timerInterval = null;
let timeLeft = 0;
let isRunning = false;
let isEmom = false;
let totalRounds = 0;
let currentRound = 1;
let isCountingDown = false;

// Show timer modal
function showTimer(type) {
    document.getElementById('timerModal').classList.remove('hidden');
    document.getElementById('timerTitle').textContent = type === 'emom' ? 'EMOM Timer' : 'Timer';
    
    // Handle EMOM settings
    isEmom = type === 'emom';
    document.getElementById('emomSettings').classList.toggle('hidden', !isEmom);
    document.getElementById('emomRound').classList.toggle('hidden', !isEmom);
    
    // Show controls if they were hidden
    document.getElementById('timerControls').classList.remove('hidden');
    
    resetTimer();
}

// Close timer modal
function closeTimer() {
    document.getElementById('timerModal').classList.add('hidden');
    resetTimer();
}

// Start 10 second countdown
function startTimer() {
    if (isRunning) return;
    
    // Get timer settings
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
    timeLeft = minutes * 60 + seconds;
    
    if (timeLeft <= 0) return;
    
    if (isEmom) {
        totalRounds = parseInt(document.getElementById('totalRounds').value) || 1;
        currentRound = 1;
        document.getElementById('emomRound').textContent = `Round: ${currentRound} of ${totalRounds}`;
        document.getElementById('emomRound').classList.remove('hidden');
    }
    
    // Hide the controls to make timer more compact
    document.getElementById('timerControls').classList.add('hidden');
    
    // Show and start the countdown
    isRunning = true;
    isCountingDown = true;
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('pauseBtn').classList.remove('hidden');
    
    // Start 10 second countdown
    let countdown = 10;
    document.getElementById('timerDisplay').textContent = countdown;
    document.getElementById('phaseDisplay').textContent = "GET READY";
    document.getElementById('phaseDisplay').classList.remove('hidden');
    
    timerInterval = setInterval(function() {
        countdown--;
        document.getElementById('timerDisplay').textContent = countdown;
        
        if (countdown <= 3 && countdown > 0) {
            beep(880, 200); // 3, 2, 1 beeps
        }
        
        if (countdown === 0) {
            beep(1200, 500); // GO beep
            document.getElementById('phaseDisplay').textContent = "GO!";
            
            // End countdown and start main timer
            clearInterval(timerInterval);
            isCountingDown = false;
            
            // Hide "GO" after 1 second
            setTimeout(function() {
                document.getElementById('phaseDisplay').classList.add('hidden');
                startMainTimer();
            }, 1000);
        }
    }, 1000);
}

// Start the main timer after countdown
function startMainTimer() {
    // Update display
    document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
    
    // Start the interval
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
        
        if (timeLeft <= 3 && timeLeft > 0) {
            beep(880, 200);
        }
        
        if (timeLeft === 0) {
            if (isEmom && currentRound < totalRounds) {
                // Next EMOM round
                beep(440, 300);
                beep(880, 300);
                
                currentRound++;
                document.getElementById('emomRound').textContent = `Round: ${currentRound} of ${totalRounds}`;
                
                const min = parseInt(document.getElementById('minutesInput').value) || 0;
                const sec = parseInt(document.getElementById('secondsInput').value) || 0;
                timeLeft = min * 60 + sec;
                
                document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
            } else {
                // Timer complete
                beep(440, 300);
                beep(880, 300);
                beep(440, 300);
                
                clearInterval(timerInterval);
                isRunning = false;
                document.getElementById('startBtn').classList.remove('hidden');
                document.getElementById('pauseBtn').classList.add('hidden');
                
                // Show controls again when timer completes
                document.getElementById('timerControls').classList.remove('hidden');
            }
        }
    }, 1000);
}

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById('startBtn').classList.remove('hidden');
    document.getElementById('pauseBtn').classList.add('hidden');
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isCountingDown = false;
    timeLeft = 0;
    currentRound = 1;
    
    // Show controls again
    document.getElementById('timerControls').classList.remove('hidden');
    
    document.getElementById('timerDisplay').textContent = "00:00";
    document.getElementById('startBtn').classList.remove('hidden');
    document.getElementById('pauseBtn').classList.add('hidden');
    document.getElementById('phaseDisplay').classList.add('hidden');
    
    if (document.getElementById('emomRound')) {
        document.getElementById('emomRound').textContent = "Round: 1";
        document.getElementById('emomRound').classList.add('hidden');
    }
}

// Create beep sound
function beep(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.5;
        
        oscillator.start();
        setTimeout(function() {
            oscillator.stop();
        }, duration);
        
        // Try to vibrate if supported
        if ('vibrate' in navigator) {
            navigator.vibrate(duration);
        }
    } catch (e) {
        console.error("Audio not supported", e);
    }
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Set quick time values
function quickSet(minutes, seconds) {
    document.getElementById('minutesInput').value = minutes;
    document.getElementById('secondsInput').value = seconds;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Make sure we have a phase display element
    if (!document.getElementById('phaseDisplay')) {
        const timerContainer = document.querySelector('.text-center.mb-6');
        const phaseDisplay = document.createElement('div');
        phaseDisplay.id = 'phaseDisplay';
        phaseDisplay.className = 'text-xl font-bold text-yellow-600 mb-2 hidden';
        timerContainer.insertBefore(phaseDisplay, document.getElementById('emomRound').nextSibling);
    }
});

// Add this at the end of your timer.js file
function toggleFloatingControls() {
  const controls = document.getElementById('floating-controls');
  controls.classList.toggle('hidden');
}
