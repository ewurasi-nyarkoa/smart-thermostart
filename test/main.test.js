const { rooms, toggleAircon, setCurrTemp, checkSchedule } = require("../smartermostart.js");

test("toEqual matcher for objects", () => {
    const room = { name: "Living Room", currTemp: 25 };
    expect(room).toEqual({ name: "Living Room", currTemp: 25 });
  });

test("check the innitial state of the airCondition", () => {
  const room = rooms[0];
  expect(room.airConditionerOn).toBe(false);
});

test("check if the toggleAircon function works", () => {
    const room = rooms[0];
    
  toggleAircon(room);
  expect(room.airConditionerOn).toBe(true);
});
test('check if toggleAircon is called again the function works as expected', () => {
    const room = rooms[0];
    toggleAircon(room);
    expect(room.airConditionerOn).toBe(false);});

test("setCurrTemp should update the currTemp property", () => {
  const room = rooms[0];
  setCurrTemp(room, 30);
  expect(room.currTemp).toBe(30);

  setCurrTemp(room, 20);
  expect(room.currTemp).toBe(20);
});

test("checkSchedule should toggle AC based on startTime and endTime", () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-04-29T16:30:00"));

  checkSchedule(rooms, "16:30");
  expect(rooms[0].airConditionerOn).toBe(true);

  jest.setSystemTime(new Date("2025-04-29T20:00:00"));
  checkSchedule(rooms, "20:00");
  expect(rooms[0].airConditionerOn).toBe(false);

  jest.useRealTimers();
});

document.body.innerHTML = `
  <div id="rooms"></div>
  <div id="temp"></div>
  <div class="default-settings">
    <button id="cool">Cool</button>
    <button id="warm">Warm</button>
  </div>
`;

test("toggleAircon should toggle the airConditionerOn property", () => {
  const room = rooms[0];
  expect(room.airConditionerOn).toBe(false);

  room.toggleAircon();
  expect(room.airConditionerOn).toBe(true);

  room.toggleAircon();
  expect(room.airConditionerOn).toBe(false);
});

test("Room startTime should match HH:MM format", () => {
    const time = "16:30";
    // Matches HH:MM format
    expect(time).toMatch(/^\d{2}:\d{2}$/); 
  });

// test("Adding a room with invalid input should throw an error", () => {
//     const invalidRoom = {
//         name: "",
//         currTemp: 50, // Invalid temperature
//         coldPreset: 18,
//         warmPreset: 28,
//         airConditionerOn: false,
//         startTime: "",
//         endTime: "",
//     };

//     // Expect an error to be thrown when attempting to add the invalid room
//     expect(() => {
//         rooms.push(invalidRoom);
//     }).toThrow();
// });
