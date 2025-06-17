$(document).ready(function () {
  // --- DOM Element References ---
  // Using $ prefix for jQuery objects is a common convention
  const $loginForm = $("#loginForm");
  const $emailInput = $("#emailInput");
  const $passwordInput = $("#passwordInput");

  const $emailErrorMessage = $("#emailErrorMessage");
  const $passwordErrorMessage = $("#passwordErrorMessage");
  const $loginStatusMessage = $("#loginStatusMessage"); // General message area

  // --- Helper Functions ---

  /**
   * Displays a validation error message for a specific input field.
   * Applies Bootstrap's 'is-invalid' class for visual feedback.
   * @param {jQuery} $inputElement - The jQuery object of the input field.
   * @param {jQuery} $errorElement - The jQuery object of the span element for the error message.
   * @param {string} message - The error message text.
   */
  function displayValidationError($inputElement, $errorElement, message) {
    $errorElement.text(message).show();
    $inputElement.addClass("is-invalid"); // Add Bootstrap's invalid class
  }

  /**
   * Clears a specific validation error message and removes 'is-invalid' class.
   * @param {jQuery} $inputElement - The jQuery object of the input field.
   * @param {jQuery} $errorElement - The jQuery object of the span element for the error message.
   */
  function clearValidationError($inputElement, $errorElement) {
    $errorElement.text("").hide();
    $inputElement.removeClass("is-invalid").removeClass("is-valid"); // Also remove valid in case it was there
  }

  /**
   * Displays a general status message (success or error) for the form.
   * @param {string} message - The message text.
   * @param {boolean} isSuccess - True for success, false for error.
   */
  function displayStatusMessage(message, isSuccess) {
    $loginStatusMessage.removeClass("success error").text(message).show();
    if (isSuccess) {
      $loginStatusMessage.addClass("success");
    } else {
      $loginStatusMessage.addClass("error");
    }
  }

  /**
   * Clears all error messages and the general status message on the form.
   */
  function clearAllFormMessages() {
    clearValidationError($emailInput, $emailErrorMessage);
    clearValidationError($passwordInput, $passwordErrorMessage);
    $loginStatusMessage.text("").hide(); // Clear and hide the status message
  }

  // --- Individual Field Validation Functions ---

  /**
   * Validates the email input field.
   * @returns {boolean} True if email is valid, false otherwise.
   */
  function validateEmailField() {
    const emailValue = $emailInput.val().trim();
    let fieldIsValid = true;

    clearValidationError($emailInput, $emailErrorMessage); // Clear previous errors

    if (emailValue === "") {
      displayValidationError(
        $emailInput,
        $emailErrorMessage,
        "Email address is required."
      );
      fieldIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      // Basic email regex
      displayValidationError(
        $emailInput,
        $emailErrorMessage,
        "Please enter a valid email address."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $emailInput.addClass("is-valid"); // Add Bootstrap's valid class
    }
    return fieldIsValid;
  }

  /**
   * Validates the password input field.
   * @returns {boolean} True if password is valid, false otherwise.
   */
  function validatePasswordField() {
    const passwordValue = $passwordInput.val(); // Do not trim password to allow leading/trailing spaces if allowed by policy
    let fieldIsValid = true;

    clearValidationError($passwordInput, $passwordErrorMessage); // Clear previous errors

    if (passwordValue === "") {
      displayValidationError(
        $passwordInput,
        $passwordErrorMessage,
        "Password is required."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $passwordInput.addClass("is-valid"); // Add Bootstrap's valid class
    }
    return fieldIsValid;
  }

  // --- Event Listeners ---

  // 1. Form Submission Event Listener
  $loginForm.on("submit", function (event) {
    // Prevent default browser form submission (page reload)
    event.preventDefault();

    // Clear all previously displayed messages
    clearAllFormMessages();

    // Run all individual field validations
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePasswordField();

    // Determine overall form validity
    const isFormGloballyValid = isEmailValid && isPasswordValid;

    if (isFormGloballyValid) {
      const loginData = {
        email: $emailInput.val().trim(),
        password: $passwordInput.val(), // Send password as is, trimming not recommended here
        rememberMe: $("#rememberMe").is(":checked"), // Check if checkbox is checked
      };

      console.log("Login form is valid. Attempting login with:", loginData);

      // --- DEMO SCENARIO: Simulate Success ---
      displayStatusMessage("Login successful! Redirecting...", true);
      setTimeout(() => {
        window.location.href = "index.html"; // Simulate redirect
      }, 1000);
    } else {
      // Form is invalid, errors are already displayed by individual validation functions.
      displayStatusMessage("Please correct the highlighted errors.", false);
      console.log("Login form has validation errors.");
    }
  });

  // 2. Real-time Validation (on blur and input)
  // Provides immediate feedback as the user interacts with fields.

  // Validate email on blur
  $emailInput.on("blur", validateEmailField);
  // Clear email error message as user types
  $emailInput.on("input", function () {
    clearValidationError($emailInput, $emailErrorMessage);
    $loginStatusMessage.hide(); // Hide general message on input
  });

  // Validate password on blur
  $passwordInput.on("blur", validatePasswordField);
  // Clear password error message as user types
  $passwordInput.on("input", function () {
    clearValidationError($passwordInput, $passwordErrorMessage);
    $loginStatusMessage.hide(); // Hide general message on input
  });

  // Hide general status message when any form input gains focus
  $loginForm.find("input").on("focus", function () {
    $loginStatusMessage.hide();
  });
});
