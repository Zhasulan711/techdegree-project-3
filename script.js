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
  theme.val("Select a design theme above");
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
paymentOption.slice(0).hide();
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
 * 7) Form validation same as - 9) Visual Validation Errors same as - Extra Credit 2)Real-Time Error Messages same as - EXTRA CREDITE 3) Conditional Error Message
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
    $(element).show();
  } else {
    $(element).hide();
  }
}

function createListener(validator) {
  return (e) => {
    const text = $(e.target).val();
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = $(e.target).next();
    showOrHideTip(showTip, tooltip);
    if (!valid) {
      $(e.target).addClass("error");
    } else {
      $(e.target).removeClass("error");
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

$(
  "#name, #email, #activities-box, #exp-month, #exp-year, #cc-num, #zip, #cvv"
).removeClass("error-border");
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
  showOrHideTip(!isEmailValid, $("#email-hint")[0]);
  showOrHideTip(!isCardNumberValid, $("#cc-hint")[0]);
  showOrHideTip(!isZipCodeValid, $("#zip-hint")[0]);
  showOrHideTip(!isCCVValid, $("#cvv-hint")[0]);
  showOrHideTip(!isActivitySelected, $("#activities-hint")[0]);

  selectedValueMonth = $("#exp-month").val();
  if (selectedValueMonth === "Select Date") {
    $("#exp-month").addClass("error");
    $("#exp-month").addClass("error-border");
    $("#exp-month").prev().addClass("not-valid");
    $("#exp-month").prev().removeClass("valid");
  } else {
    $("#exp-month").removeClass("error");
    $("#exp-month").removeClass("error-border");
    $("#exp-month").prev().removeClass("not-valid");
    $("#exp-month").prev().addClass("valid");
  }

  selectedValueYear = $("#exp-year").val();
  if (selectedValueYear === "Select Year") {
    $("#exp-year").addClass("error");
    $("#exp-year").addClass("error-border");
    $("#exp-year").prev().addClass("not-valid");
    $("#exp-year").prev().removeClass("valid");
  } else {
    $("#exp-year").removeClass("error");
    $("#exp-year").removeClass("error-border");
    $("#exp-year").prev().removeClass("not-valid");
    $("#exp-year").prev().addClass("valid");
  }

  if (!isNameValid) {
    $("#name").addClass("error");
    $("#name").addClass("error-border");
    $("#name").parent().addClass("not-valid");
    $("#name").parent().removeClass("valid");
  } else {
    $("#name").removeClass("error");
    $("#name").removeClass("error-border");
    $("#name").parent().removeClass("not-valid");
    $("#name").parent().addClass("valid");
  }

  if (!isEmailValid) {
    $("#email").addClass("error");
    $("#email").addClass("error-border");
    $("#email").parent().addClass("not-valid");
    $("#email").parent().removeClass("valid");
  } else {
    $("#email").removeClass("error");
    $("#email").removeClass("error-border");
    $("#email").parent().removeClass("not-valid");
    $("#email").parent().addClass("valid");
  }

  if (!isActivitySelected) {
    $("#activities-box").addClass("error");
    $("#activities-box").addClass("error-border");
    $("#activities-box").parent().addClass("not-valid");
    $("#activities-box").parent().removeClass("valid");
  } else {
    $("#activities-box").removeClass("error");
    $("#activities-box").removeClass("error-border");
    $("#activities-box").parent().removeClass("not-valid");
    $("#activities-box").parent().addClass("valid");
  }

  if (!isCardNumberValid) {
    $("#cc-num").addClass("error");
    $("#cc-num").addClass("error-border");
    $("#cc-num").parent().addClass("not-valid");
    $("#cc-num").parent().removeClass("valid");
  } else {
    $("#cc-num").removeClass("error");
    $("#cc-num").removeClass("error-border");
    $("#cc-num").parent().removeClass("not-valid");
    $("#cc-num").parent().addClass("valid");
  }

  if (!isZipCodeValid) {
    $("#zip").addClass("error");
    $("#zip").addClass("error-border");
    $("#zip").parent().addClass("not-valid");
    $("#zip").parent().removeClass("valid");
  } else {
    $("#zip").removeClass("error");
    $("#zip").removeClass("error-border");
    $("#zip").parent().removeClass("not-valid");
    $("#zip").parent().addClass("valid");
  }

  if (!isCCVValid) {
    $("#cvv").addClass("error");
    $("#cvv").addClass("error-border");
    $("#cvv").parent().addClass("not-valid");
    $("#cvv").parent().removeClass("valid");
  } else {
    $("#cvv").removeClass("error");
    $("#cvv").removeClass("error-border");
    $("#cvv").parent().removeClass("not-valid");
    $("#cvv").parent().addClass("valid");
  }
  // Prevent form submission if any of the fields are invalid
  if (!isNameValid || !isEmailValid || !isActivitySelected || !isPaymentValid) {
    return false;
  }
  return true;
}

// FORM TO SUBMIT
$("form").on("submit", (e) => {
  if (!validateForm()) {
    e.preventDefault(); // Prevent form submission if validation fails
  }
});

// /***
//  * 8) The Activities Section
//  */
const activityCheckboxes = $('.activities input[type="checkbox"]');

activityCheckboxes.each((index, checkbox) => {
  $(checkbox).on("focus", (e) => {
    $(e.target).parent().attr("class", "focus");
  });
  $(checkbox).on("blur", (e) => {
    $(e.target).parent().attr("class", "");
  });
});
