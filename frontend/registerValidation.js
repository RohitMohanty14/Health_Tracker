$(document).ready(function () {
  // --- DOM Element References ---
  const $registerForm = $("#registerForm");
  const $fullNameInput = $("#fullNameInput");
  const $regEmailInput = $("#regEmailInput");
  const $regPasswordInput = $("#regPasswordInput");
  const $confirmPasswordInput = $("#confirmPasswordInput");
  const $termsCheckbox = $("#termsCheckbox");

  const $fullNameErrorMessage = $("#fullNameErrorMessage");
  const $regEmailErrorMessage = $("#regEmailErrorMessage");
  const $regPasswordErrorMessage = $("#regPasswordErrorMessage");
  const $confirmPasswordErrorMessage = $("#confirmPasswordErrorMessage");
  const $termsErrorMessage = $("#termsErrorMessage");
  const $registerStatusMessage = $("#registerStatusMessage"); // General message area

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
    $inputElement.addClass("is-invalid");
  }

  /**
   * Clears a specific validation error message and removes 'is-invalid' class.
   * @param {jQuery} $inputElement - The jQuery object of the input field.
   * @param {jQuery} $errorElement - The jQuery object of the span element for the error message.
   */
  function clearValidationError($inputElement, $errorElement) {
    $errorElement.text("").hide();
    $inputElement.removeClass("is-invalid").removeClass("is-valid");
  }

  /**
   * Displays a general status message (success or error) for the form.
   * @param {string} message - The message text.
   * @param {boolean} isSuccess - True for success, false for error.
   */
  function displayStatusMessage(message, isSuccess) {
    $registerStatusMessage.removeClass("success error").text(message).show();
    if (isSuccess) {
      $registerStatusMessage.addClass("success");
    } else {
      $registerStatusMessage.addClass("error");
    }
  }

  /**
   * Clears all error messages and the general status message on the form.
   */
  function clearAllFormMessages() {
    clearValidationError($fullNameInput, $fullNameErrorMessage);
    clearValidationError($regEmailInput, $regEmailErrorMessage);
    clearValidationError($regPasswordInput, $regPasswordErrorMessage);
    clearValidationError($confirmPasswordInput, $confirmPasswordErrorMessage);
    $termsErrorMessage.text("").hide(); // No input element for terms checkbox error
    $termsCheckbox.removeClass("is-invalid"); // Manually remove invalid class for checkbox if needed
    $registerStatusMessage.text("").hide();
  }

  // --- Individual Field Validation Functions ---

  /**
   * Validates the full name input field.
   * @returns {boolean} True if full name is valid, false otherwise.
   */
  function validateFullNameField() {
    const fullNameValue = $fullNameInput.val().trim();
    let fieldIsValid = true;
    clearValidationError($fullNameInput, $fullNameErrorMessage);

    if (fullNameValue === "") {
      displayValidationError(
        $fullNameInput,
        $fullNameErrorMessage,
        "Full name is required."
      );
      fieldIsValid = false;
    } else if (fullNameValue.length < 2) {
      displayValidationError(
        $fullNameInput,
        $fullNameErrorMessage,
        "Full name must be at least 2 characters long."
      );
      fieldIsValid = false;
    } else if (!/^[a-zA-Z\s.-]+$/.test(fullNameValue)) {
      // Allows letters, spaces, hyphens, periods
      displayValidationError(
        $fullNameInput,
        $fullNameErrorMessage,
        "Full name can only contain letters, spaces, hyphens, and periods."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $fullNameInput.addClass("is-valid");
    }
    return fieldIsValid;
  }

  /**
   * Validates the registration email input field.
   * @returns {boolean} True if email is valid, false otherwise.
   */
  function validateRegEmailField() {
    const emailValue = $regEmailInput.val().trim();
    let fieldIsValid = true;
    clearValidationError($regEmailInput, $regEmailErrorMessage);

    if (emailValue === "") {
      displayValidationError(
        $regEmailInput,
        $regEmailErrorMessage,
        "Email address is required."
      );
      fieldIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      displayValidationError(
        $regEmailInput,
        $regEmailErrorMessage,
        "Please enter a valid email address."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $regEmailInput.addClass("is-valid");
    }
    return fieldIsValid;
  }

  /**
   * Validates the registration password input field for strength.
   * @returns {boolean} True if password is valid, false otherwise.
   */
  function validateRegPasswordField() {
    const passwordValue = $regPasswordInput.val(); // Do not trim password
    let fieldIsValid = true;
    clearValidationError($regPasswordInput, $regPasswordErrorMessage);

    // Strong password regex: at least 8 characters, one uppercase, one lowercase, one number, one special character
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?~\\-]).{8,}$/;

    if (passwordValue === "") {
      displayValidationError(
        $regPasswordInput,
        $regPasswordErrorMessage,
        "Password is required."
      );
      fieldIsValid = false;
    } else if (passwordValue.length < 8) {
      displayValidationError(
        $regPasswordInput,
        $regPasswordErrorMessage,
        "Password must be at least 8 characters long."
      );
      fieldIsValid = false;
    } else if (!strongPasswordRegex.test(passwordValue)) {
      displayValidationError(
        $regPasswordInput,
        $regPasswordErrorMessage,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $regPasswordInput.addClass("is-valid");
    }
    return fieldIsValid;
  }

  /**
   * Validates the confirm password input field, ensuring it matches the main password.
   * @returns {boolean} True if confirm password is valid, false otherwise.
   */
  function validateConfirmPasswordField() {
    const passwordValue = $regPasswordInput.val();
    const confirmPasswordValue = $confirmPasswordInput.val();
    let fieldIsValid = true;
    clearValidationError($confirmPasswordInput, $confirmPasswordErrorMessage);

    if (confirmPasswordValue === "") {
      displayValidationError(
        $confirmPasswordInput,
        $confirmPasswordErrorMessage,
        "Please confirm your password."
      );
      fieldIsValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
      displayValidationError(
        $confirmPasswordInput,
        $confirmPasswordErrorMessage,
        "Passwords do not match."
      );
      fieldIsValid = false;
    }

    if (fieldIsValid) {
      $confirmPasswordInput.addClass("is-valid");
    }
    return fieldIsValid;
  }

  /**
   * Validates the terms and conditions checkbox.
   * @returns {boolean} True if checkbox is checked, false otherwise.
   */
  function validateTermsCheckbox() {
    let fieldIsValid = true;
    $termsErrorMessage.text("").hide(); // Clear previous error

    if (!$termsCheckbox.is(":checked")) {
      $termsErrorMessage
        .text("You must agree to the terms & conditions.")
        .show();
      $termsCheckbox.addClass("is-invalid"); // Add invalid class to checkbox itself
      fieldIsValid = false;
    } else {
      $termsCheckbox.removeClass("is-invalid");
    }
    return fieldIsValid;
  }

  // --- Event Listeners ---

  // 1. Form Submission Event Listener
  $registerForm.on("submit", function (event) {
    // Prevent default browser form submission
    event.preventDefault();

    // Clear all previously displayed messages
    clearAllFormMessages();

    // Run all individual field validations
    const isFullNameValid = validateFullNameField();
    const isRegEmailValid = validateRegEmailField();
    const isRegPasswordValid = validateRegPasswordField();
    const isConfirmPasswordValid = validateConfirmPasswordField();
    const areTermsAccepted = validateTermsCheckbox();

    // Determine overall form validity
    const isFormGloballyValid =
      isFullNameValid &&
      isRegEmailValid &&
      isRegPasswordValid &&
      isConfirmPasswordValid &&
      areTermsAccepted;

    if (isFormGloballyValid) {
      const registrationData = {
        fullName: $fullNameInput.val().trim(),
        email: $regEmailInput.val().trim(),
        password: $regPasswordInput.val(), // Send password as is
        // Note: confirmPassword is not typically sent to the server
      };

      console.log(
        "Registration form is valid. Attempting registration with:",
        registrationData
      );

      displayStatusMessage(
        "Registration successful! Redirecting to login...",
        true
      );
      setTimeout(() => {
        window.location.href = "login.html"; // Simulate redirect
      }, 1500);
    } else {
      // Form is invalid, errors are already displayed.
      displayStatusMessage("Please correct the highlighted errors.", false);
      console.log("Registration form has validation errors.");
    }
  });

  $fullNameInput.on("blur", validateFullNameField).on("input", function () {
    clearValidationError($fullNameInput, $fullNameErrorMessage);
    $registerStatusMessage.hide();
  });

  $regEmailInput.on("blur", validateRegEmailField).on("input", function () {
    clearValidationError($regEmailInput, $regEmailErrorMessage);
    $registerStatusMessage.hide();
  });

  $regPasswordInput
    .on("blur", validateRegPasswordField)
    .on("input", function () {
      clearValidationError($regPasswordInput, $regPasswordErrorMessage);
      // Also re-validate confirm password if main password changes, as it might invalidate it.
      validateConfirmPasswordField();
      $registerStatusMessage.hide();
    });

  $confirmPasswordInput
    .on("blur", validateConfirmPasswordField)
    .on("input", function () {
      clearValidationError($confirmPasswordInput, $confirmPasswordErrorMessage);
      $registerStatusMessage.hide();
    });

  $termsCheckbox.on("change", function () {
    validateTermsCheckbox(); // Validate immediately on change
    $registerStatusMessage.hide();
  });

  // Hide general status message when any form input gains focus
  $registerForm.find("input, select, textarea").on("focus", function () {
    $registerStatusMessage.hide();
  });
});
