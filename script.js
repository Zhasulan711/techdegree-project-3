


 


//global variable
let name_hint = document.getElementById('name-hint');
let email_hint = document.getElementById('email-hint');
let credit_card_hint = document.getElementById('cc-hint');
let zip_code_hint = document.getElementById('zip-hint');
let three_digit= document.getElementById('cvv-hint');



//var inputNameValueParent = inputNameValue.parentNode;










//get the value of the input element 
var inputElement = document.getElementById('name');

// create function for the focus state
function focusOnFirstForm(){
    var inputName = document.getElementById('name').focus();

}
focusOnFirstForm();
//When page load  passing the fucntionon document load 
window.onload = function (){
  return  focusOnFirstForm()

}
//This will select the Select element in option section
var jobRole = document.getElementById("title");

//add an eventListener to jobRole then show other job role
jobRole.addEventListener("change", (e) => {
    //var jobRoleValue = e.target.value;
    var otherJobRole = document.querySelector("#title option[value='other']");
    if(otherJobRole.selected===true){
       return secondJobRole.style.display="block";
    } else{
        return secondJobRole.style.display="none";
    }

});


/***Select the other job role so we can hide***/
var secondJobRole = document.getElementById('other-job-role');
var secondJobRoleValue = document.getElementById('other-job-role').value;
// creating function to hide other-job-role

var hideOtherJobByDefault = function(){
  return secondJobRole.style.display='none';

};
hideOtherJobByDefault();

 let colorMenu = document.getElementById('color');


var hideColorMenuByDefault = function(){
  return colorMenu.setAttribute('disabled', true);
};
hideColorMenuByDefault();
 
//let's create function to loop over color menus then clear out the last previous color on the form based on it index

var loopOverOptions = document.querySelectorAll('[data-theme]');
console.log(loopOverOptions);

//reference to the color section
 var designTheme = document.getElementById('design');//this will grab the design to be manipulate later.
 //console.log(designTheme);
let designThemeValue =document.getElementById('design').value;
console.log(designThemeValue);

 colorMenu.disabled = true;
 
 //EventListener to designTheme
 designTheme.addEventListener('change', (e) =>{
   colorMenu.disabled = false;
   
   //console.log('Selected Design: ', designTheme.value);
   loopOverOptions.forEach(option => {
    
      var loopValue = e.target.value;
      console.log('here is the value ', loopValue);
      dataTheme = option.getAttribute('data-theme');
      //console.log('Color Options Theme: ', dataTheme);
      if( loopValue === dataTheme){
       
          option.style.display= '';
         loopValue.hidden ='true';
         
       // option.style.display = clearOutPreviousColor();
      }else{
        option.style.display ='none';
        colorMenu.disabled = false;
      }
      if(loopValue === 'js puns'){
        loopOverOptions[0].selected = true;
      } else {
        loopOverOptions[4].selected = true;
      }
        
      
   })
  
});

 //Register for activities section
 // reference to legend in fieldset
const legendActivities = document.querySelector("#activities legend");
 console.log(legendActivities);
 //total p cost
 let p = document.getElementById("activities-cost");
 console.log(p);
 // total cost of activity
let initialCost = 0;
let activity = document.getElementById('activities');
//event handler on change 
activity.addEventListener('change', (e) => {
  
  
  let currentElementAffected = parseInt(e.target.getAttribute(["data-cost"]))
  console.log(currentElementAffected);
  //condition to check and check 
  if (e.target.checked == true){
    initialCost += currentElementAffected;
  } else if (e.target.checked == false){

    initialCost -= currentElementAffected;
  }
  p.innerHTML =`Total:$${initialCost}`;
});
let creditCard = document.getElementById('credit-card');

let paypal = document.getElementById('paypal');

let bitcoin = document.getElementById('bitcoin');

let paymentMethod = document.getElementById('payment');
//when windows load display the payment method to credit-card


window.onload = function() {
 
  
  paypal.setAttribute('hidden', true);
  
bitcoin.setAttribute('hidden', true);
  
  let paymentDisplayMethod = document.querySelector("#payment option[value= 'select method']").innerHTML='Credit Card';
  
  

  //paymentDisplayMethod.innerHTML= 'Credit Card';
  
};


// function to handle apyment method
function handlePaymentMethod(event){
  let  paymentSelected= event.target.value;
  //display and hide other payment based on user's input
  if(paymentSelected=== 'credit-card'){
    creditCard.style.display='block';
    paypal.style.display='none';
    bitcoin.style.display='none';
 
  }else if(paymentSelected=== 'paypal'){
    paypal.style.display = 'block';
    creditCard.style.display = 'none';
    bitcoin.style.display = 'none';
  } else if(paymentSelected === 'bitcoin'){
    bitcoin.style.display = 'block';
    creditCard.style.display = 'none';
    paypal.style.display = 'none';
  }
 
}
document.addEventListener('change', handlePaymentMethod);
// create function for nameInput validation
function validateName() {
  let name_hint = document.getElementById('name-hint');
  const inputNameValue = document.getElementById("name").value;
  const nameRegex = /^[a-zA-Z\s]+$/;
  const isNameValid = nameRegex.test(inputNameValue);
  const labelName = document.querySelector('label[for="name"]');

  if (!isNameValid) {
    
    labelName.classList.add("not-valid");
    labelName.classList.remove("valid");
    labelName.lastElementChild.style.display = "block";
  } else {
   
    labelName.classList.add("valid");
    labelName.classList.remove("not-valid");
    labelName.lastElementChild.style.display = "none";
  }

  return isNameValid;
}

// Function to validate the email field
function validateEmail() {
  const inputEmailValue = document.getElementById("email").value;
  const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  const isEmailValid = emailRegex.test(inputEmailValue);
  const labelEmail = document.querySelector('label[for="email"]');

  if (!isEmailValid) {
    labelEmail.classList.add("not-valid");
    labelEmail.classList.remove("valid");
    labelEmail.lastElementChild.style.display = "block";
  } else {
    labelEmail.classList.add("valid");
    labelEmail.classList.remove("not-valid");
    labelEmail.lastElementChild.style.display = "none";
  }

  return isEmailValid;
}

// Function to validate the credit card field
function validateCreditCard() {
  const creditCardValue = document.getElementById("cc-num").value;
  const cardRegex = /^\d{13,16}$/;
  const isCardValid = cardRegex.test(creditCardValue);
  const labelCCNumber = document.querySelector('label[for="cc-num"]');

  if (!isCardValid) {
    labelCCNumber.classList.add("not-valid");
    labelCCNumber.classList.remove("valid");
    labelCCNumber.lastElementChild.style.display = "block";
  } else {
    labelCCNumber.classList.add("valid");
    labelCCNumber.classList.remove("not-valid");
    labelCCNumber.lastElementChild.style.display = "none";
  }

  return isCardValid;
}
function validateZip() {
  const zipValue = document.getElementById("zip").value;
  const zipRegex = /^\d{5}$/;
  const isZipValid = zipRegex.test(zipValue);
  const labelZip = document.querySelector('label[for="zip"]');

  if (!isZipValid) {
    labelZip.classList.add("not-valid");
    labelZip.classList.remove("valid");
    labelZip.lastElementChild.style.display = "block";
  } else {
    labelZip.classList.add("valid");
    labelZip.classList.remove("not-valid");
    labelZip.lastElementChild.style.display = "none";
  }

  return isZipValid;
}
// Function to validate the CVV field
function validateCVV() {
  const cvvValue = document.getElementById("cvv").value;
  const cvvRegex = /^[0-9]{3}$/;
  const isCvvValid = cvvRegex.test(cvvValue);
  const labelCvv = document.querySelector('label[for="cvv"]');

  if (!isCvvValid) {
    labelCvv.classList.add("not-valid");
    labelCvv.classList.remove("valid");
    labelCvv.lastElementChild.style.display = "block";
  } else {
    labelCvv.classList.add("valid");
    labelCvv.classList.remove("not-valid");
    labelCvv.lastElementChild.style.display = "none";
  }

  return isCvvValid;
}
 //function to validate fieldset 
 function fieldsetValidation(){
  
  const activities_hint = document.getElementById('activities-hint');
  const fieldset = document.getElementById('activities');
  
  const checkboxes = document.querySelectorAll('#activities-box input[type="checkbox"]');
  const check = Array.from(checkboxes).some(checkbox => checkbox.checked);
 
  

  if(!check){
   
    fieldset.classList.add('not-valid');

    fieldset.classList.remove('valid');
 fieldset.style.display = 'block';

  }else {
    fieldset.classList.add('valid');
    fieldset.classList.remove('not-valid');
    fieldset.style.display = 'none';
   


  }
return check;
 }
// Add submit event listener to the form
document.querySelector("form").addEventListener("submit", function (event) {
  // Validate each field and prevent form submission if any field is invalid
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isCardValid = validateCreditCard();
  const isZipValid = validateZip();
  const isCvvValid = validateCVV();
  const check= fieldsetValidation();

  if(!isNameValid || !isEmailValid || !isCardValid || !isZipValid || !isCvvValid || !check){
    event.preventDefault();
  } else {
   //console.log('form submittes successfully');
   
  }
});



//Create a variable to reference the activities’ <input type=”checkbox”> elements, and log out the variable to ensure it is what you think it is.

const checkBoxes= document.querySelectorAll('#activities-box input[type="checkbox"]');
let checkBoxesParent = checkBoxes.parentElement;
console.log(checkBoxes);
//Use the variable that was just created to loop over the activities’ checkboxes.
checkBoxes.forEach(element => {
  element.addEventListener('focus', function(){
    element.parentElement.classList.add('focus');
    element.parentElement.classList.remove('blur');
  })
  
});



//create two functions -one with focus and another with blur
// focus state functionh
//checkboxes.forEach(element => {
 // element.addEventListener('focus', function(){
// element.parentNode.classList.add('focus');
 

 // })
 // element.addEventListener('blur', function(){
    //element.parentNode.classList.add('blur');
  //})
 

//});
 
