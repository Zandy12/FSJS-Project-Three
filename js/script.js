///               ~*~*~ FSJS Project Three submission by Zane Chandy 6-20-2019 ~*~*~
///
/// This is my first submission for the third project of the Full Stack Javascript techdegree program. 
/// In this project we added interactivity to the already provided form from Treehouse (index.html and css/style.css) 
/// via Javascript by implementing error handlers and regex boolean conditions for form validation. 
/// jQuery was used heavily in this project alongside vanilla Javascript and Regular expressions.
/// Third-party source code was also used in this project to which credit has been giving specifically.
///


/************************
 *      VARIABLES 
 ************************/

// Source: https://www.w3schools.com/jquery/sel_nthchild.asp
const $firstFieldset = $("fieldset:nth-child(0)");

const $total = $(".total");
const optionsTitle = document.getElementById('title');
const optionsDesign = document.getElementById('design');
const optionsSize = document.getElementById('size');
const optionsColor = document.getElementById('color');
const optionsPayment = document.getElementById('payment');
const activities = document.querySelector('fieldset.activities');
const creditcard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const expirationMonth = document.getElementById("exp-month");
const expirationYear = document.getElementById("exp-year");
const submitButton = document.querySelector('button[type="submit"]');
const name = document.getElementById('name');
const email = document.getElementById('mail');
let ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const otherRole = document.getElementById('other');
const colorSelectionLabel = document.querySelector('label[for="color"]');
const colorSelectionSelect = document.getElementById('color');
let errorMessageExists = false;
let errorsExist = false;

// Regex values 
const nameRegex = /[A-Za-z]+\s[A-Za-z]+/g;
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+.+[A-Za-z]+$/g;
const ccNumRegexCheck = /[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/g;
const ccNumRegex = /^[0-9]{13,16}$/g; // do string replacement for this one 
const zipRegex = /^[0-9]{5}$/g;
const cvvRegex = /^[0-9]{3}$/g;

// Source: https://stackoverflow.com/questions/36817529/regex-to-match-2-or-more-words
const otherRoleRegex = /([a-zA-Z]+\s?\b){1,}/;

// default values for whenever the page resets 
// Sources: https://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input & https://api.jquery.com/focus/ 
$('label[for="name"]').focus();
optionsTitle.value = "full-stack js developer";
optionsDesign.value = "default";
optionsSize.value = "medium";
optionsPayment.value = "credit card";
$('input[name="user_other"]').hide();
colorSelectionLabel.style.display = 'none';
colorSelectionSelect.style.display = 'none';
$('p.event-error').hide();

// loop for setting all check settings for checkboxes false and hiding text
for (let i = 1; i < activities.children.length-1; ++i) {
    activities.children[i].children[0].checked = false;
}
$total.hide();

// hide all payment options and set default values for credit card year and month
$(creditcard).hide();
expirationMonth.value = "1";
expirationYear.value = "2016";
$(creditcard).show();
$(paypal).hide();
$(bitcoin).hide();

/************************
 *    EVENT HANDLERS 
 ************************/

$('#title').change(function() {
    if (optionsTitle.value === 'other') {
            $('input[name="user_other"]').show();
        } else if (optionsTitle.value != 'other') {
            $('input[name="user_other"]').hide();
    }
});

$('#design').change(function() {
    if (optionsDesign.value === 'js puns') { 
        $('label[for="color"]').show();
        $('#color').show();
        $('option[value="tomato"]').hide();
        $('option[value="steelblue"]').hide();
        $('option[value="dimgrey"]').hide();
        $('option[value="cornflowerblue"]').show();
        $('option[value="darkslategrey"]').show();
        $('option[value="gold"]').show();
        optionsColor.value = 'cornflowerblue';  
    }
    if (optionsDesign.value === 'heart js') {
        $('label[for="color"]').show();
        $('#color').show();
        $('option[value="cornflowerblue"]').hide();
        $('option[value="darkslategrey"]').hide();
        $('option[value="gold"]').hide();     
        $('option[value="tomato"]').show();
        $('option[value="steelblue"]').show();
        $('option[value="dimgrey"]').show();
        optionsColor.value = 'tomato';   
    }
    if (optionsDesign.value != 'heart js' && optionsDesign.value != 'js puns') {
        $('label[for="color"]').hide();
        $('#color').hide();     
    }
}); 

$('.activities').change((e) => {
    window.eventChosen = false;
    let total = 0;
    if($('input[name="all"]').is(':checked')) {
        total += 200;
    } else {
    }
    if($('input[name="js-frameworks"]').is(':checked')) {
        $('input[name="express"]').attr('disabled', true);
        document.querySelector('label[for="express"]').style.color = "gray";
        total += 100;
    } else {
        $('input[name="express"]').removeAttr("disabled");
        document.querySelector('label[for="express"]').style.color = "black";
    }
    if($('input[name="js-libs"]').is(':checked')) {
        $('input[name="node"]').attr('disabled', true);
        document.querySelector('label[for="node"]').style.color = "gray";
        total += 100;
    } else {
        $('input[name="node"]').removeAttr("disabled");
        document.querySelector('label[for="node"]').style.color = "black";
    }
    if($('input[name="express"]').is(':checked')) {
        $('input[name="js-frameworks"]').attr('disabled', true);
        document.querySelector('label[for="js-frameworks"]').style.color = "gray";
        total += 100;
    } else {
        $('input[name="js-frameworks"]').removeAttr("disabled");
        document.querySelector('label[for="js-frameworks"]').style.color = "black";
    }
    if($('input[name="node"]').is(':checked')) {
        $('input[name="js-libs"]').attr('disabled', true);
        document.querySelector('label[for="js-libs"]').style.color = "gray";
        total += 100;
    } else {
        $('input[name="js-libs"]').removeAttr("disabled");
        document.querySelector('label[for="js-libs"]').style.color = "black";
    }
    if($('input[name="build-tools"]').is(':checked')) {
        total += 100;
    } else {
    }
    if($('input[name="npm"]').is(':checked')) {
        total += 100;
    } else {
    }
    if (total === 0) {
        $($total).hide();
        window.eventChosen = false;
    } 
    if (total != 0) {
        $($total).show();
        $total.html('Total Cost: $' + total);
        window.eventChosen = true;
    }
});

$('#payment').change(function() {
    if (optionsPayment.value === "select_method") {
        $(creditcard).hide();
        $(paypal).hide();
        $(bitcoin).hide();      
    }
    if (optionsPayment.value === "credit card") {
        $(creditcard).show();
        $(paypal).hide();
        $(bitcoin).hide();
    }
    if (optionsPayment.value === "paypal") {
        $(paypal).show();
        $(creditcard).hide();
        $(bitcoin).hide();
    }
    if (optionsPayment.value === "bitcoin") {
        $(bitcoin).show();
        $(creditcard).hide();
        $(paypal).hide();
    }
});   

// check for validation using regex when user clicks submit button before submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (nameRegex.test(name.value) === false) {
        name.style.border = '2px solid red';
        errorsExist = true;
    } else {
        name.style.border = '2px solid #b0d3e2';
        errorsExist = false;
    }
    if (emailRegex.test(email.value) === false) {
        email.style.border = '2px solid red';
        errorsExist = true;
    } else {
        email.style.border = '2px solid #b0d3e2';
        errorsExist = false;
    }
    if (optionsTitle.value === 'other') {
        if (otherRoleRegex.test(otherRole.value) === false) {
            otherRole.style.border = '2px solid red';
            errorsExist = true;
        } else {
            otherRole.style.border = '2px solid #b0d3e2';
            errorsExist = false;
        }
    }
    if (!window.eventChosen) {
        if (!errorMessageExists) { 
            window.eventError = document.createElement('p');
            const eventErrorText = document.createTextNode('*Please select an event.');
            eventError.style.color = 'red';
            window.eventError.appendChild(eventErrorText);
            activities.appendChild(window.eventError);
            errorMessageExists = true;
        }
        errorExists = true;
    }
    if (window.eventChosen && errorMessageExists) {
        if (errorMessageExists) { 
            window.eventError.parentElement.removeChild(eventError);
            errorMessageExists = false;
        }
    }
    if (optionsPayment.value === 'credit card') {
        if (ccNumRegexCheck.test(ccNum.value) === true) {
            // Source: https://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
            ccNum.value = ccNum.value.split(' ').join('');          
        } 
        if (ccNumRegex.test(ccNum.value) === false || zipRegex.test(zip.value) === false || cvvRegex.test(cvv.value) === false) {
            ccNum.style.border = '2px solid red';
            errorsExist = true;
        } else {
            ccNum.style.border = '2px solid #b0d3e2';
            errorsExist = false;
        }
    }
    if (!errorsExist) {
        // Source: https://stackoverflow.com/questions/5651933/what-is-the-opposite-of-evt-preventdefault 
        $(this).unbind('submit').submit();
    }
});