// Variables for Stopwatch 1
let timer1;
let elapsedTime1 = 0;
let isRunning1 = false;

// Variables for Stopwatch 2
let timer2;
let elapsedTime2 = 0;
let isRunning2 = false;

// DOM Elements
const timeDisplay1 = document.getElementById('time');
const timeDisplay2 = document.getElementById('time2');
const continuePauseButton = document.getElementById('continue-pause');
const saveButton = document.getElementById('save');
const resetButton = document.getElementById('reset');
const shutdownButton = document.getElementById('shutdown');

// Storage for saved times and tasks
let taskRecords = [];

// Update the time display for Stopwatch 1
function updateTime1() {
    elapsedTime1++;
    const hours = String(Math.floor(elapsedTime1 / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime1 % 3600) / 60)).padStart(2, '0');
    const seconds = String(elapsedTime1 % 60).padStart(2, '0');
    timeDisplay1.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the time display for Stopwatch 2
function updateTime2() {
    elapsedTime2++;
    const hours = String(Math.floor(elapsedTime2 / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime2 % 3600) / 60)).padStart(2, '0');
    const seconds = String(elapsedTime2 % 60).padStart(2, '0');
    timeDisplay2.textContent = `${hours}:${minutes}:${seconds}`;
}

// Toggle start/stop for Stopwatch 1
function continuePause() {
    if (isRunning1) {
        clearInterval(timer1);
        continuePauseButton.textContent = 'Continue';
        startStopwatch2(); 
    } else {
        timer1 = setInterval(updateTime1, 1000);
        continuePauseButton.textContent = 'Pause';
        pauseStopwatch2();
    }
    isRunning1 = !isRunning1;
}

// Start Stopwatch 2
function startStopwatch2() {
    if (!isRunning2) {
        timer2 = setInterval(updateTime2, 1000);
        isRunning2 = true;
    }
}

// Pause Stopwatch 2
function pauseStopwatch2() {
    if (isRunning2) {
        clearInterval(timer2);
        isRunning2 = false;
    }
}

// Save the time of Stopwatch 1 and prompt for a task name
function save() {
    const savedTime = timeDisplay1.textContent;
    const savedTime2 = timeDisplay1.textContent;
    
    // Prompt user for task name
    const taskName = prompt('Enter task name:');
    
    if (taskName) {

        // Add a date
        const currentDate = new Date().toLocaleDateString();

        // Create a taskRecord object
        const taskRecord = {
            task: taskName,
            time: savedTime,
            idle: savedTime2,
            date: currentDate
        };

        // Send taskRecord to Flask backend using a POST request
        fetch('http://127.0.0.1:5000/save_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskRecord),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Task saved successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to save the task.');
        });
    } else {
        alert('Task name cannot be empty.');
    }
}



// Reset the stopwatches
function resetStopwatches() {
    clearInterval(timer1);
    clearInterval(timer2);


    elapsedTime1 = 0;
    elapsedTime2 = 0;


    timeDisplay1.textContent = '00:00:00';
    timeDisplay2.textContent = '00:00:00';


    isRunning1 = false;
    isRunning2 = false;

 
    continuePauseButton.textContent = 'Continue';
}


// Add event listeners
continuePauseButton.addEventListener('click', continuePause);
saveButton.addEventListener('click', save);
resetButton.addEventListener('click', resetStopwatches);



 

function shutdownApp() {

    fetch('/shutdown', { method: 'POST' })
    
                window.close();
           
       
}

shutdownButton.addEventListener('click', shutdownApp);



