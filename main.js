// Room objects
class Room {
  constructor(name, currTemp, coldPreset, warmPreset, image, airConditionerOn, startTime, endTime) {
    this.name = name;
    this.currTemp = currTemp;
    this.coldPreset = coldPreset;
    this.warmPreset = warmPreset;
    this.image = image;
    this.airConditionerOn = airConditionerOn;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  setCurrTemp(temp) {
    this.currTemp = temp;
  }

  setColdPreset(newCold) {
    this.coldPreset = newCold;
  }

  setWarmPreset(newWarm) {
    this.warmPreset = newWarm;
  }

  decreaseTemp() {
    if (this.currTemp > 10) this.currTemp--;
  }

  increaseTemp() {
    if (this.currTemp < 32) this.currTemp++;
  }

  toggleAircon() {
    this.airConditionerOn = !this.airConditionerOn;
  }
}

const rooms = [
  new Room("Living Room", 32, 20, 32, "./assets/living-room.jpg", false, "16:30", "20:00"),
  new Room("Kitchen", 29, 20, 32, "./assets/kitchen.jpg", false, "16:30", "20:00"),
  new Room("Bathroom", 30, 20, 32, "./assets/bathroom.jpg", false, "16:30", "20:00"),
  new Room("Bedroom", 31, 20, 32, "./assets/bedroom.jpg", false, "16:30", "20:00"),
];
// last bug
const  coolOverlay = `linear-gradient(
    to bottom,
    rgba(141, 158, 247, 0.2),
    rgba(194, 197, 215, 0.1)
  )`;

const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

const setInitialOverlay = () => {
  document.querySelector(
    ".room"
  ).style.backgroundImage = `url('${rooms[0].image}')`;

  document.querySelector(".room").style.backgroundImage = `${
    rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${rooms[0].image}')`;
};

const setOverlay = (room) => {
  document.querySelector(".room").style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
};

// Set svg accordingly
const svgPoint = document.querySelector(".point");
const angleOffset = 86;
const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};

// Handle the dropdown data
const roomSelect = document.getElementById("rooms");

const currentTemp = document.getElementById("temp");

let selectedRoom = rooms[0].name;

// Set default temperature
currentTemp.textContent = `${rooms[0].currTemp}°`;

setInitialOverlay();

document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;
// Add new options from rooms array
rooms.forEach((room) => {
  const option = document.createElement("option");
  //first change
  option.value = room.name;
  console.log(option.value)
  option.textContent = room.name;
  roomSelect.appendChild(option);
});

// Set current temperature to currently selected room

const setSelectedRoom = (selectedRoom) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  setIndicatorPoint(room.currTemp);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};

roomSelect.addEventListener("change", function () {
 
  selectedRoom = this.value;

  setSelectedRoom(selectedRoom);
  // console.log(selectedRoom)
});


// Set preset temperatures
const defaultSettings = document.querySelector(".default-settings");

defaultSettings.addEventListener("click", (e) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  if (!room) return; 

  if (e.target.id === "cool") {
    // Apply the cool preset
    room.setCurrTemp(room.coldPreset);
    console.log(`Cool preset applied: ${room.coldPreset}°`);
    setOverlay(room); 
    updateRoomUI(room);
    // Set the button background color to indicate selection
    coolBtn.classList.toggle('cool');

  }

  if (e.target.id === "warm") {
    // Apply the warm preset
    room.setCurrTemp(room.warmPreset);
    console.log(`Warm preset applied: ${room.warmPreset}°`);
    setOverlay(room); 
    updateRoomUI(room);
    warmBtn.classList.toggle('warm');
  }
});

// Function to update the room UI
const updateRoomUI = (room) => {
  setIndicatorPoint(room.currTemp); 
  currentTemp.textContent = `${room.currTemp}°`; 
  setOverlay(room); 
  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
  
  generateRooms();
};


  

// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
//ssecond change

  const increaseRoomTemperature = room.increaseTemp();
  // console.log(increaseRoomTemperature)

  if (room.currTemp < 32) {
      // Increase the temperature by 1 degree, ssecond change
    increaseRoomTemperature;
    // console.log(increaseRoomTemperature)
  }
 
 
  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  // third change
  const decreaseRoomTemperature = room.decreaseTemp();
  console.log(decreaseRoomTemperature)

  if (room.currTemp > 10) {
    //third change, i do not need to call the function again since it is already called in the object
    decreaseRoomTemperature;
  }

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");


document.getElementById("newPreset").addEventListener("click", () => {
  if (!timeInputsDiv.classList.contains("hidden")) {
    timeInputsDiv.classList.add("hidden"); // Hide the set time inputs if visible
  }

  if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden"); // Show the preset inputs
  } else {
    inputsDiv.classList.add("hidden"); // Hide the preset inputs
  }
});

// close inputs
document.getElementById("close").addEventListener("click", () => {
  inputsDiv.classList.add("hidden");
});

const inputsDiv = document.querySelector(".inputs");

// Event delegation for handling preset temperatures
inputsDiv.addEventListener("click", (e) => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");

  if (e.target.id === "save") {
    // Validate the inputs
    if (!coolInput.value || !warmInput.value) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Both fields are required.";
      return;
    }

    const coolValue = Number(coolInput.value);
    const warmValue = Number(warmInput.value);

    
  if (coolInput.value && warmInput.value ) {
    errorSpan.style.display = "none";}

    if (coolValue < 10 || coolValue > 25) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 25° for cool).";
      return;
    }

    if (warmValue < 25 || warmValue > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (25° - 32° for warm).";
      return;
    }

    // Validation passed
    errorSpan.style.display = "none";

    const currRoom = rooms.find((room) => room.name === selectedRoom);
    currRoom.setColdPreset(coolValue);
    currRoom.setWarmPreset(warmValue);

    // console.log(currRoom.coldPreset, currRoom.warmPreset)
    // console.log(rooms)

    // Clear the input fields
    coolInput.value = "";
    warmInput.value = "";
  }



  if (e.target.id === "close") {
    inputsDiv.classList.add("hidden");
  }
  //console.log to see that the delegation is working
  // console.log(e.target.id);
});


// Function to handle time input and update the room's schedule
const saveTimeButton = document.getElementById("saveTime");
const closeTimeButton = document.getElementById("closeTime");
const timeInputsDiv = document.querySelector(".time-inputs");

saveTimeButton.addEventListener("click", () => {
  const startTimeInput = document.getElementById("startTimeInput").value;
  const endTimeInput = document.getElementById("endTimeInput").value;

  // Validate time input
  if (!startTimeInput || !endTimeInput) {
    alert("Please enter both start and end times.");
    return;
  }

  if (!/^\d{2}:\d{2}$/.test(startTimeInput) || !/^\d{2}:\d{2}$/.test(endTimeInput)) {
    alert("Please enter valid times in HH:MM format.");
    return;
  }

  // Find the selected room
  const selectedRoomName = document.getElementById("rooms").value;
  const room = rooms.find((currRoom) => currRoom.name === selectedRoomName);

  if (!room) {
    alert("Please select a valid room.");
    return;
  }
 // Update the room's startTime and endTime
  room.startTime = startTimeInput;
  room.endTime = endTimeInput;

  generateRooms();

   //clear the input fields
   document.getElementById("startTimeInput").value = "";
   document.getElementById("endTimeInput").value = "";
 

  // console.log(`Updated schedule for ${room.name}: Start Time - ${room.startTime}, End Time - ${room.endTime}`);
// Hide the time inputs modal
  timeInputsDiv.classList.add("hidden");
});

// Close the time inputs modal
closeTimeButton.addEventListener("click", () => {
  timeInputsDiv.classList.add("hidden");
});

document.getElementById("setTime").addEventListener("click", () => {
  if (!inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.add("hidden"); // Hide the preset inputs if visible
  }
  // Show the time inputs modal when "Schedule Time" button is clicked
  if (timeInputsDiv.classList.contains("hidden")) {
  timeInputsDiv.classList.remove("hidden");}
  else {
    timeInputsDiv.classList.add("hidden");
  }
});

// Rooms Control
// Generate rooms
const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";

  rooms.forEach((room) => {
    roomsHTML += `
    <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
            <button class="switch">
              <ion-icon name="power-outline" class="${
                room.airConditionerOn ? "powerOn" : ""
              }"></ion-icon>
            </button>
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${
            room.airConditionerOn ? "" : "none"
          }">${room.currTemp > 25 ? " Warming room to: " : "Cooling room to: "}${
      room.currTemp
    }°</span>
        </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;
};
const displayTime = (room) => {
  return `
    <div class="time-display" style="overflow-x: auto; white-space: nowrap;">
      <span class="time">${room.startTime}</span>
      <div class="bars" style="display: inline-block;">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <span class="time">${room.endTime}</span>
    </div>
    `;
}

generateRooms();

document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );
    room.toggleAircon();
    generateRooms();
  }

  if (e.target.classList.contains("room-name")) {
    setSelectedRoom(e.target.parentNode.parentNode.id);
  }
});

//working on the model for users to add their own rooms   
const addRoomModal = document.getElementById("addRoomModal");
const roomNameInput = document.getElementById("roomName");
const initialTempInput = document.getElementById("initialTemp");
const saveRoomButton = document.getElementById("saveRoom");
const closeModalButton = document.getElementById("closeModal");

// Open modal
document.getElementById("addRoomButton").addEventListener("click", () => {
  addRoomModal.classList.remove("hidden");
});

// Close modal
closeModalButton.addEventListener("click", () => {
  addRoomModal.classList.add("hidden");
});

// Save new room
saveRoomButton.addEventListener("click", () => {
  const roomName = roomNameInput.value.trim();
  const initialTemp = Number(initialTempInput.value);
  const startTime = document.getElementById("startTime").value;
  const endTime =document.getElementById("endTime").value;

  if (!roomName || isNaN(initialTemp) || initialTemp < 10 || initialTemp > 32) {
    alert("Please enter a valid room name and temperature (10° - 32°).");
    return;
  }
  if (!startTime || !endTime || !/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) {
    alert("Please enter valid start and end times in HH:MM format.");
    return;
  }
console.log(typeof startTime, typeof endTime)
  // Add new room to the rooms array
  rooms.push(
    new Room(
      roomName,
      initialTemp,
      20,
      32, 
      "./assets/default-image.jpg", 
      false,
      startTime,
      endTime
    )
  );

  // Update dropdown menu
  const option = document.createElement("option");
  option.value = roomName;
  option.textContent = roomName;
  roomSelect.appendChild(option);

  // Refresh the UI
  generateRooms();

  // Clear inputs and close modal
  roomNameInput.value = "";
  initialTempInput.value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";
  addRoomModal.classList.add("hidden");
})


// Turn on all air conditioners
document.getElementById("turnOnAllAC").addEventListener("click", () => {
  rooms.forEach((room) => {
    if (!room.airConditionerOn) {
      room.toggleAircon(); // Turn on the AC if it's off
    } else{
      room.toggleAircon(); // Turn off the AC if it's on
    }
  });

  console.log("All air conditioners turned on.");
  generateRooms(); // reflect changes
});


// Function to check the schedule and toggle AC
const checkSchedule = () => {
  const currentTime = new Date().toTimeString().slice(0, 5); // Get current time in HH:MM format

  rooms.forEach((room) => {
    if (room.startTime === currentTime && !room.airConditionerOn) {
      room.toggleAircon(); // Turn on the AC
      // console.log(`AC turned ON for ${room.name} at ${currentTime}`);
    }

    if (room.endTime === currentTime && room.airConditionerOn) {
      room.toggleAircon(); // Turn off the AC
      // console.log(`AC turned OFF for ${room.name} at ${currentTime}`);
    }
  });

  // Refresh the UI to reflect changes
  generateRooms();
};

// Start checking the schedule every minute
setInterval(checkSchedule, 60000);



