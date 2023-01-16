// //Dark mode push
const body = document.getElementsByName('body')
const icon = document.getElementById('icon-mode')
const loginIcon = document.getElementById('login-icon')

//Modal push
const modalSignup = document.getElementById('modal-signup')

//Login push
const loginForm = document.getElementById('login')
const emailUser = document.getElementById('email-login')
const passwordUser = document.getElementById('password-login')

const loginSections = document.querySelectorAll('.input-login')
const spansLogin = document.querySelectorAll('.span-validation-login')
const checkLogin = document.querySelectorAll('.check-input-login')
const exclamationLogin = document.querySelectorAll('.exclamation-input-login')
let users = []

//Signup push
const signupForm = document.getElementById('signup')
const name = document.getElementById('fullname')
const email = document.getElementById('email-signup')
const password = document.getElementById('password-signup')

const signupSections = document.querySelectorAll('.input-signup ')
const spansSignup = document.querySelectorAll('.span-validation')
const checkSignup = document.querySelectorAll('.check-input')
const exclamationSignup = document.querySelectorAll('.exclamation-input')
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/i

//Dark mode
const darkMode = () => {
    document.body.classList.toggle('active')
    icon.classList.toggle('active')
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
    location.reload()
}

const showErrorLogin = (index) => {
    loginSections[index].style.border = '1px solid #EB5757'
    spansLogin[index].style.display = 'block'
    exclamationLogin[index].style.visibility = 'visible'
    checkLogin[index].style.visibility = 'hidden'
}

const showSuccessLogin = (index) => {
    exclamationLogin[index].style.visibility = 'hidden'
    loginSections[index].style.border = '1px solid #27AE60'
    spansLogin[index].style.display = 'none'
    checkLogin[index].style.visibility = 'visible'
}

//Login
const changeEye = () => {
    document.getElementById('eye').className = passwordUser.type === 'password' ? 'fa-regular fa-eye' : "fa-regular fa-eye-slash"
    passwordUser.type = passwordUser.type === 'password' ? 'text' : 'password'
}

const checkUser = () => {
    if (!emailRegex.test(loginSections[0].value)) {
        showErrorLogin(0)
        return false
    } else {
        showSuccessLogin(0)
        return true
    }
}

const validatePassword = () => {
    if (loginSections[1].value.length < 8) {
        showErrorLogin(1)
        return false
    } else {
        showSuccessLogin(1)
        return true
    }
}

const userUntracked = (index) => {
    signupSections[index].style.border = '1px solid #EB5757'
    spansSignup[index].style.display = 'block'
    exclamationSignup[index].style.visibility = 'visible'
    checkSignup[index].style.visibility = 'hidden'
}

//Signup

const showErrorSignup = (index) => {
    signupSections[index].style.border = '1px solid #EB5757'
    spansSignup[index].style.display = 'block'
    exclamationSignup[index].style.visibility = 'visible'
    checkSignup[index].style.visibility = 'hidden'
}

const showSuccessSignup = (index) => {
    exclamationSignup[index].style.visibility = 'hidden'
    signupSections[index].style.border = '1px solid #27AE60'
    spansSignup[index].style.display = 'none'
    checkSignup[index].style.visibility = 'visible'
}
const checkName = () => {
    if (signupSections[0].value.length < 8) {
        showErrorSignup(0)
        return false
    } else {
        showSuccessSignup(0)
        return true
    }
}

const checkEmail = () => {
    if (!emailRegex.test(signupSections[1].value)) {
        showErrorSignup(1)
        return false
    } else {
        showSuccessSignup(1)
        return true
    }
}

const checkPassword = () => {
    if (signupSections[2].value.length < 8 && !passwordRegex.test[2]) {
        showErrorSignup(2)
        return false
    } else {
        showSuccessSignup(2)
        return true
    }
}

const addUser = async (user) => {
    await fetch('https://to-do-backend-railway-production.up.railway.app/users', {
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

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const emailUser = loginForm.elements['email-login'].value
    const passwordUser = loginForm.elements['password-login'].value
    console.log(checkUser(), validatePassword())
    if (!checkUser() || !validatePassword()) {
        console.log(emailUser, passwordUser)
        return
    }

    const apiResponse = await fetch(`https://to-do-backend-railway-production.up.railway.app/users?email=${emailUser}&password=${passwordUser}`)
    const user = await apiResponse.json()
    console.log(user)
    if (user.length > 0) {
        window.location.href = 'list-page.html'
    } else {
        showErrorLogin(0)
        showErrorLogin(1)
        return false
    }
})

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



