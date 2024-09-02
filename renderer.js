let alarmVolume = 1;
let altAccountEnabled = false;



document.addEventListener('DOMContentLoaded', () => {

  // Retrieve the toggle state from localStorage
  altAccountEnabled = localStorage.getItem('altAccountEnabled') === 'true';
  document.getElementById('altAccountToggle').checked = altAccountEnabled;

  console.log('Preload script completed, now rendering tasks.');
  const savedVolume = localStorage.getItem('alarmVolume');
  if (savedVolume !== null) {
    alarmVolume = parseFloat(savedVolume);
    document.getElementById('volumeSlider').value = alarmVolume;
  }

  document.getElementById('volumeSlider').addEventListener('input', function() {
  alarmVolume = this.value;
  localStorage.setItem('alarmVolume', alarmVolume); // Save the volume to localStorage
  playChime('chime.mp3'); // Play the chime sound to demonstrate the new volume
});

  // Function to handle link clicks
  function handleLinkClick(url) {
    console.log('Attempting to open link with window.electron:', window.electron);

    if (window.electron && typeof window.electron.openExternal === 'function') {
      console.log('Opening external link:', url);

      try {
        window.electron.openExternal(url).then(() => {
          console.log('Link opened successfully');
        }).catch((error) => {
          console.error('Error opening link:', error);
        });
      } catch (err) {
        console.error('Caught exception while trying to open the link:', err);
      }

    } else {
      console.error('window.electron.openExternal is not defined or is not a function.');
      console.log('window.electron properties:', Object.keys(window.electron));
    }

  }

  // Task definition
  const tasks = [
      { id: 1, name: "Bao Ball", completed: false, resetType: 'daily', sound: '', url: 'https://www.lioden.com/baoball.php', alt: false },
      { id: 2, name: "Serengeti Shuffle", completed: false, resetType: 'daily', url: 'https://www.lioden.com/serengetishuffle.php', alt: false },
	    { id: 16, name: "Reptile Roundup", completed: false, resetType: 'daily', url: 'https://www.lioden.com/reptileroundup.php', alt: false },
	    { id: 17, name: "Fire Escape", completed: false, resetType: 'daily', activeMonths: [7], url: 'https://www.lioden.com/fireescape.php', alt: false },
	    { id: 18, name: "Whack a Snake", completed: false, resetType: 'daily', url: 'https://www.lioden.com/snake.php', alt: false },
      { id: 10, name: "Lioden Trivia", completed: false, resetType: 'daily', sound: '', url: 'https://www.lioden.com/trivia.php', alt: false },
	    { id: 19, name: "Cub Training", completed: false, resetType: 'daily', url: 'https://www.lioden.com/cubtraining.php', alt: false },
	    { id: 20, name: "Asign Cubs to Broodmothers", completed: false, resetType: 'daily', alt: false },
      { id: 3, name: "Feed Lions", completed: false, resetType: 'daily', alt: false},
      { id: 4, name: "Nest Lions", completed: false, resetType: 'daily', alt: false},
	    { id: 21, name: "Feed Beetles", completed: false, resetType: 'daily', alt: false },
	    { id: 22, name: "Train Beetles", completed: false, resetType: 'daily', alt: false },
      { id: 15, name: "Tree Cub", completed: false, resetType: 'daily', url: 'https://www.lioden.com/givingtree.php', alt: false},
      { id: 5, name: "Beetle Battles", completed: false, resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'assets/bbattle.mp3', url: 'https://www.lioden.com/battlebeetles.php', alt: false },
      { id: 6, name: "Hunting", completed: false, resetType: 'interval', resetInterval: 30 * 60 * 1000, sound: 'assets/hunting.mp3', url: 'https://www.lioden.com/hunting.php', alt: false },
      { id: 7, name: "Patrolling", completed: false, resetType: 'interval', resetInterval: 60 * 60 * 1000, sound: 'assets/patrol.mp3', url: 'https://www.lioden.com/patrol.php', alt: false },
      { id: 8, name: "Gorillas", completed: false, resetType: 'interval', resetInterval: 24 * 60 * 60 * 1000, sound: 'assets/gorillaq.mp3', url: 'https://www.lioden.com/gorilla-enclave.php', alt: false },
      { id: 9, name: "Spend Event Currency", completed: false, activeDates: 'lastDayOfMonth', sound: '', alt: false },
      { id: 11, name: "Shaman Quests", completed: false, activeMonths: [10], sound: '', url: 'https://www.lioden.com/shamanquests.php', alt: false }, // November
      { id: 12, name: "Check Event Stud", completed: false, resetType: 'daily', activeMonths: [7], url: 'https://www.lioden.com/auguststud.php', alt: false }, // August
      { id: 13, name: "Den Locusts", completed: false, activeMonths: [8],resetType: 'interval', resetInterval: 30 * 60 * 1000, sound: 'locusts.mp3', alt: false,  url: 'https://www.lioden.com/online.php?random=yes' }, // September
      { id: 23, name: "Harbinger", completed: false, activeMonths: [8],resetType: 'daily', alt: false},
      { id: 14, name: "Empty Energy", completed: false, resetType: 'interval', resetInterval: 150 * 60 * 1000, sound: 'assets/energy.mp3', alt: false },
      { id: 24, name: "Trick or Treat", completed: false, resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'assets/trickortreat.mp3', alt: false, url: 'https://www.lioden.com/online.php?random=yes', activeDateRange: {
            start: new Date(new Date().getFullYear(), 9, 26), // October 26
            end: new Date(new Date().getFullYear(), 9, 31) // October 31
          }},
      { id: 25, name: "Heaven/Hell Quests", completed: false, activeMonths: [9],resetType: 'daily', alt: false},
      { id: 26, name: "Shaman Pit - Inhale", completed: false, activeMonths: [10],resetType: 'interval', resetInterval: 180 * 60 * 1000, sound: 'assets/inhale.mp3', alt: false,  url: 'https://www.lioden.com/event.php' },
      { id: 27, name: "Shaman Pit - Drink", completed: false, activeMonths: [10],resetType: 'Daily', alt: false,  url: 'https://www.lioden.com/event.php' },
      { id: 28, name: "Shaman Pit - Whisper", completed: false, activeMonths: [10],resetType: 'Daily', alt: false,  url: 'https://www.lioden.com/event.php' },
      { id: 29, name: "Month Exclusive Crafting", completed: false, activeMonths: [1,2,4,6, 9, 10],resetType: 'Daily', activeDates: 'lastDayOfMonth', alt: false,  url: 'https://www.lioden.com/crafting.php' },
      { id: 30, name: "Guelta", completed: false, activeMonths: [11],resetType: 'interval', resetInterval: 60 * 60 * 1000, sound: 'assets/guelta.mp3', alt: false,  url: 'https://www.lioden.com/event.php' },
      { id: 31, name: "Wallowing Pit", completed: false, activeMonths: [11],resetType: 'interval', resetInterval: 60 * 60 * 1000, sound: 'assets/wallowing.mp3', alt: false,  url: 'https://www.lioden.com/event.php' },
      { id: 32, name: "Advent Calendar", completed: false, resetType: 'daily', alt: false, url: 'https://www.lioden.com/online.php?random=yes', activeDateRange: {
            start: new Date(new Date().getFullYear(), 11, 22), // October 26
            end: new Date(new Date().getFullYear(), 11, 30) // October 31
          }},
          { id: 33, name: "Food Pit", completed: false, activeMonths: [0],resetType: 'Daily', alt: false,  url: 'https://www.lioden.com/event.php' },
          { id: 34, name: "Story Quests", completed: false, resetType: 'Daily', alt: false, url: 'https://www.lioden.com/event.php', activeDateRange: {
                start: new Date(new Date().getFullYear(), 0, 5), // October 26
                end: new Date(new Date().getFullYear(), 0, 31) // October 31
              }},
          { id: 35, name: "Flirt!", completed: false, activeMonths: [1],resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'assets/flirt.mp3', alt: false,  url: 'https://www.lioden.com/event.php' },
          { id: 36, name: "Slap!", completed: false, activeMonths: [1],resetType: 'interval', resetInterval: 14 * 60 * 1000, sound: 'assets/slap.mp3', alt: false,  url: 'https://www.lioden.com/event.php' },
          { id: 37, name: "Poacher Chase", completed: false, resetType: 'daily', activeMonths: [2], url: 'https://www.lioden.com/games.php', alt: false },
          { id: 38, name: "Ostrich Chicks", completed: false, resetType: 'daily', activeMonths: [3], url: 'https://www.lioden.com/event.php', alt: false },
          { id: 39, name: "Bunny Tunnels", completed: false, activeMonths: [3],resetType: 'interval', resetInterval: 60 * 60 * 1000, sound: 'assets/tunnels.mp3', alt: false,  url: 'https://www.lioden.com/event.php' },
          { id: 40, name: "Wenet", completed: false, resetType: 'daily', activeMonths: [3], url: 'https://www.lioden.com/event.php', alt: false },
          { id: 41, name: "Challenge!", completed: false, activeMonths: [4],resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'assets/challenge.mp3', alt: false,  url: 'https://www.lioden.com/event.php' },
          { id: 42, name: "Defend!", completed: false, activeMonths: [4],resetType: 'interval', resetInterval: 14 * 60 * 1000, sound: 'assets/defend.mp3', alt: false,  url: 'https://www.lioden.com/event.php' },
          { id: 43, name: "Groupies", completed: false, activeMonths: [4],resetType: 'interval', resetInterval: 6 * 60 * 60 * 1000, sound: 'assets/groupie.mp3', alt: false,  url: 'https://www.lioden.com/event.php'},
          { id: 44, name: "Story Quests", completed: false, resetType: 'daily', activeMonths: [5], url: 'https://www.lioden.com/event.php', alt: false },
          { id: 45, name: "AM Raffle Lioness", completed: false, resetType: 'daily', activeMonths: [6], url: 'https://www.lioden.com/event.php', alt: false },
          { id: 46, name: "PM Raffle Lioness", completed: false, resetType: 'daily', activeMonths: [6], url: 'https://www.lioden.com/event.php', alt: false },

          // Start Alt account

          { id: 2001, name: "Alt Account Bao Ball", completed: false, resetType: 'daily', sound: '', url: 'https://www.lioden.com/baoball.php', alt: true },
          { id: 2002, name: "Alt Account Serengeti Shuffle", completed: false, resetType: 'daily', url: 'https://www.lioden.com/serengetishuffle.php', alt:true },
          { id: 20016, name: "Alt Account Reptile Roundup", completed: false, resetType: 'daily', url: 'https://www.lioden.com/reptileroundup.php', alt:true },
          { id: 20017, name: "Alt Account Fire Escape", completed: false, resetType: 'daily', activeMonths: [7], url: 'https://www.lioden.com/fireescape.php', alt:true },
          { id: 20018, name: "Alt Account Whack a Snake", completed: false, resetType: 'daily', url: 'https://www.lioden.com/snake.php', alt:true },
          { id: 20010, name: "Alt Account Lioden Trivia", completed: false, resetType: 'daily', sound: '', url: 'https://www.lioden.com/trivia.php', alt:true },
          { id: 20019, name: "Alt Account Cub Training", completed: false, resetType: 'daily', url: 'https://www.lioden.com/cubtraining.php', alt:true },
          { id: 20020, name: "Alt Account Asign Cubs to Broodmothers", completed: false, resetType: 'daily', alt:true },
          { id: 2003, name: "Alt Account Feed Lions", completed: false, resetType: 'daily', alt:true},
          { id: 2004, name: "Alt Account Nest Lions", completed: false, resetType: 'daily', alt:true},
          { id: 20021, name: "Alt Account Feed Beetles", completed: false, resetType: 'daily', alt:true },
          { id: 20022, name: "Alt Account Train Beetles", completed: false, resetType: 'daily', alt:true },
          { id: 20015, name: "Alt Account Tree Cub", completed: false, resetType: 'daily', url: 'https://www.lioden.com/givingtree.php', alt:true},
          { id: 2005, name: "Alt Account Beetle Battles", completed: false, resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'assets/bbattle.mp3', url: 'https://www.lioden.com/battlebeetles.php', alt:true },
          { id: 2006, name: "Alt Account Hunting", completed: false, resetType: 'interval', resetInterval: 30 * 60 * 1000, sound: 'assets/hunting.mp3', url: 'https://www.lioden.com/hunting.php', alt:true },
          { id: 2007, name: "Alt Account Patrolling", completed: false, resetType: 'interval', resetInterval: 60 * 60 * 1000, sound: 'assets/patrol.mp3', url: 'https://www.lioden.com/patrol.php', alt:true },
          { id: 2008, name: "Alt Account Gorillas", completed: false, resetType: 'interval', resetInterval: 24 * 60 * 60 * 1000, sound: 'assets/gorillaq.mp3', url: 'https://www.lioden.com/gorilla-enclave.php', alt:true },
          { id: 2009, name: "Alt Account Spend Event Currency", completed: false, activeDates: 'lastDayOfMonth', sound: '', alt:true },
          { id: 20011, name: "Alt Account Shaman Quests", completed: false, activeMonths: [10], sound: '', url: 'https://www.lioden.com/shamanquests.php', alt:true }, // November
          { id: 20012, name: "Alt Account Check Event Stud", completed: false, resetType: 'daily', activeMonths: [7], url: 'https://www.lioden.com/auguststud.php', alt:true }, // August
          { id: 20013, name: "Alt Account Den Locusts", completed: false, activeMonths: [8],resetType: 'interval', resetInterval: 30 * 60 * 1000, sound: 'assets/locusts.mp3', alt:true,  url: 'https://www.lioden.com/online.php?random=yes' }, // September
          { id: 20023, name: "Alt Account Harbinger", completed: false, activeMonths: [8],resetType: 'daily', alt:true},
          { id: 20014, name: "Alt Account Empty Energy", completed: false, resetType: 'interval', resetInterval: 150 * 60 * 1000, sound: 'assets/energy.mp3', alt:true },
          { id: 20024, name: "Alt Account Trick or Treat", completed: false, resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'assets/trickortreat.mp3', alt:true, url: 'https://www.lioden.com/online.php?random=yes', activeDateRange: {
                start: new Date(new Date().getFullYear(), 9, 26), // October 26
                end: new Date(new Date().getFullYear(), 9, 31) // October 31
              }},
          { id: 20025, name: "Alt Account Heaven/Hell Quests", completed: false, activeMonths: [9],resetType: 'daily', alt:true},
          { id: 20026, name: "Alt Account Shaman Pit - Inhale", completed: false, activeMonths: [10],resetType: 'interval', resetInterval: 180 * 60 * 1000, sound: 'assets/inhale.mp3', alt:true,  url: 'https://www.lioden.com/event.php' },
          { id: 20027, name: "Alt Account Shaman Pit - Drink", completed: false, activeMonths: [10],resetType: 'Daily', alt:true,  url: 'https://www.lioden.com/event.php' },
          { id: 20028, name: "Alt Account Shaman Pit - Whisper", completed: false, activeMonths: [10],resetType: 'Daily', alt:true,  url: 'https://www.lioden.com/event.php' },
          { id: 20029, name: "Alt Account Month Exclusive Crafting", completed: false, activeMonths: [1,2,4,6, 9, 10],resetType: 'Daily', activeDates: 'lastDayOfMonth', alt:true,  url: 'https://www.lioden.com/crafting.php' },
          { id: 20030, name: "Alt Account Guelta", completed: false, activeMonths: [11],resetType: 'interval', resetInterval: 60 * 60 * 1000, sound: 'assets/guelta.mp3', alt:true,  url: 'https://www.lioden.com/event.php' },
          { id: 20031, name: "Alt Account Wallowing Pit", completed: false, activeMonths: [11],resetType: 'interval', resetInterval: 60 * 60 * 1000, sound: 'assets/wallowing.mp3', alt:true,  url: 'https://www.lioden.com/event.php' },
          { id: 20032, name: "Alt Account Advent Calendar", completed: false, resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'chime.mp3', alt:true, url: 'https://www.lioden.com/online.php?random=yes', activeDateRange: {
                start: new Date(new Date().getFullYear(), 11, 22), // October 26
                end: new Date(new Date().getFullYear(), 11, 30) // October 31
              }},
              { id: 20033, name: "Alt Account Food Pit", completed: false, activeMonths: [0],resetType: 'Daily', alt:true,  url: 'https://www.lioden.com/event.php' },
              { id: 20034, name: "Alt Account Story Quests", completed: false, resetType: 'Daily', alt:true, url: 'https://www.lioden.com/event.php', activeDateRange: {
                    start: new Date(new Date().getFullYear(), 0, 5), // October 26
                    end: new Date(new Date().getFullYear(), 0, 31) // October 31
                  }},
              { id: 20035, name: "Alt Account Flirt!", completed: false, activeMonths: [1],resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'assets/flirt.mp3', alt:true,  url: 'https://www.lioden.com/event.php' },
              { id: 20036, name: "Alt Account Slap!", completed: false, activeMonths: [1],resetType: 'interval', resetInterval: 14 * 60 * 1000, sound: 'assets/slap.mp3', alt:true,  url: 'https://www.lioden.com/event.php' },
              { id: 20037, name: "Alt Account Poacher Chase", completed: false, resetType: 'daily', activeMonths: [2], url: 'https://www.lioden.com/games.php', alt:true },
              { id: 20038, name: "Alt Account Ostrich Chicks", completed: false, resetType: 'daily', activeMonths: [3], url: 'https://www.lioden.com/event.php', alt:true },
              { id: 20039, name: "Alt Account Bunny Tunnels", completed: false, activeMonths: [3],resetType: 'interval', resetInterval: 60 * 60 * 1000, sound: 'assets/tunnels.mp3', alt:true,  url: 'https://www.lioden.com/event.php' },
              { id: 20040, name: "Alt Account Wenet", completed: false, resetType: 'daily', activeMonths: [3], url: 'https://www.lioden.com/event.php', alt:true },
              { id: 20041, name: "Alt Account Challenge!", completed: false, activeMonths: [4],resetType: 'interval', resetInterval: 15 * 60 * 1000, sound: 'assets/challenge.mp3', alt:true,  url: 'https://www.lioden.com/event.php' },
              { id: 20042, name: "Alt Account Defend!", completed: false, activeMonths: [4],resetType: 'interval', resetInterval: 14 * 60 * 1000, sound: 'assets/defend.mp3', alt:true,  url: 'https://www.lioden.com/event.php' },
              { id: 20043, name: "Alt Account Groupies", completed: false, activeMonths: [4],resetType: 'interval', resetInterval: 6 * 60 * 60 * 1000, sound: 'assets/groupie.mp3', alt:true,  url: 'https://www.lioden.com/event.php'},
              { id: 20044, name: "Alt Account Story Quests", completed: false, resetType: 'daily', activeMonths: [5], url: 'https://www.lioden.com/event.php', alt:true },
              { id: 20045, name: "Alt Account AM Raffle Lioness", completed: false, resetType: 'daily', activeMonths: [6], url: 'https://www.lioden.com/event.php', alt: true },
              { id: 20046, name: "Alt Account PM Raffle Lioness", completed: false, resetType: 'daily', activeMonths: [6], url: 'https://www.lioden.com/event.php', alt: true }


  ];//we're on , alt account tasks start with 200


  //Render Tasks starts
  function renderTasks() {
      const timerList = document.getElementById('timer-tasks');
      const dailyList = document.getElementById('daily-tasks');
      const eventList = document.getElementById('event-tasks');

      timerList.innerHTML = ''; // Clear the timer list before rendering
      dailyList.innerHTML = ''; // Clear the daily list before rendering
      eventList.innerHTML = ''; // Clear the event list before rendering

      let hasEventTasks = false; // Track if there are any event tasks for the current month

      tasks.forEach(task => {
          const now = new Date();

          // Check if the task is within the specified date range
          if (task.activeDateRange) {
              const { start, end } = task.activeDateRange;
              if (now < start || now > end) {
                  return; // Skip rendering if the current date is outside the specified range
              }
          }

          // Other checks for last day of the month or active months
          if (task.activeDates === 'lastDayOfMonth' && !isLastDayOfMonth()) {
              return; // Skip rendering if it's not the last day of the month
          }

          if (!isTaskActiveInCurrentMonth(task)) {
              return; // Skip rendering if the task is not active in the current month
          }

          // Only hide alt tasks if altAccountEnabled is false
          if (!altAccountEnabled && task.alt) {
              return; // Skip rendering alt tasks when the toggle is off
          }

          console.log('Rendering task:', task.name, 'Completed:', task.completed);

          const listItem = document.createElement('li');
          listItem.style.display = 'flex';
          listItem.style.alignItems = 'center';

          const timerSpan = document.createElement('span');
          timerSpan.style.minWidth = '60px';
          timerSpan.style.color = '#ffffff'; // Timer color
          listItem.appendChild(timerSpan);

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `task-${task.id}`;
          checkbox.checked = task.completed;
          checkbox.style.marginLeft = '10px';
          if (!task.completed) {
              checkbox.addEventListener('change', () => completeTask(task.id));
              listItem.appendChild(checkbox);
          }

          let label;
          if (task.url) {
              label = document.createElement('span');
              label.innerText = task.name;
              label.style.color = '#76D1CE'; // Link color
              label.style.textDecoration = 'underline';
              label.style.cursor = 'pointer';
              label.addEventListener('click', () => handleLinkClick(task.url));
          } else {
              label = document.createElement('label');
              label.htmlFor = `task-${task.id}`;
              label.innerText = task.name;
              label.style.color = '#ffffff'; // Label color
          }

          label.style.marginLeft = '10px';
          if (task.completed) {
              label.style.textDecoration = 'line-through';
              label.style.color = 'gray';
          }
          listItem.appendChild(label);

          if (task.activeMonths || task.activeDates || task.activeDateRange) {
              eventList.appendChild(listItem);
              hasEventTasks = true;
          } else if (task.resetType === 'interval') {
              timerList.appendChild(listItem);
          } else if (task.resetType === 'daily') {
              dailyList.appendChild(listItem);
          } else {
              eventList.appendChild(listItem);
              hasEventTasks = true;
          }

          if (task.resetType === 'interval' && task.completed) {
              console.log(`Preparing to update timer for task ${task.id}`);
              timerSpan.id = `timer-${task.id}`;
              updateTimer(task, timerSpan);
          } else {
              timerSpan.innerText = ''; // Clear the timer if not applicable
          }
      });

      if (!hasEventTasks) {
          const noEventMessage = document.createElement('li');
          noEventMessage.innerText = "No event tasks this month!";
          eventList.appendChild(noEventMessage);
      }

      // Start a periodic update for all timers
      setInterval(() => {
          tasks.forEach(task => {
              if (task.resetType === 'interval' && task.completed) {
                  const timerSpan = document.getElementById(`timer-${task.id}`);
                  if (timerSpan) {
                      updateTimer(task, timerSpan);
                  }
              }
          });
      }, 1000); // Update every second
  }

  //rendertasks ends



  window.handleAltAccountToggle = function() {
      altAccountEnabled = document.getElementById('altAccountToggle').checked;
      localStorage.setItem('altAccountEnabled', altAccountEnabled); // Save toggle state
      renderTasks();  // Re-render the tasks based on the toggle state
  };



  document.addEventListener('DOMContentLoaded', () => {
      // Define the function and explicitly attach it to the window object


      // Attach event listener after DOM is loaded
      const altAccountToggle = document.getElementById('altAccountToggle');
      if (altAccountToggle) {
          altAccountToggle.addEventListener('change', window.handleAltAccountToggle);
      }
  });




  resetTasksIfNecessary();

  let userLinks = JSON.parse(localStorage.getItem('userLinks')) || {
  studs: [],
  searches: [],
  other: [],
  reference: []
};



// Function to save user-defined links to localStorage
function saveUserLinks() {
  localStorage.setItem('userLinks', JSON.stringify(userLinks));
}

// Function to load user-defined links from localStorage and render them
function loadUserLinks() {
  Object.keys(userLinks).forEach(category => {
    const linkList = document.getElementById(`${category}-list`);
    linkList.innerHTML = ''; // Clear current links
    userLinks[category].forEach(link => {
      const listItem = document.createElement('li');
      const linkElement = document.createElement('a');
      linkElement.href = '#';
      linkElement.textContent = link.name;

      linkElement.addEventListener('click', (event) => {
        event.preventDefault();
        window.electron.openExternal(link.url); // Uses the preload script to open in the browser
      });

      const deleteIcon = document.createElement('span');
      deleteIcon.innerHTML = '🗑️';
      deleteIcon.onclick = () => {
        if (confirm('Are you sure you want to delete this link?')) {
          listItem.remove();
          userLinks[category] = userLinks[category].filter(l => l.url !== link.url);
          saveUserLinks();
        }
      };

      listItem.appendChild(linkElement);
      listItem.appendChild(deleteIcon);
      linkList.appendChild(listItem);
    });
  });
}

// Load user-defined links when the DOM content is loaded
loadUserLinks();

  // Function to check if today is the last day of the month
  function isLastDayOfMonth() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return today.getDate() === lastDay;
  }

  // Function to check if a task is active in the current month
  function isTaskActiveInCurrentMonth(task) {
    const currentMonth = new Date().getMonth(); // 0-indexed, so January is 0, February is 1, etc.
    return task.activeMonths ? task.activeMonths.includes(currentMonth) : true;
  }

  // Load tasks from localStorage
  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      console.log('Loaded tasks from localStorage:', JSON.parse(storedTasks));
      const parsedTasks = JSON.parse(storedTasks);

      if (Array.isArray(parsedTasks)) {
        parsedTasks.forEach((task, index) => {
          if (tasks[index] && typeof task.completed !== 'undefined') {
            tasks[index].completed = task.completed;
            tasks[index].lastCompleted = task.lastCompleted;
          } else {
            console.log(`Task at index ${index} is missing or not properly defined.`);
          }
        });
      } else {
        console.error('Error: Loaded tasks are not an array:', parsedTasks);
      }
    } else {
      console.log('No tasks found in localStorage, using default tasks.');
    }

    renderTasks();
  }

  // Function to complete tasks
  function completeTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed; // Toggle completed status
      if (tasks[taskIndex].completed) {
        tasks[taskIndex].lastCompleted = new Date().toISOString(); // Record the completion time
      } else {
        tasks[taskIndex].lastCompleted = null; // Clear lastCompleted when task is unchecked
      }
      console.log('Task completed status changed:', tasks[taskIndex]);
      saveTasks(); // Save the updated tasks to localStorage
      renderTasks(); // Re-render the task list
    }
  }

  // Function to save tasks to localStorage
  function saveTasks() {
    console.log('Saving tasks to localStorage:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to update the timer
  function updateTimer(task, timerSpan) {
    console.log(`updateTimer called for task ${task.id}`);

    const now = new Date();
    const lastCompletedTime = task.lastCompleted ? new Date(task.lastCompleted) : null;
    if (lastCompletedTime) {
      const timeElapsed = now - lastCompletedTime;
      const timeRemaining = task.resetInterval - timeElapsed;

      if (timeRemaining > 0) {
        const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        timerSpan.innerText = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        console.log(`Timer updated for task ${task.id}: ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      } else {
        console.log(`Timer expired for task ${task.id}, resetting...`);
        task.completed = false;
        task.lastCompleted = null;
        playChime(task.sound);
        saveTasks();
        renderTasks();
      }
    } else {
      console.log(`No lastCompletedTime for task ${task.id}`);
      timerSpan.innerText = '';
    }
  }

  // Function to reset all tasks instantly
  function resetAllTasks() {
    tasks.forEach(task => {
      task.completed = false;
      task.lastCompleted = null;
    });
    saveTasks();
    renderTasks();
  }

  // Function to delete all data
function deleteAllData() {
  if (confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
    localStorage.clear(); // Clear localStorage
    console.log('All data deleted.');
    location.reload(); // Reload the page to reflect changes
  }
}




  // Load and render tasks
  loadTasks();

  // Attach event listener to reset button
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', resetAllTasks);

// Attach event listener to delete data button
const deleteDataButton = document.getElementById('deleteDataButton');
deleteDataButton.addEventListener('click', deleteAllData);

  // Function to play a chime when a task is reset
function playChime(sound) {
  const audio = new Audio(sound);
  audio.volume = alarmVolume; // Set the volume based on the slider
  audio.play();
}


function resetTasksIfNecessary() {
    const now = new Date();
    console.log('Current Time:', now.toISOString());

    const lastReset = localStorage.getItem('lastReset');
    const lastResetDate = lastReset ? new Date(lastReset) : null;

    console.log('Last Reset Date:', lastResetDate ? lastResetDate.toISOString() : 'No last reset date found');

    const todayReset = new Date();
    todayReset.setUTCHours(9, 10, 0, 0);  // Adjust to your local reset time

    console.log('Scheduled Reset Time for Today:', todayReset.toISOString());

    // Check if today is the same as the last reset day
    if (!lastResetDate || lastResetDate.toDateString() !== now.toDateString()) {
        console.log('Last reset was not today, checking if it’s time to reset...');

        if (now >= todayReset) {
            console.log('Reset time has passed, resetting tasks...');

            tasks.forEach(task => {
                if (task.resetType === 'daily') {
                    task.completed = false;
                }
            });

            localStorage.setItem('lastReset', now.toISOString());
            saveTasks();
            renderTasks();

            console.log('Tasks have been reset and saved.');
        } else {
            console.log('It is not yet time to reset tasks.');
        }
    } else {
        console.log('Tasks were already reset today.');
    }

    // Interval Reset Check
    tasks.forEach(task => {
        if (task.resetType === 'interval' && task.completed) {
            const lastCompletedTime = task.lastCompleted ? new Date(task.lastCompleted) : null;
            const timeElapsed = lastCompletedTime ? now - lastCompletedTime : null;

            console.log(`Checking interval reset for task ${task.id}. Last Completed: ${lastCompletedTime}, Time Elapsed: ${timeElapsed}`);

            if (lastCompletedTime && timeElapsed >= task.resetInterval) {
                task.completed = false;
                task.lastCompleted = null;
                playChime(task.sound);
                saveTasks();
                renderTasks();
                console.log(`Task ${task.id} has been reset after interval.`);
            } else if (task.completed) {
                const timerSpan = document.getElementById(`timer-${task.id}`);
                if (timerSpan) {
                    updateTimer(task, timerSpan);
                }
            }
        }
    });

    // Schedule next daily reset check
    const nextReset = new Date();
    nextReset.setUTCHours(9, 10, 0, 0);
    if (now > nextReset) {
        nextReset.setDate(nextReset.getDate() + 1);
    }

    const timeUntilNextReset = nextReset - now;
    console.log('Time until next reset check:', timeUntilNextReset / 1000, 'seconds');

    setTimeout(() => {
        resetTasksIfNecessary();
    }, timeUntilNextReset);
}



  // Function to clear localStorage
  function clearLocalStorage() {
    localStorage.removeItem('tasks');
    console.log('Cleared localStorage.');
  }

  // Open the add link popup as a modal
  window.openAddLinkPopup = function() {
  const modal = document.getElementById('addLinkModal');
  if (modal) {
    modal.style.display = 'block';

    // Focus the first input field
    const firstInput = modal.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  } else {
    console.error('Modal element not found.');
  }
};

  // Close the add link popup
  window.closeAddLinkPopup = function() {
    const modal = document.getElementById('addLinkModal');
    if (modal) {
      modal.style.display = 'none';
    } else {
      console.error('Modal element not found.');
    }
  };

  // Add new link
window.addLink = function() {
  const name = document.getElementById('linkName').value;
  const url = document.getElementById('linkUrl').value;
  const category = document.getElementById('linkCategory').value;

  if (name && url) {
    const linkList = document.getElementById(`${category}-list`);
    const listItem = document.createElement('li');
    const linkElement = document.createElement('a');
    linkElement.href = '#';
    linkElement.textContent = name;

    linkElement.addEventListener('click', (event) => {
      event.preventDefault();
      window.electron.openExternal(url); // Uses the preload script to open in the browser
    });

    const deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '🗑️';
    deleteIcon.onclick = () => {
      if (confirm('Are you sure you want to delete this link?')) {
        listItem.remove();
        userLinks[category] = userLinks[category].filter(link => link.url !== url);
        saveUserLinks();
      }
    };

    listItem.appendChild(linkElement);
    listItem.appendChild(deleteIcon);
    linkList.appendChild(listItem);

    // Save the new link to the userLinks array
    userLinks[category].push({ name, url });
    saveUserLinks(); // Save to localStorage

    // Reset the fields and dropdown
    document.getElementById('linkName').value = '';
    document.getElementById('linkUrl').value = '';
    document.getElementById('linkCategory').selectedIndex = 0;

    closeAddLinkPopup(); // Close the modal after adding the link
  }
};



  // Close the modal if the user clicks anywhere outside of it
  window.onclick = function(event) {
    const modal = document.getElementById('addLinkModal');
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Toggle the visibility of link sections
  window.toggleSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.toggle('collapsed');
    }
  };
});

document.addEventListener('DOMContentLoaded', () => {
  // Ensure this runs after DOM has loaded
  const altAccountToggle = document.getElementById('altAccountToggle');

  // Load the initial state from localStorage or set default
  const altAccountEnabled = localStorage.getItem('altAccountEnabled') === 'true';
  altAccountToggle.checked = altAccountEnabled;

  // Show or hide the alt account tasks based on the toggle
  toggleAltAccountTasks(altAccountEnabled);

  // Add event listener to handle toggle switch changes
  altAccountToggle.addEventListener('change', () => {
    const isChecked = altAccountToggle.checked;
    localStorage.setItem('altAccountEnabled', isChecked);
    toggleAltAccountTasks(isChecked);
  });

  function toggleAltAccountTasks(isEnabled) {
    const altTaskContainer = document.getElementById('alt-task-container');
    if (altTaskContainer) {
      altTaskContainer.style.display = isEnabled ? 'block' : 'none';
    }
  }
});
