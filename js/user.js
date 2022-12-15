//Dark mode push 
const body = document.getElementsByName('body')
const icon = document.getElementById('icon-mode')
const card = document.getElementById('card-content')
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

//Dark mode
const darkMode = () => {
    document.body.classList.toggle('active')
    icon.classList.toggle('active')
    card.classList.toggle('active')
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

//Login
const changeEye = () => {
    document.getElementById('eye').className = passwordUser.type === 'password' ? 'fa-regular fa-eye' : "fa-regular fa-eye-slash"
    passwordUser.type = passwordUser.type === 'password' ? 'text' : 'password'
}


//Signup 
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
}


signupForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const user = signupForm.elements['name'].value
    const email = signupForm.elements['email-signup'].value
    const password = signupForm.elements['password-signup'].value


    console.log(user, password, email)
    addUser({ user, password, email })
})