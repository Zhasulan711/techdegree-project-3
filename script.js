/***
 * 3) Job Role Section
 */
$(".other-job-role").hide();
$("#title").on("change", (e) => {
  const selectedValue = $(e.target).val();
  if (selectedValue === "other") {
    $("#other-job-role").show();
  } else {
    $("#other-job-role").hide();
  }
});

/***
 * 4) T-Shirt Info Section
 */
const shirtLabel = $("#shirt-colors label");
const shirtColors = $("#color option");
const theme = $("#color");
const hiddenOption = $("#color option:selected:hidden");
shirtLabel.hide();
shirtColors.hide();
theme.hide();

$("#design").on("change", (e) => {
  const selectedValue = $(e.target).val();
  if (selectedValue === "js puns") {
    shirtColors.slice(4, 7).hide(); // this is link of slice() https://api.jquery.com/slice/
    shirtColors.slice(1, 4).show();
  } else if (selectedValue === "heart js") {
    shirtColors.slice(1, 4).hide();
    shirtColors.slice(4, 7).show();
  }
  shirtLabel.show();
  theme.show();
  // change when changing the subject to the main text
  hiddenOption.val();
  // hiddenOption.show();
});

/***
 * 5) Activities Section
 */
/***
 * EXTRA CREDIT 1) Conflicting Activity Times
 */

const activities = $("#activities input[type='checkbox']");
const activitiesCost = $("#activities-cost");

$(".activities").on("change", "input[type='checkbox']", (e) => {
  const selectedCheckbox = $(e.target);
  const selectedTime = selectedCheckbox.attr("data-day-and-time");

  let totalCost = 0;
  activities.each((index, element) => {
    const checkbox = $(element);
    const checkboxTime = checkbox.attr("data-day-and-time");

    if (selectedTime === checkboxTime && selectedCheckbox !== checkbox) {
      // If the selected activity conflicts with another, disable the conflicting one
      if (selectedCheckbox.prop("checked")) {
        checkbox.prop("disabled", true);
        checkbox.parent().attr("class", "disabled");
      } else {
        checkbox.prop("disabled", false);
        checkbox.parent().attr("class", "");
      }
    }

    if (checkbox.prop("checked")) {
      totalCost += parseInt(checkbox.attr("data-cost"));
    }
  });

  activitiesCost.text("Total: $" + totalCost);
});

/***
 * 6) Payment Info Section
 */
const payment = $("#payment");
const paymentOption = $("#payment option");
paymentOption.slice(1).show();
$("#paypal").hide();
$("#bitcoin").hide();
payment.on("change", (e) => {
  const selectedValue = $(e.target).val();
  if (selectedValue === "paypal") {
    $("#credit-card").hide();
    $("#paypal").show();
    $("#bitcoin").hide();
  } else if (selectedValue === "bitcoin") {
    $("#credit-card").hide();
    $("#bitcoin").show();
    $("#paypal").hide();
  } else {
    $("#credit-card").show();
    $("#paypal").hide();
    $("#bitcoin").hide();
  }
});

/***
 * 7) Form validation same as - 9) Visual Validation Errors same as - Extra Credit 2)Real-Time Error Messages
 */
const usernameInput = $("#name");
const emailInput = $("#email");
const cardNumberInput = $("#cc-num");
const zipCodeInput = $("#zip");
const ccvInput = $("#cvv");

// SET UP EVENTS
function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

function createListener(validator) {
  return (e) => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);
    if (!valid) {
      $(e.target).addClass("error-highlight");
      $(e.target).removeClass("normal-highlight");
    } else {
      $(e.target).addClass("normal-highlight");
      $(e.target).removeClass("error-highlight");
    }
  };
}

// Validators
//
function isValidUsername(username) {
  return /^\w+$/.test(username);
}
// Must be a valid email address
function isValidEmail(email) {
  return /^[0-9a-z]{5,13}\@\w*\.[a-z]{3}$/.test(email);
}
// Must contain a 13 or 16 numbers
function isValidCardNumber(cardNumber) {
  return /^\d{13}(\d\d\d)?$/.test(cardNumber);
}
// Must contain a 5 number
function isValidZipCode(zipCode) {
  return /^\d{5}$/.test(zipCode);
}
// Must contain a 3 numbers
function isValidCCV(ccv) {
  return /^\d{3}$/.test(ccv);
}

usernameInput.on("input", createListener(isValidUsername));

emailInput.on("input", createListener(isValidEmail));

cardNumberInput.on("input", createListener(isValidCardNumber));

zipCodeInput.on("input", createListener(isValidZipCode));

ccvInput.on("input", createListener(isValidCCV));

// emailInput.on("input", createListener(validateEmail));

// showOrHideTip(!isValidEmail(emailInput.val()), $("#email-format-hint")[0]);

function validateForm() {
  // Validate each required field
  const isNameValid = isValidUsername(usernameInput.val());
  const isEmailValid = isValidEmail(emailInput.val());
  const isCardNumberValid = isValidCardNumber(cardNumberInput.val());
  const isZipCodeValid = isValidZipCode(zipCodeInput.val());
  const isCCVValid = isValidCCV(ccvInput.val());
  const isActivitySelected =
    $("#activities input[type='checkbox']:checked").length > 0;
  // If credit card is selected, validate credit card details
  const paymentMethod = $("#payment").val();
  let isPaymentValid = true;
  if (paymentMethod === "credit-card") {
    const isCardNumberValid = isValidCardNumber(cardNumberInput.val());
    const isZipCodeValid = isValidZipCode(zipCodeInput.val());
    const isCcvValid = isValidCCV(ccvInput.val());
    isPaymentValid = isCardNumberValid && isZipCodeValid && isCcvValid;
  }

  // Show/hide validation tips
  showOrHideTip(!isNameValid, $("#name-hint")[0]);
  showOrHideTip(!isEmailValid, $("#email-format-hint")[0]);
  showOrHideTip(!isCardNumberValid, $("#cc-hint")[0]);
  showOrHideTip(!isZipCodeValid, $("#zip-hint")[0]);
  showOrHideTip(!isCCVValid, $("#cvv-hint")[0]);
  showOrHideTip(!isActivitySelected, $("#activities-hint")[0]);
  $("#name, #email, #activities-box, #cc-num, #zip, #cvv").removeClass(
    "error-highlight normal-highlight"
  );
  if (!isNameValid) {
    $("#name").addClass("error-highlight");
    $(".redError1").addClass("redError");
    $("#name").addClass("error-border");
    $(".redError1 .fa-circle-exclamation").css("visibility", "visible");
    $(".redError1 .fa-circle-check").css("visibility", "hidden");
  } else {
    $("#name").addClass("normal-highlight");
    $(".redError1").removeClass("redError");
    $("#name").removeClass("error-border");
    $(".redError1 .fa-circle-exclamation").css("visibility", "hidden");
    $(".redError1 .fa-circle-check").css("visibility", "visible");
  }

  if (!isEmailValid) {
    $("#email").addClass("error-highlight");
    $(".redError2").addClass("redError");
    $("#email").addClass("error-border");
    $(".redError2 .fa-circle-exclamation").css("visibility", "visible");
    $(".redError2 .fa-circle-check").css("visibility", "hidden");
  } else {
    $("#email").addClass("normal-highlight");
    $(".redError2").removeClass("redError");
    $("#email").removeClass("error-border");
    $(".redError2 .fa-circle-exclamation").css("visibility", "hidden");
    $(".redError2 .fa-circle-check").css("visibility", "visible");
  }

  if (!isActivitySelected) {
    $("#activities-box").addClass("error-highlight");
    $(".redError3").addClass("redError");
    $("#activities-box").addClass("error-border");
    $(".redError3 .fa-circle-exclamation").css("visibility", "visible");
    $(".redError3 .fa-circle-check").css("visibility", "hidden");
  } else {
    $("#activities-box").addClass("normal-highlight");
    $(".redError3").removeClass("redError");
    $("#activities-box").removeClass("error-border");
    $(".redError3 .fa-circle-exclamation").css("visibility", "hidden");
    $(".redError3 .fa-circle-check").css("visibility", "visible");
  }

  if (!isCardNumberValid) {
    $("#cc-num").addClass("error-highlight");
    $(".redError4").addClass("redError");
    $("#cc-num").addClass("error-border");
    $(".redError4 .fa-circle-exclamation").css("visibility", "visible");
    $(".redError4 .fa-circle-check").css("visibility", "hidden");
  } else {
    $("#cc-num").addClass("normal-highlight");
    $(".redError4").removeClass("redError");
    $("#cc-num").removeClass("error-border");
    $(".redError4 .fa-circle-exclamation").css("visibility", "hidden");
    $(".redError4 .fa-circle-check").css("visibility", "visible");
  }

  if (!isZipCodeValid) {
    $("#zip").addClass("error-highlight");
    $(".redError5").addClass("redError");
    $("#zip").addClass("error-border");
    $(".redError5 .fa-circle-exclamation").css("visibility", "visible");
    $(".redError5 .fa-circle-check").css("visibility", "hidden");
  } else {
    $("#zip").addClass("normal-highlight");
    $(".redError5").removeClass("redError");
    $("#zip").removeClass("error-border");
    $(".redError5 .fa-circle-exclamation").css("visibility", "hidden");
    $(".redError5 .fa-circle-check").css("visibility", "visible");
  }

  if (!isCCVValid) {
    $("#cvv").addClass("error-highlight");
    $(".redError6").addClass("redError");
    $("#cvv").addClass("error-border");
    $(".redError6 .fa-circle-exclamation").css("visibility", "visible");
    $(".redError6 .fa-circle-check").css("visibility", "hidden");
  } else {
    $("#cvv").addClass("normal-highlight");
    $(".redError6").removeClass("redError");
    $("#cvv").removeClass("error-border");
    $(".redError6 .fa-circle-exclamation").css("visibility", "hidden");
    $(".redError6 .fa-circle-check").css("visibility", "visible");
  }
  // Prevent form submission if any of the fields are invalid
  if (!isNameValid || !isEmailValid || !isActivitySelected || !isPaymentValid) {
    return false;
  }
  return true;
}

//create a message in the end
let hintAdded = false;
$("form").on("submit", (e) => {
  if (!validateForm()) {
    e.preventDefault(); // Prevent form submission if validation fails
    if (!hintAdded) {
      const $html =
        '<p id="allActivities-hint" class="allActivities-hint">Please pay attention to each field</p>';
      $(".payment-methods").after($html);
      hintAdded = true; // Устанавливаем флаг в true, чтобы пометить, что подсказка была добавлена
    }
  }
  validateEmail();
  validateName();
});

/***
 * 8) The Activities Section
 */
const activityCheckboxes = $('.activities input[type="checkbox"]');

activityCheckboxes.each((index, checkbox) => {
  $(checkbox).on("focus", (e) => {
    $(e.target).parent().attr("class", "focus");
  });
  $(checkbox).on("blur", (e) => {
    $(e.target).parent().attr("class", "");
  });
});

/***
 * 9) Visual Validation Errors same as- 7) Form validation and same as - Extra Credit 2)Real-Time Error Messages
 */

/***
 * EXTRA CREDITE 3) Conditional Error Message
 */

function validateEmail() {
  const emailField = $("#email"); // input
  const emailFormatHint = $("#email-hint"); //span2
  const emailValue = emailField.val().trim();

  if (emailValue === "") {
    emailFormatHint.show();
  } else if (!isValidEmail(emailValue)) {
    emailFormatHint.show();
  } else {
    emailFormatHint.hide();
  }
}
// When empty send error
function validateName() {
  const nameError = $("#name-hint");
  const nameInput1 = $("#name").val().trim();
  if (nameInput1 === "") {
    nameError.show();
  } else {
    nameError.hide();
  }
}

// Call the validateName() function once on page load
validateName();

// Add an input event handler for the named field
$("#name").on("input", validateName);
