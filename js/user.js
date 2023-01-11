// //Dark mode push
const body = document.getElementsByName('body')
const icon = document.getElementById('icon-mode')
const loginIcon = document.getElementById('login-icon')

//Modal push
const modalSignup = document.getElementById('modal-signup')

//Login push
const loginForm = document.getElementById('login')
const emailUser = document.getElementById('email-login')
const passwordUser = document.getElementById('password')

//Signup push
const signupForm = document.getElementById('signup')
const name = document.getElementById('fullname')
const email = document.getElementById('email-signup')
const password = document.getElementById('password-signup')
const signupSections = document.querySelectorAll('.input-signup ')
const spans = document.querySelectorAll('.span-validation')
const check = document.querySelectorAll('.fa-circle-check')
const exclamation = document.querySelectorAll('.fa-circle-exclamation')
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/i

//Dark mode
const darkMode = () => {
    document.body.classList.toggle('active')
    icon.classList.toggle('active')
    nameUser.classList.toggle('active')
    passwordUser.classList.toggle('active')
    loginIcon.classList.toggle('active')
}

//Modal
const showModalSignup = () => {
    modalSignup.style.display = 'block'
}

const closeModalSignup = () => {
    modalSignup.style.display = 'none'
}

window.addEventListener('click', (event) => {
    if (event.target === modalSignup) {
        closeModalSignup()
    }
})

const cleanSignupInput = () => {
    document.getElementById('fullname').value = ''
    document.getElementById('email-signup').value = ''
    document.getElementById('password-signup').value = ''
    cleanInput()
}

const cleanInput = () => {
    signupSections.style.border = '1px solid #2c2661'
    check.style.visibility = 'hidden'
    exclamation.style.visibility = 'hidden'

}

const showError = (index) => {
    signupSections[index].style.border = '1px solid #EB5757'
    spans[index].style.display = 'block'
    exclamation[index].style.visibility = 'visible'
    check[index].style.visibility = 'hidden'
}

const showSuccess = (index) => {
    exclamation[index].style.visibility = 'hidden'
    signupSections[index].style.border = '1px solid #27AE60'
    spans[index].style.display = 'none'
    check[index].style.visibility = 'visible'
}

//Login
const changeEye = () => {
    document.getElementById('eye').className = passwordUser.type === 'password' ? 'fa-regular fa-eye' : "fa-regular fa-eye-slash"
    passwordUser.type = passwordUser.type === 'password' ? 'text' : 'password'
}

//Signup
const checkName = () => {
    if (signupSections[0].value.length < 8) {
        showError(0)
        return false
    } else {
        showSuccess(0)
        return true
    }
}

const checkEmail = () => {
    if (!emailRegex.test(signupSections[1].value)) {
        showError(1)
        return false
    } else {
        showSuccess(1)
        return true
    }
}

const checkPassword = () => {
    if (signupSections[2].value.length < 8 && !passwordRegex.test[2]) {
        showError(2)
        return false
    } else {
        showSuccess(2)
        return true
    }
}

const addUser = async (user) => {
    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    closeModalSignup()
    cleanSignupInput()
}

// loginForm.addEventListener('submit', (event) => {
//     event.preventDefault()

// })

signupForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = signupForm.elements['fullname'].value
    const email = signupForm.elements['email-signup'].value
    const password = signupForm.elements['password-signup'].value

    if (checkName() || checkEmail() || checkPassword()) {
        console.log(name, email, password)
        addUser({ name, email, password })
    }
})



