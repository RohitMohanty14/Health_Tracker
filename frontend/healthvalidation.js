// validation.js

$(document).ready(function () {
  // Helper function to show an error on a specific input
  function showError(inputId, message) {
    $(inputId).addClass("is-invalid");
    $(inputId + " ~ .invalid-feedback").text(message);
  }

  // Helper function to clear all errors
  function clearErrors() {
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").text("");
    $("#formSuccessMessage").hide();
  }

  // The main validation function
  function validateForm() {
    clearErrors();
    let isValid = true;

    // 1. Validate Daily Steps
    const steps = $("#stepsInput").val();
    if (steps === "" || !$.isNumeric(steps) || parseFloat(steps) < 0) {
      showError(
        "#stepsInput",
        "Please enter a valid, non-negative number for steps."
      );
      isValid = false;
    }

    // 2. Validate Hours of Sleep
    const sleep = $("#sleepHoursInput").val();
    if (
      sleep === "" ||
      !$.isNumeric(sleep) ||
      parseFloat(sleep) < 0 ||
      parseFloat(sleep) > 24
    ) {
      showError(
        "#sleepHoursInput",
        "Please enter a sleep duration between 0 and 24 hours."
      );
      isValid = false;
    }

    // 3. Validate Calories Consumed
    const calories = $("#caloriesInput").val();
    if (calories === "" || !$.isNumeric(calories) || parseFloat(calories) < 0) {
      showError(
        "#caloriesInput",
        "Please enter a valid, non-negative number for calories."
      );
      isValid = false;
    }

    return isValid;
  }

  // Handle the form submission
  $("#healthMetricsForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the default browser submission

    if (validateForm()) {
      // If validation passes:
      const successMessage = $("#formSuccessMessage");
      const submitButton = $(this).find('button[type="submit"]');

      // 1. Show success message
      successMessage
        .text("Metrics recorded! Redirecting to your dashboard...")
        .slideDown();

      // 2. Disable the button to prevent multiple submissions
      submitButton.prop("disabled", true).text("Redirecting...");

      // 3. Wait for a moment, then redirect to the dashboard
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 1500); // 1.5-second delay
    }
  });
});
