# Bugs Documentation

## Bug 1: Incorrect Room Selection in Dropdown
- **Line Numbers**: 209
- **Type**: Logic Error
- **Description**: The `roomSelect` dropdown was not correctly updating the `selectedRoom` variable because the `option.value` was set to the entire room object instead of the `room.name`.
- **Identification Method**: Used `console.log(option.value)` inside the dropdown generation function to verify the value being set for each option.
- **Solution**: Updated the dropdown generation logic to set `option.value` to `room.name` instead of the entire room object by modifying the `rooms.forEach` function.

---

## Bug 2: Temperature Increase/Decrease Not Reflecting
- **Line Numbers**: 250, 277
- **Type**: Function Call Error
- **Description**: The `increaseTemp` and `decreaseTemp` methods were being called incorrectly. Instead of invoking the methods, the code was assigning their return values to variables without actually executing them.
- **Identification Method**: Added `console.log` statements to verify whether the `increaseTemp` and `decreaseTemp` methods were being executed and found that they were not.
- **Solution**: Updated the code to directly call `room.increaseTemp()` and `room.decreaseTemp()` without assigning them to variables.

---

## Bug 3: Preset Temperature Validation Error
- **Line Numbers**: 316-349
- **Type**: Validation Logic Error
- **Description**: The validation for preset temperatures was failing because it was comparing a string with a number, causing incorrect validation results.
- **Identification Method**: Used `console.log(typeof coolInput.value, typeof warmInput.value)` to check the data types of the input values during validation and found they were strings.
- **Solution**: Converted the `coolInput.value` and `warmInput.value` to numbers using `Number()` and the `+` operator before performing the comparisons.

---


## Bug 4: Incorrect Room Status Message
- **Line Numbers**: 376
- **Type**: Logic Error
- **Description**: The room status message was incorrect. The condition for displaying "Warming room to:" or "Cooling room to:" was interchanged, causing the wrong message to appear.
- **Identification Method**: Reviewed the logic and used `console.log` to verify the condition and output.
- **Solution**: Corrected the ternary operator to display the appropriate message: `${room.currTemp > 25 ? "Warming room to:" : "Cooling room to:"}`.

## Bug 5: Image Overlay Error
- **Line Numbers**: 147-153
- **Type**: Logic Error
- **Description**: The overlay declaration was incorrect. The value for the `coolOverlay` was that for the `warmOverlay`, causing the wrong overlay to appear.
- **Identification Method**: Observed the incorrect overlay directly on the image during testing.
- **Solution**: Corrected the overlay declaration by assigning the appropriate values to `coolOverlay` and `warmOverlay`.