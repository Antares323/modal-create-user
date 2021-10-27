document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regUsername = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
    const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

    const form = document.querySelector('#form')

    const errorMessage = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        role: '',
        notes: '',
        empty: ''
    };
    let isValidation = false
    let message = document.querySelector('.message')
    

    const submit = () => {
        alert('Successful')
    }

    const validateElement = (element) => {
        switch(element.id) {
            case 'firstName':
                if (regUsername.test(element.value) && element.value !== '') {
                    errorMessage.firstName = 'Plese enter first name correct!'
                } else if (element.value.length < 2) {
                    errorMessage.firstName = 'First name not less than 2 simvols!'
                } else {
                    errorMessage.firstName = ''
                }
                break
            
            case 'lastName':
                if (regUsername.test(element.value) && element.value !== '') {
                    errorMessage.lastName = 'Plese enter last name correct!'
                } else if (element.value.length < 2 && element.value !== '') {
                    errorMessage.lastName = 'Last name not less than 2 simvols!'
                } else {
                    errorMessage.lastName = ''
                }
                break
            
            case 'phoneNumber':
                if (!regPhone.test(element.value) && element.value !== '') {
                    errorMessage.phoneNumber = 'Plese enter phone number correct!'
                } else {
                    errorMessage.phoneNumber = ''
                }
                break

            case 'email':
                if (!regEmail.test(element.value) && element.value !== '') {
                    errorMessage.email ='Plese enter email correct!'
                } else {
                    errorMessage.email = ''
                }
                break

            case 'role':
                if (element.value === '') {
                    errorMessage.role = 'Plese chouse your role!'
                } else {
                    errorMessage.role = ''
                }
                break

            case 'notes':
                if (element.value.length <= 20) {
                    errorMessage.notes = 'Plese enter notes more than 20 simvols!'
                } else {
                    errorMessage.notes = ''
                }
                break
            default:

                break
        }
    }

    

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        for (let element of form.elements) {
            if (element.tagName !== 'BUTTON') {
                if (element.value === '') {
                    errorMessage.empty = 'Please type empty fields!'
                    isValidation = false
                } else {
                    errorMessage.empty = ''
                }
                validateElement(element)
            }
        }

        // for (let element of form.elements) {
        //     if (element.tagName !== 'BUTTON') {
        //         element.addEventListener('blur', () => {
                    
        //         })
        //     }
        // }

        for (let errors in errorMessage) {
            if (errorMessage[errors] !== '') { 
                message.textContent += errorMessage[errors]
                isValidation = false
            } else {
                isValidation = true
            }
        }
        setTimeout(() => {
            message.textContent = ''
        }, 5000)

        console.log(isValidation)
        if (isValidation) {
            submit()
        }
    })
})  