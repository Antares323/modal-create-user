import ajaxGet from './method/ajaxGet'
import ajaxRequest from './method/ajaxRequest'

const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regUsername = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/

const form = document.querySelector('#form')

const errorMessage = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    role: '',
    notes: '',
    empty: ''
}
let message = document.querySelector('.message')
let usersData = []

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    ajaxGet('https://my-json-server.typicode.com/IwaLain/waites-modal/users', (data) => {
        users = data

        firstName.value = users[0].firstName
        lastName.value = users[0].lastName
        email.value = users[0].email
        phone.value = users[0].phone
    })

    const submit = () => {
        let user = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value
        }
    
        modal.classList.remove('visible')
    
        ajaxPatch('https://my-json-server.typicode.com/IwaLain/waites-modal/users/1', JSON.stringify(user), (res) => {
            showAlert(res)
        })
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
                } else if (element.value.length < 2) {
                    errorMessage.lastName = 'Last name not less than 2 simvols!'
                } else {
                    errorMessage.lastName = ''
                }
                break
            
            case 'phoneNumber':
                if (!regPhone.test(element.value) && element.value !== '') {
                    errorMessage.phoneNumber = 'Plese enter phone number correct!'
                } else if (element.value.length < 8) {
                    errorMessage.lastName = 'Phone number not less than 8 simvols!'
                } else {
                    errorMessage.phoneNumber = ''
                }
                break

            case 'email':
                if (!regEmail.test(element.value) && element.value !== '') {
                    errorMessage.email ='Plese enter email correct!'
                } else if (element.value.length < 8) {
                    errorMessage.lastName = 'Email not less than 8 simvols!'
                } else {
                    errorMessage.email = ''
                }
                break

            case 'roles':
                if (element.value == 'Chouse your role') {
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
                } else {
                    errorMessage.empty = ''
                }
                validateElement(element)
            }
        }

        let countError = 0
        for (let errors in errorMessage) {
            if (errorMessage[errors] !== '') { 
                message.textContent += errorMessage[errors] + " "
                countError++
            } 
        }
        setTimeout(() => {
            message.textContent = ''
        }, 5000)

        if (countError == 0) {
            submit()
            form.reset()
        }
    })
})  