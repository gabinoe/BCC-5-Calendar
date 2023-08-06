document.addEventListener("DOMContentLoaded", function () {
  var currentDayElement = document.getElementById("currentDay");
  currentDayElement.textContent = dayjs().format("dddd, MMMM D, YYYY");

  // Function to create the time blocks dynamically
  function createTimeBlocks() {
    var container = document.querySelector(".container-fluid");
    var currentHour = dayjs().format("H");

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = document.createElement("div");
      timeBlock.id = "hour-" + hour;
      timeBlock.className = "row time-block";
      if (hour < currentHour) {
        timeBlock.classList.add("past");
      } else if (hour == currentHour) {
        timeBlock.classList.add("present");
      } else {
        timeBlock.classList.add("future");
      }

      timeBlock.innerHTML = `
        <div class="col-2 col-md-1 hour text-center py-3">${hour}AM</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      `;

      container.appendChild(timeBlock);
    }
  }

  // Call the function to create the time blocks
  createTimeBlocks();

  var timeBlocks = document.querySelectorAll(".time-block");

  timeBlocks.forEach(function (timeBlock) {
    var textarea = timeBlock.querySelector("textarea");
    var saveButton = timeBlock.querySelector(".saveBtn");

    // Load events from local storage and set them in the textarea
    textarea.value = localStorage.getItem(timeBlock.id);

    // Save event to local storage when the save button is clicked
    saveButton.addEventListener("click", function () {
      localStorage.setItem(timeBlock.id, textarea.value);
    });
  });
});

