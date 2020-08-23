const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Get field name
const getFieldName = (input) => {
  if (input.id === 'password2') {
    return 'Confirm password';
  }

  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Show error
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show success
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Check valid email
const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(String(input.value).toLowerCase())) {
    showError(input, 'Email is not valid');
  }
};

// Check input length
const checkLength = (input, min, max) => {
  const length = input.value.length;

  if (length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  }

  if (length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  }
};

// Check password match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Password do not match');
  }
};

// Event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  if (email.value) checkEmail(email);
  if (username.value) checkLength(username, 3, 15);
  if (password.value) checkLength(password, 6, 25);
  if (password2.value) checkPasswordsMatch(password, password2);
});
