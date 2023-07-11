$(function() {
  // Save button click event listener
  $(".saveBtn").on("click", function() {
    const timeBlockId = $(this).closest(".time-block").attr("id");
    const userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function() {
    const blockHour = parseInt($(this).attr("id").split("-")[1]);
    const currentHour = dayjs().format("H");

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Set the values of the textarea elements from local storage
  $(".time-block").each(function() {
    const timeBlockId = $(this).attr("id");
    const savedUserInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(savedUserInput);
  });

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});

