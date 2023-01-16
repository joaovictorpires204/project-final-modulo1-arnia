//Dark mode push 
const body = document.getElementsByName('body')

//Show Menu
const menu = document.querySelector('.menu')

//Modal push
const modal = document.getElementById('modal')
const modalDelete = document.getElementById('modal-trash')

// Form list to do push
const listForm = document.getElementById('send')
const numberInput = document.getElementById('number')
const descriptionInput = document.getElementById('description')
const dateInput = document.getElementById('date')
const statusInput = document.getElementById('status')
const submit = document.getElementById('submit-button')
const deleteTaskButton = document.getElementById('delete-task-button"')
let trashTask = 0
let tasks = []
let actualTask = null

//Dark mode
const darkMode = () => {
    document.body.classList.toggle('active')
    document.getElementById('icon-mode').classList.toggle('active')
    document.getElementById('welcome-msg').classList.toggle('active')
    document.getElementById('logo-title').classList.toggle('active')
    document.querySelector('.dark-btn-1').classList.toggle('button-dark')
    document.querySelector('.dark-btn-2').classList.toggle('button-dark')
    document.querySelector('.dark-btn-3').classList.toggle('button-dark')
    document.querySelector('.dark-btn-4').classList.toggle('button-dark')
    document.querySelector('.dark-btn-5').classList.toggle('button-dark')
    document.querySelector('.dark-1').classList.toggle('table-dark')
    document.querySelector('.dark-2').classList.toggle('table-dark')
    document.querySelector('.dark-3').classList.toggle('table-dark')
    document.querySelector('.dark-4').classList.toggle('table-dark')
    document.querySelector('.dark-5').classList.toggle('table-dark')
}

//Menu
const showMenu = () => {
    document.getElementById('dark-box-2').style.width = '210px'
    document.getElementById('menu').style.visibility = 'visible'
    document.querySelector('.fa-ellipsis').style.visibility = 'hidden'
    document.querySelector('.fa-ellipsis-vertical').style.visibility = 'visible'
}

const hideMenu = () => {
    document.getElementById('dark-box-2').style.width = '40px'
    document.getElementById('menu').style.visibility = 'hidden'
    document.querySelector('.fa-ellipsis').style.visibility = 'visible'
    document.querySelector('.fa-ellipsis-vertical').style.visibility = 'hidden'
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

const showDeleteModal = (id) => {
    modalDelete.style.display = 'block'
    trashTask = id
    console.log('Trashtask é', trashTask)
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

//Api connection
const renderTasks = (tasks) => {
    const tableContent = document.getElementById('tbody-content')
    tableContent.innerHTML = ''

    tasks.forEach((task) => {
        const date = new Date(task.date + 'T00:00:00-03:00').toLocaleDateString('pt-BR')
        tableContent.innerHTML = tableContent.innerHTML + `
        <tr>
            <td>${task.number}</td>
            <td>${task.description}</td>
            <td>${date}</td>
            <td class="${task.status.replace(" ", "-")}">${task.status}</td>
            <td><i id="table-icons" class="fa-solid fa-pen-to-square" onclick="callEditTask(${task.id})"></i><i id="table-icons"
                class="fa-solid fa-trash" onclick="showDeleteModal(${task.id})"></i></td>
        </tr>
        `
    });
}

const getTasks = async () => {
    const apiResponse = await fetch('https://to-do-backend-railway-production.up.railway.app/tasks')
    const tasks = await apiResponse.json()
    renderTasks(tasks)
}

const getTask = async (id) => {
    const apiResponse = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks/${id}`,)
    const task = apiResponse.json()
    return task
}

const addTask = async (task) => {
    await fetch('https://to-do-backend-railway-production.up.railway.app/tasks', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(task)
    });
    location.reload
    closeModal()
    cleanFormInput()
}

const editTask = async (id, task) => {
    await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks/${id}`, {
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
    document.getElementById('action-title').innerHTML = 'Editar Tarefa'
    document.getElementById('number').value = actualTask.number
    document.getElementById('description').value = actualTask.description
    document.getElementById('date').value = actualTask.date
    document.getElementById('status').value = actualTask.status

    showModal()
}

const deleteTask = async () => {
    await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks/${trashTask}`, {
        method: 'DELETE',
    })
    showDeleteModal()
    closeModal()
    trashTask = 0
}

const saveTask = async (task) => {
    if (actualTask === null) {
        await addTask(task)
    } else {
        await editTask(actualTask.id, task)
        actualTask = null
    }
    closeModal()
    cleanFormInput()
    getTasks()
}


// Filter
const getAll = async () => {
    const apiResponseAll = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks`)
    const all = await apiResponseAll.json()
    renderTasks(all)
}

const getFinished = async () => {
    const apiResponseFinished = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?status=Concluida`)
    const finished = await apiResponseFinished.json()
    renderTasks(finished)
}

const getOnGoing = async () => {
    const apiResponseOnGoing = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?status=Em andamento`)
    const onGoing = await apiResponseOnGoing.json()
    renderTasks(onGoing)
}

const getStopped = async () => {
    const apiResponseStopped = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?status=Pausada`)
    const stopped = await apiResponseStopped.json()
    renderTasks(stopped)
}

const getOrderNumAsc = async () => {
    const apiResponseNumAsc = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?_sort=number&_order=asc`)
    const numAsc = await apiResponseNumAsc.json()
    renderTasks(numAsc)
}

const getOrderNumDesc = async () => {
    const apiResponseNumDesc = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?_sort=number&_order=desc`)
    const numDesc = await apiResponseNumDesc.json()
    renderTasks(numDesc)
}

const getOrderDescripAsc = async () => {
    const apiResponseDescpAsc = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?_sort=description&_order=asc`)
    const descripAsc = await apiResponseDescpAsc.json()
    renderTasks(descripAsc)
}

const getOrderDescripDesc = async () => {
    const apiResponseDescpDesc = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?_sort=description&_order=desc`)
    const descripDesc = await apiResponseDescpDesc.json()
    renderTasks(descripDesc)
}

const getOrderDateAsc = async () => {
    const apiResponseDateAsc = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?_sort=date&_order=asc`)
    const dateAsc = await apiResponseDateAsc.json()
    renderTasks(dateAsc)
}

const getOrderDateDesc = async () => {
    const apiResponseDateDesc = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?_sort=date&_order=desc`)
    const dateDesc = await apiResponseDateDesc.json()
    renderTasks(dateDesc)
}

const getOrderStatusAsc = async () => {
    const apiResponseStatusAsc = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?_sort=status&_order=asc`)
    const statusAsc = await apiResponseStatusAsc.json()
    renderTasks(statusAsc)
}

const getOrderStatusDesc = async () => {
    const apiResponseStatusDesc = await fetch(`https://to-do-backend-railway-production.up.railway.app/tasks?_sort=status&_order=desc`)
    const statusDesc = await apiResponseStatusDesc.json()
    renderTasks(statusDesc)
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


// https://to-do-backend-railway-production.up.railway.app/