const modalWindow = () => {
    const modalLinks = document.querySelectorAll('.usermodal__link')
    const body = document.querySelector('body')
    const lockPadding = document.querySelectorAll('.lock')

    let unlock = true
    const timeout = 800

    if (modalLinks.length > 0) {
        for (let modal of modalLinks) {
            const modalLink = modal
            modalLink.addEventListener('click', (e) => {
                const modalName = modal.getAttribute('href').replace('#', '')
                const curentModal = document.getElementById(modalName)
                modalOpen(curentModal)
                e.preventDefault()
            })
        }
    }

    const modalCloseIcon = document.querySelectorAll('.close__modal')
    if (modalCloseIcon.length > 0) {
        for (let close of modalCloseIcon) {
            const elem = close
            elem.addEventListener('click', (e) => {
                modalClose(elem.closest('.usermodal'))
                e.preventDefault()
            })
        }
    }

    const modalOpen = (curentModal) => {
        if (curentModal && unlock) {
            const modalActive = document.querySelector('.usermodal')
            if (curentModal) {
                modalClose(modalActive, false)
            } else {
                bodyLock()
            }
            curentModal.classList.add('open')
            curentModal.addEventListener('click', (e) => {
                if (!e.target.closest('.usermodal__content')) {
                    modalClose(e.target.closest('modal'))
                }
            })
        }
    }

    const modalClose = (modalActive, doUnlock = false) => {
        if (!unlock) {
            modalActive.classList.remove('open')
            if (doUnlock) {
                bodyLock()
            }
        }
    }

    const bodyLock = () => {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
        if (lockPaddingValue > 0) {
            for (let padLock of lockPadding) {
                const elem = padLock
                elem.getElementsByClassName.paddingRight = lockPaddingValue
            }
        }
        body.style.paddingRight = lockPaddingValue
        body.classList.add('lock')

        unlock = false
        setTimeout(() => {
            unlock = true
        }, timeout)
    }

    const bodyUnLock = () => {
        setTimeout(() => {
            for (let padLock of lockPadding) {
                const elem = padLock
                elem.style.paddingRight = '0px'
            }
            body.style.paddingRight = '0px'
            body.classList.remove('lock')
        }, timeout)
    }
}

const ajaxGet = (url, callback) => {
    const request = new XMLHttpRequest()

    request.open('GET', url, true)
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            try {
                var userData = JSON.parse(request.responseText)
            }
            catch (e) {
                console.log('error: ' + e.message)
                return
            }

            callback(userData)
        }
    }

    request.send()
}

const ajaxRequest = (url, userData, callback) => {
    const request = new XMLHttpRequest()

    request.open('PATCH', url, true)
    request.setRequestHeader("Accept", "application/json")
    request.setRequestHeader("Content-Type", "application/json")
    
    request.onreadystatechange = () => {
        if (request.readyState === 4) request.status === 200 ? callback('Success') : callback('Error')
    }
    
    request.send(userData)
}

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

let usersData = []

const validateElement = (element) => {
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regUsername = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
    const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/

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

const checkErrors = () => {
    let message = document.querySelector('.message')

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
} 

const submit = () => {
    ajaxGet('my-json-server.typicode.com/Antares323/modal-create-user/usersData', (data) => {
        usersData = data

        firstName.value = usersData[0].firstName
        lastName.value = usersData[0].lastName
        email.value = usersData[0].email
        phone.value = usersData[0].phone
    })

    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value
    }

    ajaxRequest('my-json-server.typicode.com/Antares323/modal-create-user/usersData/1', JSON.stringify(user), (res) => {
        showAlert(res)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    "use strict"
    modalWindow()

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        checkErrors()
    })
})  