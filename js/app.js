//Modal push
const modal = document.getElementById('modal')
const actionTitle = document.getElementById('action-title')
const cancelButton = document.getElementById('cancel-button')
const modalDelete = document.getElementById('modal-trash')

// Form list to do push
const listForm = document.getElementById('send')
const numberInput = document.getElementById('number')
const descriptionInput = document.getElementById('description')
const dateInput = document.getElementById('date')
const statusInput = document.getElementById('status')
const submit = document.getElementById('submit-button')
let tasks = []
let actualTask = null

//Filter push
const finished = document.getElementById('finished')

//Dark mode
const darkMode = () => {
    document.getElementsByName('body').classList.toggle('active')
    document.getElementById('icon-mode').classList.toggle('active')
    document.getElementById('card-content').classList.toggle('active')
    passwordUser.classList.toggle('active')
    document.getElementById('login-icon').classList.toggle('active')
}

//Modal 
const showModal = () => {
    modal.style.display = 'block'
}

const closeModal = () => {
    modal.style.display = 'none'
    location.reload()
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal()
    }
})

const showDeleteModal = () =>{
    modalDelete.style.display = 'block'
}

// Form list to do 
const checkEveryInput = () => {
    //console.log('entrou', statusInput.value)

    if (numberInput.value === '') {
        submit.disabled = true
    } else if (descriptionInput.value === '') {
        submit.disabled = true
    } else if (dateInput.value === '') {
        submit.disabled = true
    } else if (statusInput.value === 'selected') {
        submit.disabled = true
    } else {
        submit.removeAttribute('disabled')
        return submit.classList.add('enabled')
    }
}

const cleanFormInput = () => {
    document.getElementById('number').value = ''
    document.getElementById('description').value = ''
    document.getElementById('date').value = ''
    document.getElementById('status').value = ''
}

//api connection
const renderTasks = (tasks) => {
    const tableContent = document.getElementById('tbody-content')

    tasks.forEach((task) => {
        const date = new Date(task.date)
        tableContent.innerHTML = tableContent.innerHTML + `
        <tr>
            <td>${task.number}</td>
            <td>${task.description}</td>
            <td>${date.toLocaleDateString("pt-BR")}</td>
            <td class="${task.status.replace(" ","-")}">${task.status}</td>
            <td><i id="table-icons" class="fa-solid fa-pen-to-square" onclick="callEditTask(${task.id})"></i><i id="table-icons"
                class="fa-solid fa-trash" onclick="showDeleteModal()"></i></td>
        </tr>
        `
        // onclick="deleteTask(${task.id})"
    });
}

const getTasks = async () => {
    const apiResponse = await fetch('http://localhost:3000/tasks')
    const tasks = await apiResponse.json()
    renderTasks(tasks)
}

const getTask = async (id) => {
    const apiResponse = await fetch(`http://localhost:3000/tasks/${id}`,)
    const task = apiResponse.json()
    return task
}

const addTask = async (task) => {
    await fetch('http://localhost:3000/tasks', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    location.reload()
    closeModal()
    cleanFormInput()
}

const editTask = async (id, task) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

const callEditTask = async (id) => {
    actualTask = await getTask(id)
    document.getElementById('number').value = actualTask.number
    document.getElementById('description').value = actualTask.description
    document.getElementById('date').value = actualTask.date
    document.getElementById('status').value = actualTask.status

    showModal()
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    })
    showDeleteModal()
    getTasks()
    location.reload()
}

const saveTask = async (task) => {
    if (actualTask === null) {
        await addTask(task)
    } else {
        await editTask(actualTask.id, task)
        actualTask = null
    }
    location.reload()
    cleanFormInput()
    closeModal()
    getTasks()
}    


listForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const number = listForm.elements['number'].value
    const description = listForm.elements['description'].value
    const date = listForm.elements['date'].value
    const status = listForm.elements['status'].value

    console.log(number, description, date, status)
    const task = { number, description, date, status }
    saveTask(task)
})
