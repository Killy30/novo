

const description = document.getElementById('description')
const task_files = document.getElementById('task_files')
const listTaskSubmitted = document.getElementById('show_taskSent')
let id = description.dataset.id

const btn_cancelForm = document.getElementById('btn_cancel')
const btn_openForm = document.getElementById('btn_openForm')
// const overlay = document.getElementById('overlay')

// btn_cancel_two.addEventListener('click', (e)=>{
//     e.preventDefault()
//     document.querySelector('.overlay').classList.remove('active')
// })

// overlay.addEventListener('click', (e)=>{
//     if(e.target.classList.contains('overlay')){
//         document.querySelector('.overlay').classList.remove('active')
//     }
// })


const getTask = async()=>{
    const req = await fetch("/get-task/"+id)
    const res = await req.json()
    return res
}
const getListTask = async()=>{
    const req = await fetch("/getListTaskSubmitted/"+id)
    const res = await req.json()
    return res
}



const addTask = async()=>{
    let task = await getTask()
    console.log(task);

    description.innerHTML += `
    <p>
        ${task.description.replace(/\n/g,'<br>')}
    </p>`

    for(let i = 0; i < task.files.length; i++ ){
        task_files.innerHTML += `
        <div class="boxFile">
            <div class="file">
                <img src="../img/logo_files.png" alt="">
            </div>
            <div class="file_name">
                <p>${task.files[i].nameFile}</p>
            </div>
        </div>
        `
    }
}

const addListTask = async()=>{
    let tasksList = await getListTask()
    console.log(tasksList);

    for(let i = 0; i < tasksList.length; i++ ){

        listTaskSubmitted.innerHTML += `
        
        <a href="" class="boxOne">
            <div class="barra"></div>
            <div class="boxct">
                <div class="name">
                    <p>${tasksList[i].userSubmittedTasks.name} ${tasksList[i].userSubmittedTasks.lastName}</p>
                </div>
                <div class="boxFiles">
                    <div class="filesTwo">
                        <img src="../img/logo_files.png" alt="">
                    </div>
                    <span>${tasksList[i].files.length}</span>
                </div>
                <div class="boxpc">
                    <div class="pending">Pendiente</div>
                    <div>
                        <strong>00</strong>
                    </div>
                </div>
            </div>
            
        </a>`
    }
}

addTask()
addListTask()

btn_openForm.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay_task').classList.add('active')
})

btn_cancelForm.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay_task').classList.remove('active')
})