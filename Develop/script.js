// Wait for the DOM to be fully loaded before executing the JavaScript code
document.addEventListener("DOMContentLoaded", function() {
  // Display the current day at the top of the calendar
  var currentDayElement = document.getElementById("currentDay");
  currentDayElement.textContent = dayjs().format("dddd, MMMM D, YYYY");

  // Get the current hour in 24-hour format
  var currentHour = dayjs().format("H");

  // Select all the time-block elements
  var timeBlocks = document.querySelectorAll(".time-block");

  // Loop through each time block
  timeBlocks.forEach(function(timeBlock) {
    // Get the hour from the time block's ID
    var blockHour = parseInt(timeBlock.id.split("-")[1]);

    // Add the appropriate class to the time block based on the current hour
    if (blockHour < currentHour) {
      timeBlock.classList.add("past");
    } else if (blockHour === currentHour) {
      timeBlock.classList.add("present");
    } else {
      timeBlock.classList.add("future");
    }

    // Get the textarea and button elements within the time block
    var textarea = timeBlock.querySelector("textarea");
    var saveButton = timeBlock.querySelector(".saveBtn");

    // Load any saved event for the time block from local storage
    textarea.value = localStorage.getItem(timeBlock.id);

    // Save the event to local storage when the save button is clicked
    saveButton.addEventListener("click", function() {
      localStorage.setItem(timeBlock.id, textarea.value);
    });
  });
});

