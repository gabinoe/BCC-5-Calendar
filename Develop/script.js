$(document).ready(function () {

  const $notification = $('.notification');
  const $timeBlocks = $('.time-block');
  const currentHour = dayjs().hour();

  function updateHourColors() {
    $timeBlocks.each(function () {
      const $this = $(this);
      const blockHour = parseInt($this.attr('id').split('-')[1]);

      if (blockHour < currentHour) {
        $this.removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $this.removeClass('past future').addClass('present');
      } else {
        $this.removeClass('past present').addClass('future');
      }
    });
  }

  function handleSaveButtonClick() {
    const $description = $(this).siblings('.description');
    const time = $(this).parent().attr('id');
    const value = $description.val();

    localStorage.setItem(time, value);
    $notification.addClass('show');
    setTimeout(function () {
      $notification.removeClass('show');
    }, 5000);
  }

  function loadSavedEvents() {
    $timeBlocks.each(function () {
      const $this = $(this);
      const time = $this.attr('id');
      const savedEvent = localStorage.getItem(time);

      $this.find('.description').val(savedEvent);
    });
  }


  $('.saveBtn').on('click', handleSaveButtonClick);

  // Initial setup
  updateHourColors();
  setInterval(updateHourColors, 15000);
  loadSavedEvents();

  // Display current day on page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});
