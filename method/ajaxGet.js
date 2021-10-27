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

export default ajaxGet