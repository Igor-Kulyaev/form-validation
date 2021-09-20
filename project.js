// Input fields for Create Account
const signupUsername = document.getElementById('signupUsername');
const password = document.getElementById('password');
const email = document.getElementById('email');
const confirmPassword = document.getElementById('confirmPassword');

// Input fields for Login
const loginName = document.getElementById('loginName');
const loginPass = document.getElementById('loginPass');

// Input field for Forgottent password

const emailForgotten = document.getElementById('emailForgotten');

// Submission
const accountCreation = document.getElementById('accountCreation');

// Validation colors
const green = '#4CAF50';
const red = '#F44336';

// Validators for Forgotten password

function validateEmailForgottenPas() {
    if (checkIfEmpty(emailForgotten)) return;
    if (!containsCharacters(emailForgotten, 5)) return;
    return true;
}

// Validators for Login

function validateLoginName() {
    //check if is empty
    if (checkIfEmpty(loginName)) return;
    return true;
}

function validateLoginPass() {
    // Empty check
    if (checkIfEmpty(loginPass)) return;
    // Must of in certain length
    if (!meetLength(loginPass, 4, 17)) return;
    // check password against our character set
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
    if (!containsCharacters(loginPass, 4)) return;
    return true;
}

// Validators for Account creation
function validateSignupUsername() {
    // check if is empty
    if (checkIfEmpty(signupUsername)) return;
    return true;
}
function validatePassword() {
    // Empty check
    if (checkIfEmpty(password)) return;
    // Must of in certain length
    if (!meetLength(password, 4, 17)) return;
    // check password against our character set
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
    if (!containsCharacters(password, 4)) return;
    return true;
}
function validateConfirmPassword() {
    if (!password.classList.contains('form__input--valid')) {
        setInvalid(confirmPassword, 'Password must be valid');
        return;
    }
    // If they match
    if (password.value !== confirmPassword.value) {
        setInvalid(confirmPassword, 'Passwords must match');
        return;
    } else {
        setValid(confirmPassword);
    }
    return true;
}
function validateEmail() {
    if (checkIfEmpty(email)) return;
    if (!containsCharacters(email, 5)) return;
    return true;
}

// Utility functions
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        // set field invalid
        setInvalid(field, `${field.placeholder} must not be empty`);
        return true;
    } else {
        // set field valid
        setValid(field);
        return false;
    }
}
function isEmpty(value) {
    if (value === '') return true;
    return false;
}
function setInvalid(field, message) {
    field.classList.add('form__input--invalid');
    field.classList.remove('form__input--valid');
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}
function setValid(field) {
    field.classList.add('form__input--valid');
    field.classList.remove('form__input--invalid');
    field.nextElementSibling.innerHTML = '';
    field.nextElementSibling.style.color = green;
}

// function checkIfOnlyLetters(field) {
//     if (/^[a-zA-Z ]+$/.test(field.value)) {
//         setValid(field);
//         return true;
//     } else {
//         setInvalid(field, `${field.name} must contain only letters`);
//         return false;
//     }
// }

function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(
            field,
            `${field.placeholder} must be at least ${minLength} characters long`
        );
        return false;
    } else {
        setInvalid(
            field,
            `${field.placeholder} must be shorter than ${maxLength} characters`
        );
        return false;
    }
}

function containsCharacters(field, code) {
    let regEx;
    switch (code) {
        case 1:
            // letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one letter');
        case 2:
            // letter and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(
                regEx,
                field,
                'Password should contain at least one letter and one number'
            );
        case 3:
            // uppercase, lowercase and number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(
                regEx,
                field,
                'Password should contain at least one uppercase, one lowercase letter and one number'
            );
        case 4:
            // uppercase, lowercase, number and special char
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return matchWithRegEx(
                regEx,
                field,
                'Password should contain at least one number, one special character, one lowercase and one uppercase letter.'
            );
        case 5:
            // Email pattern
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithRegEx(regEx, field, 'Must be a valid email address');
        default:
            return false;
    }
}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}

// Change forms

const login = document.querySelector('#login');
const forgotPassword = document.querySelector('#forgotPassword');

document.querySelector(".linkCreateAccount").addEventListener("click", e => {
    e.preventDefault();
    login.classList.add("form--hidden");
    accountCreation.classList.remove("form--hidden");
    forgotPassword.classList.add("form--hidden");
});

document.querySelector(".linkLogin").addEventListener("click", e => {
    e.preventDefault();
    login.classList.remove("form--hidden");
    accountCreation.classList.add("form--hidden");
    forgotPassword.classList.add("form--hidden");
});

document.querySelector('.form__forgotPassword').addEventListener("click", e => {
    e.preventDefault();
    login.classList.add("form--hidden");
    accountCreation.classList.add("form--hidden");
    forgotPassword.classList.remove("form--hidden");
});

// Handle submission

accountCreation.addEventListener('submit', function (event) {
    // Prevent default behaviour
    event.preventDefault();
    if (
        validateSignupUsername() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateEmail()
    ) {
        const name = signupUsername.value;
        const containerForUpdate = document.querySelector('#accountCreation');
        const loader = document.createElement('div');
        loader.className = 'form__result';
        setTimeout(function () {
            loader.innerHTML = `Sign up successful, welcome to Social App ${name}`;
            containerForUpdate.appendChild(loader);
            setTimeout(function () {
                loader.remove();
            }, 2000)
        }, 1000);
    }
});

// Handle Login

login.addEventListener('submit', function (event) {
    // Prevent default behaviour
    event.preventDefault();
    if (
        validateLoginName() &&
        validateLoginPass()
    ) {
        const confirmMessage = document.createElement('div');
        confirmMessage.className = 'message__confirmation';
        setTimeout(function () {
            confirmMessage.innerHTML = `You have successfully logged in`;
            login.appendChild(confirmMessage);
            setTimeout(function () {
                confirmMessage.remove();
            }, 2000);
        }, 1000);
    }
});

// Handle Forget Password

forgotPassword.addEventListener('submit', function (event) {
    // Prevent default behaviour
    event.preventDefault();
    if (validateEmailForgottenPas()) {
        const resettingPasswordNotification = document.createElement('div');
        resettingPasswordNotification.className = 'message__confirmation';
        setTimeout(function () {
            resettingPasswordNotification.innerHTML = `We have sent you a link to reset your password`;
            forgotPassword.appendChild(resettingPasswordNotification);
            setTimeout(function () {
                resettingPasswordNotification.remove();
            }, 2000);
        }, 1000);
    }
});
