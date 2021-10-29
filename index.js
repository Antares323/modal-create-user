import { requestGet } from "./ajax/requestGet.js"
import { requestPost } from "./ajax/requestPost.js"
import { modalWindow } from "./js/modal.js"

// Получаем элементы формы
const form = document.querySelector('#form')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const phoneNumber = document.getElementById('phoneNumber')
const email = document.getElementById('email')
const roles = document.getElementById('roles')
const notes = document.getElementById('notes')

const url = 'db.json'

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
let id = 1

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
        id: id,
        img: './img/avatar.png',
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        roles: roles.value,
        notes: notes.value
    }

    requestPost(url, user, () => {
        console.log(user)
        if (usersData.includes[id]) {
            console.log('repeat')
            usersData[user.id] = user
        } else {
            console.log('norepeat')
            usersData.push(user)
        }
        tableUsers(user)
    })
}

// Добавление элемента в стоку таблицы
const addDataTable = (main, secondary, data) => {
    secondary.textContent = data
    main.appendChild(secondary)
}

// Добавляем слушатель на Edit
const addEdit = (id, dataItem) => {
    let imgLink = document.createElement('a')
    imgLink.href = '#modal'
    imgLink.classList.add('usermodal__link')
    imgLink.textContent = 'Edit'
    dataItem.appendChild(imgLink)

    dataItem.addEventListener('click', (e) => {
        e.preventDefault()
        modalWindow()

        let localData = usersData[id-1]

        firstName.value = localData.firstName
        lastName.value = localData.lastName
        phoneNumber.value = localData.phoneNumber
        email.value = localData.email
        roles.value = localData.roles
        notes.value = localData.notes
    })
}

const addEditImage = (image = './img/avatar.png') => {
    let imgLink = document.createElement('a')
    let img = document.createElement('img')
    img.src = image
    imgLink.href = '#modalImg'
    imgLink.classList.add('usermodal__link')
    imgLink.appendChild(img)
    
    img.addEventListener('click', (e) => {
        e.preventDefault()
        modalWindow()
        
    })
    return imgLink
}

// Добавление данных пользователя в таблицу
const tableUsers = (userData) => {
    const dataTable = document.querySelector('.dataUser')
    let dataRow = document.createElement('tr')
    id++

    for (let key in userData) {
        let dataItem = document.createElement('td')
        
        if (key == 'img') {
            let img = addEditImage(userData[key])
            dataItem.style.display = 'flex'
            dataItem.style.justifyContent = 'center'
            
            dataItem.appendChild(img)
            dataRow.appendChild(dataItem)
        } else if (key == 'notes') {
            addDataTable(dataRow, dataItem, userData[key])
            addEdit(userData.id, dataItem)
        } else {
            addDataTable(dataRow, dataItem, userData[key])
        }
    } 
    
    dataTable.appendChild(dataRow)
}

// Основное прослушивание событий на сайте
document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    // Получение данных с помощь аякс запроса
    requestGet(url, (data) => {
        usersData = data.usersData

        for (let key in usersData) {
            tableUsers(usersData[key])
        }
    })

    modalWindow(form)

    // Отслеживание клика по форме 
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        checkErrors()
    })
})  