const form = document.querySelector('#form')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const phoneNumber = document.getElementById('phoneNumber')
const email = document.getElementById('email')
const roles = document.getElementById('roles')
const notes = document.getElementById('notes')

const URL = 'https://my-json-server.typicode.com/Antares323/modal-create-user/usersData/'

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

// Модальное окно 
const modalWindow = () => {
    const modalLinks = document.querySelectorAll('.usermodal__link')
    const body = document.querySelector('body')

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
            const modalActive = document.querySelector('.usermodal.open')
            if (modalActive) {
                modalClose(modalActive, false)
            } else {
                bodyLock()
            }
            curentModal.classList.add('open')
            curentModal.addEventListener('click', (e) => {
                if (!e.target.closest('.usermodal__content')) {
                    modalClose(e.target.closest('.usermodal'))
                } 
            })
        }
    }

    const modalClose = (modalActive, doUnlock = false) => {
        if (unlock) {
            modalActive.classList.remove('open')
            if (doUnlock) {
                bodyUnLock()
            }
        }
    }

    const bodyLock = () => {
        body.classList.add('lock')

        unlock = false
        setTimeout(() => {
            unlock = true
        }, timeout)
    }

    const bodyUnLock = () => {
        setTimeout(() => {
            body.classList.remove('lock')
        }, timeout)
    }
}

// Аякс запросы
const sendRequest = (method, requestURL, userData = null) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, requestURL, true)
        xhr.responseType = 'json'
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            reject(xhr.response)
        }
        
        xhr.send(userData)
    })
}

// Проверка формы на валидность
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
            if (element.value.length <= 5) {
                errorMessage.notes = 'Plese enter notes more than 5 simvols!'
            } else {
                errorMessage.notes = ''
            }
            break
        default:
            break
    }
}

// Проверка формы на наличие ошибок
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
            message.classList.add('error')
            countError++
        } 
    }
    
    setTimeout(() => {
        message.textContent = ''
        message.classList.remove('error')
    }, 5000)

    if (countError == 0) {
        submit()

        message.textContent = 'Successful create new user!'
        message.classList.add('success')

        setTimeout(() => {
            message.textContent = ''
            message.classList.remove('success')
        }, 5000)

        form.reset()
    }
} 

// Событие при нажатии отправки формы
const submit = () => {
    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        roles: roles.value,
        notes: notes.value
    }

    sendRequest('PATCH', URL + '5', JSON.stringify(user))
    .then(data => {
        console.log(data)
        tableUsers(data)
    })
    .catch(err => console.log(err))
}

// Добавление элемента в стоку таблицы
const addDataTable = (main, secondary, data) => {
    secondary.textContent = data
    main.appendChild(secondary)
}

// Добавление данных пользователя в таблицу
const tableUsers = (usersData) => {
    const dataTable = document.querySelector('.dataUser')
    
    let dataRow = document.createElement('tr')

    for (let key in usersData) {
        let dataItem = document.createElement('td')
        addDataTable(dataRow, dataItem, usersData[key])
    } 

    dataTable.appendChild(dataRow)
}

// Основное прослушивание событий на сайте
document.addEventListener('DOMContentLoaded', () => {
    "use strict"
    modalWindow()

    // Получение данных с помощь аякс запроса
    sendRequest('GET', URL)
    .then(data => {
        usersData = data

        for (let key of usersData) {
            tableUsers(key)
        }
    })
    .catch(err => console.log(err))

    // Отслеживание клика по форме 
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        checkErrors()
    })
})  