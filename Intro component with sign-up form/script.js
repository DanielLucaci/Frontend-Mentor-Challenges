const form = document.querySelector('form');

console.log(window.innerHeight);

const inputElements = [
    // First Name
    {
        input: document.getElementById('firstname'),
        hasError: false
    }, 
    // Last Name
    {
        input: document.getElementById('lastname'),
        hasError: false
    },
    // Email Input 
    {
        input: document.getElementById('email'),
        hasError: false
    },
    // Password Input 
    {
        input: document.getElementById('password'),
        hasError: false
    } 
]

const isEmpty = (e) => e.value === '';

const isValidEmail = (email) => {
    return String(email.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
} 

const getNextSibling = element => element.nextSibling.nextSibling;

const changeEmailError = (email) => {
    const errorDescription = getNextSibling(getNextSibling(email));
    errorDescription.innerHTML = 'Looks like this is not an email';
}

const onErrorHandler = (inputElement) => {
    // Change border color and margin 
    inputElement.style.borderColor = 'var(--red)';
    inputElement.style.marginBottom = '30px';

    // Display error icon
    const iconError = getNextSibling(inputElement); 
    iconError.style.display = 'inline';
    
    // Display error description 
    const errorDescription = getNextSibling(iconError);
    errorDescription.style.display = 'block';
}

const onChangeHandler = (inputElement) => {
    // Change border color and margin 
    inputElement.style.borderColor = '#e3e3e3';
    inputElement.style.marginBottom = '15px';

    // Display error icon
    const iconError = getNextSibling(inputElement); 
    iconError.style.display = 'none';
    
    // Display error description 
    const errorDescription = getNextSibling(iconError);
    errorDescription.style.display = 'none';

    if(inputElement.id === 'email')
        errorDescription.innerHTML = 'Email cannot be empty';
}


// Event Listeners
inputElements.forEach(element => {
    element.input.addEventListener('input', () => {
        if(element.hasError === true) { 
            onChangeHandler(element.input);
            element.hasError = false;
        }
    })
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputElements.forEach((inputElement, index) => {
        const { input } = inputElement;

        // Check if it's not empty 
        if(isEmpty(input)) {
            onErrorHandler(input);
            inputElement.hasError = true;
            return;
        }

        // Extra check for email input 
        if(index === 2 && !isValidEmail(input)) { 
            onErrorHandler(input);
            changeEmailError(input);
            inputElement.hasError = true;
        } 
    });
})

window.addEventListener('resize', () => {
    console.log(window.innerWidth);
})