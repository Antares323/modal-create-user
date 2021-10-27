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

export default ajaxRequest