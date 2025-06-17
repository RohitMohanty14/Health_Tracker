$(document).ready(function () {
  console.log("DOM is ready. Initializing Health Metrics Form validation.");

  // --- DOM Element References ---
  const $healthMetricsForm = $("#healthMetricsForm");
  const $stepsInput = $("#stepsInput");
  const $sleepHoursInput = $("#sleepHoursInput");
  const $caloriesInput = $("#caloriesInput");

  // Using Bootstrap's .invalid-feedback for error messages
  const $stepsErrorMessage = $("#stepsErrorMessage");
  const $sleepHoursErrorMessage = $("#sleepHoursErrorMessage");
  const $caloriesErrorMessage = $("#caloriesErrorMessage");
  const $formStatusMessage = $("#formSuccessMessage"); // Renamed for clarity: general form status

  // --- Helper Functions for UI feedback ---

  /**
   * Displays a validation error message for a specific input field.
   * Applies Bootstrap's 'is-invalid' class to the input and sets the text for the feedback div.
   * @param {jQuery} $inputElement - The jQuery object of the input field associated with the error.
   * @param {jQuery} $feedbackElement - The jQuery object representing the Bootstrap invalid-feedback div.
   * @param {string} message - The error message text to show.
   */
  function displayValidationError($inputElement, $feedbackElement, message) {
    $inputElement.addClass("is-invalid"); // Add Bootstrap's invalid class
    $inputElement.removeClass("is-valid"); // Ensure valid class is removed
    $feedbackElement.text(message).show(); // Set and show the error message in the feedback div
  }

  /**
   * Clears a specific validation error message and removes Bootstrap's validation classes.
   * @param {jQuery} $inputElement - The jQuery object of the input field.
   * @param {jQuery} $feedbackElement - The jQuery object representing the Bootstrap invalid-feedback div.
   */
  function clearValidationError($inputElement, $feedbackElement) {
    $inputElement.removeClass("is-invalid").removeClass("is-valid"); // Remove both validation classes
    $feedbackElement.text("").hide(); // Clear and hide the error message
  }

  /**
   * Displays a general status message for the form (success or overall error).
   * @param {string} message - The message text.
   * @param {boolean} isSuccess - True for a success style, false for an error style.
   */
  function displayFormStatusMessage(message, isSuccess) {
    $formStatusMessage.removeClass("success error").text(message).show();
    if (isSuccess) {
      $formStatusMessage.addClass("success");
    } else {
      $formStatusMessage.addClass("error");
    }
    // Small delay to ensure CSS transition has time to apply
    setTimeout(() => $formStatusMessage.css("opacity", "1"), 10);
  }

  /**
   * Clears all individual field error messages and the overall form status message.
   * This function is typically called before a new validation run (e.g., on form submit).
   */
  function clearAllFormMessages() {
    // Clear errors for each input
    clearValidationError($stepsInput, $stepsErrorMessage);
    clearValidationError($sleepHoursInput, $sleepHoursErrorMessage);
    clearValidationError($caloriesInput, $caloriesErrorMessage);
    // Clear general form status message
    $formStatusMessage
      .text("")
      .hide()
      .removeClass("success error")
      .css("opacity", "0");
  }

  // --- Individual Field Validation Functions ---
  // Each function validates a field, updates its UI (valid/invalid state), and returns its validity.

  /**
   * Validates the 'Daily Steps' input field.
   * @returns {boolean} True if the steps input is valid, false otherwise.
   */
  function validateStepsField() {
    const stepsValueRaw = $stepsInput.val().trim();
    const parsedSteps = parseInt(stepsValueRaw, 10);
    let fieldIsValid = true;

    clearValidationError($stepsInput, $stepsErrorMessage); // Always clear previous errors first

    if (stepsValueRaw === "") {
      displayValidationError(
        $stepsInput,
        $stepsErrorMessage,
        "Daily steps are required."
      );
      fieldIsValid = false;
    } else if (isNaN(parsedSteps)) {
      displayValidationError(
        $stepsInput,
        $stepsErrorMessage,
        "Steps must be a valid number."
      );
      fieldIsValid = false;
    } else if (parsedSteps < 0) {
      displayValidationError(
        $stepsInput,
        $stepsErrorMessage,
        "Steps cannot be negative."
      );
      fieldIsValid = false;
    } else if (!Number.isInteger(parsedSteps)) {
      displayValidationError(
        $stepsInput,
        $stepsErrorMessage,
        "Steps must be a whole number (no decimals)."
      );
      fieldIsValid = false;
    } else if (parsedSteps > 150000) {
      displayValidationError(
        $stepsInput,
        $stepsErrorMessage,
        "Daily steps count seems unusually high. Please verify."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $stepsInput.addClass("is-valid"); // Add Bootstrap's valid class
    }
    return fieldIsValid;
  }

  /**
   * Validates the 'Hours of Sleep' input field.
   * @returns {boolean} True if the sleep hours input is valid, false otherwise.
   */
  function validateSleepHoursField() {
    const sleepHoursValueRaw = $sleepHoursInput.val().trim();
    const parsedSleepHours = parseFloat(sleepHoursValueRaw);
    let fieldIsValid = true;

    clearValidationError($sleepHoursInput, $sleepHoursErrorMessage);

    if (sleepHoursValueRaw === "") {
      displayValidationError(
        $sleepHoursInput,
        $sleepHoursErrorMessage,
        "Hours of sleep are required."
      );
      fieldIsValid = false;
    } else if (isNaN(parsedSleepHours)) {
      displayValidationError(
        $sleepHoursInput,
        $sleepHoursErrorMessage,
        "Sleep hours must be a valid number."
      );
      fieldIsValid = false;
    } else if (parsedSleepHours < 0 || parsedSleepHours > 24) {
      displayValidationError(
        $sleepHoursInput,
        $sleepHoursErrorMessage,
        "Sleep hours must be between 0 and 24."
      );
      fieldIsValid = false;
    } else if (parsedSleepHours < 4 || parsedSleepHours > 12) {
      displayValidationError(
        $sleepHoursInput,
        $sleepHoursErrorMessage,
        "Unusual sleep hours. Most adults need 7-9 hours of sleep."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $sleepHoursInput.addClass("is-valid");
    }
    return fieldIsValid;
  }

  /**
   * Validates the 'Calories Consumed' input field.
   * @returns {boolean} True if the calories input is valid, false otherwise.
   */
  function validateCaloriesField() {
    const caloriesValueRaw = $caloriesInput.val().trim();
    const parsedCalories = parseInt(caloriesValueRaw, 10);
    let fieldIsValid = true;

    clearValidationError($caloriesInput, $caloriesErrorMessage);

    if (caloriesValueRaw === "") {
      displayValidationError(
        $caloriesInput,
        $caloriesErrorMessage,
        "Calories consumed are required."
      );
      fieldIsValid = false;
    } else if (isNaN(parsedCalories)) {
      displayValidationError(
        $caloriesInput,
        $caloriesErrorMessage,
        "Calories must be a valid number."
      );
      fieldIsValid = false;
    } else if (parsedCalories < 0) {
      displayValidationError(
        $caloriesInput,
        $caloriesErrorMessage,
        "Calories cannot be negative."
      );
      fieldIsValid = false;
    } else if (!Number.isInteger(parsedCalories)) {
      displayValidationError(
        $caloriesInput,
        $caloriesErrorMessage,
        "Calories must be a whole number (no decimals)."
      );
      fieldIsValid = false;
    } else if (parsedCalories < 500 || parsedCalories > 15000) {
      displayValidationError(
        $caloriesInput,
        $caloriesErrorMessage,
        "Please enter a realistic daily calorie count (e.g., 500-15000)."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $caloriesInput.addClass("is-valid");
    }
    return fieldIsValid;
  }

  // --- Event Listeners ---

  // 1. Form Submission Event
  $healthMetricsForm.on("submit", function (event) {
    console.log("Form submit event triggered.");
    // Prevent the browser's default form submission behavior (page reload)
    event.preventDefault();

    // Clear all previously displayed messages
    clearAllFormMessages();

    // Run all individual field validations and store results
    const areStepsValid = validateStepsField();
    const areSleepHoursValid = validateSleepHoursField();
    const areCaloriesValid = validateCaloriesField();

    console.log("Individual validation results:", {
      areStepsValid,
      areSleepHoursValid,
      areCaloriesValid,
    });

    // Determine the overall validity of the form
    const isFormGloballyValid =
      areStepsValid && areSleepHoursValid && areCaloriesValid;

    console.log("Overall form validity:", isFormGloballyValid);

    if (isFormGloballyValid) {
      // Form is valid: Process the data
      // Retrieve final, validated values directly from the input elements
      const formData = {
        steps: parseInt($stepsInput.val(), 10),
        sleepHours: parseFloat($sleepHoursInput.val()),
        calories: parseInt($caloriesInput.val(), 10),
      };

      console.log("Form is valid. Preparing to submit data:", formData);

      displayFormStatusMessage("Health metrics submitted successfully!", true);
      $healthMetricsForm[0].reset(); // Clears all input fields in the form
      // Also remove 'is-valid' classes for a clean slate
      $healthMetricsForm.find(".is-valid").removeClass("is-valid");
    } else {
      // Form is invalid: errors are already displayed by individual validation functions.
      displayFormStatusMessage(
        "Please correct the highlighted errors before submitting.",
        false
      );
      console.log("Form has validation errors.");
    }
  });

  // 2. Real-time Validation (on blur and input)

  // Validate on blur: when the user moves focus away from the input.
  $stepsInput.on("blur", validateStepsField);
  $sleepHoursInput.on("blur", validateSleepHoursField);
  $caloriesInput.on("blur", validateCaloriesField);

  // Clear error message on input: when the user starts typing/correcting.
  // Also, hide the overall status message, as the form state is no longer final.
  $stepsInput.on("input", function () {
    clearValidationError($stepsInput, $stepsErrorMessage);
    $formStatusMessage.hide().css("opacity", "0");
  });
  $sleepHoursInput.on("input", function () {
    clearValidationError($sleepHoursInput, $sleepHoursErrorMessage);
    $formStatusMessage.hide().css("opacity", "0");
  });
  $caloriesInput.on("input", function () {
    clearValidationError($caloriesInput, $caloriesErrorMessage);
    $formStatusMessage.hide().css("opacity", "0");
  });

  // Optional: Hide general status message if any input field is focused (user wants to make changes)
  $healthMetricsForm.find("input").on("focus", function () {
    $formStatusMessage.hide().css("opacity", "0");
  });
});
