export const modalWindow = () => {
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
                form.reset()
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