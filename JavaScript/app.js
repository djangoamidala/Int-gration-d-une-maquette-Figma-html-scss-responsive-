// get form by ID
const formContact = document.getElementById('formContact')
//Remove original action of field which is to refresh page 
formContact.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get all fields by ID one by one
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // Create list of values keys to get text fields
    const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value,
    }
    // create list of errors with default value (False)
    const errors = {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        message: false
    }
    
    // Get all errors messages in HTML by ID
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    
    
    // Unshow label
    firstNameError.style.display = 'none';
    lastNameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';
    messageError.style.display = 'none';
    
    // check if the fields are filled
    
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    const nameRegex = /^[a-zA-Z ]+$/;
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    
    
    
    // We check each field one after another
    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
        // if field are not filled errors = True
        errors.firstName = true;
        firstNameError.style.display = 'block';
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
        errors.lastName = true;
        lastNameError.style.display = 'block';
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = true;
        emailError.style.display = 'block';
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
        errors.phone = true;
        phoneError.style.display = 'block';
    }
    if (!formData.message || formData.message.length < 4) {
        errors.message = true;
        messageError.style.display = 'block';
    }
    
    
    if (Object.values(errors).includes(true)) {
        // forEach with errors list to print corresponding errors messages
        Object.entries(errors).forEach(function (error) {
            const key = error[0];
            const value = error[1];
            
            if (value) {
                if (key === 'firstName') {
                    firstNameError.style.display = 'block';
                } else if (key === 'lastName') {
                    passwordError.style.display = 'block';
                } else if (key === 'email') {
                    emailError.style.display = 'block';
                } else if (key === 'phone') {
                    phoneError.style.display = 'block';
                } else if (key === 'message') {
                    messageError.style.display = 'block';
                }
            }
        })
    } else {
        // if not error console.log data form
        formContact.reset()
    }
    if (!Object.values(errors).includes(true)) {
        console.log(formData)
        // alert("Request sent")
        axios.post("http://212.83.176.255:3030/contact", formData,{
            
        })
        .then(function (response) {
            modal.style.display = 'block';
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        })
    }
})