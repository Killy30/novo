import DataRequest from './DataRequest.js'

const description = document.getElementById('description')
const listTaskSubmitted = document.getElementById('show_taskSent')

let id = description.dataset.id

// const btn_cancelForm = document.getElementById('btn_cancel')
// const btn_openForm = document.getElementById('btn_openForm')
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
    const task_files = document.getElementById('task_files')
   
    // let task = DataRequest(`/get-task/${id}`)

    let task = await getTask()

    // console.log(task.listTaskSubmitted);
         
    description.innerHTML += `
    <div class="box_t_d">
        <p class="btitle">${task.title}</p>
        <p>
            ${task.description.replace(/\n/g,'<br>')}
        </p>
    </div>`

    for(let i = 0; i < task.files.length; i++ ){
        task_files.innerHTML += `
        <div class="boxFile">
            <div class="file">
                <img src="../img/img_file_png.png" alt="">
            </div>
            <div class="file_name">
                <p>${task.files[i].nameFile}</p>
            </div>
        </div>
        `
    }

    const showMyTask = document.getElementById('showMyTask')
    let _iduser = showMyTask.dataset.id

    let todos = task.listTaskSubmitted.filter((element) =>{
        return element.userSubmittedTasks == _iduser
        
    })

    for(let i = 0; i < todos.length; i++ ){
        for(let b = 0; b < todos[i].files.length; b++ ){
            showMyTask.innerHTML += `
                <div class="file_na">
                    <p>${todos[i].files[b].nameFile}</p>
                </div>
    
            `
        }
    }
}

const addListTask = async()=>{
    let tasksList = await getListTask()
    
    listTaskSubmitted.innerHTML = ''
    for(let i = 0; i < tasksList.length; i++ ){
        
        listTaskSubmitted.innerHTML += `
        <a href="" class="boxOne seleccionar" data-idtask="${tasksList[i]._id}">
            <div class="boxct seleccionar" data-idtask="${tasksList[i]._id}" >
                <div class="name seleccionar" data-idtask="${tasksList[i]._id}">
                    <p class="fullName seleccionar" data-idtask="${tasksList[i]._id}">
                        ${tasksList[i].userSubmittedTasks.name} 
                        ${tasksList[i].userSubmittedTasks.lastName}
                    </p>
                </div>
                <div class="boxFiles seleccionar" data-idtask="${tasksList[i]._id}">
                    <div class="filesTwo seleccionar" data-idtask="${tasksList[i]._id}">
                        <img class="seleccionar" data-idtask="${tasksList[i]._id}" src="../img/logo_files.png" alt="">
                    </div>
                    <span class="seleccionar"data-idtask="${tasksList[i]._id}">
                        ${tasksList[i].files.length}
                    </span>
                </div>
                <div class="boxpc seleccionar" data-idtask="${tasksList[i]._id}">
                    <div class="pending seleccionar" ${tasksList[i].status === false ?'style="color: red"': 'style="color: rgb(0, 212, 18)"'} data-idtask="${tasksList[i]._id}" data-idtask="${tasksList[i]._id}">
                        ${
                            tasksList[i].status === false ? 'Pendiente':'Revisado'
                        }
                    </div>
                    <div class="seleccionar" data-idtask="${tasksList[i]._id}">
                        <strong class="seleccionar"data-idtask="${tasksList[i]._id}">
                            ${
                                tasksList[i].ratings===0?'00':tasksList[i].ratings
                            }/20
                           
                        </strong>
                    </div>
                </div>
            </div>
        </a>`
    }
}

addTask()
addListTask()

var idTask; 
listTaskSubmitted.addEventListener('click', async(e)=>{
    e.preventDefault()    
    if(e.target.classList.contains('seleccionar')){
        
        let _id = e.target.dataset.idtask
        idTask=_id

        let req = await fetch('/detailsTask/'+_id)
        let res = await req.json()
                
        showDetailsTask(res)
        document.querySelector('.overlay').classList.add("_active")
        
    }
})

const showDetailsTask = (task) =>{
    const d_name = document.querySelector('.d_name')
    const files = document.querySelector('#files')
    const status = document.getElementById('status') 
    const ratings = document.getElementById('ratings')
    console.log(task.taskView.userSubmittedTasks._id);

    status.checked = task.taskView.status
    ratings.value = task.taskView.ratings
    
    d_name.innerText = `
        ${task.taskView.userSubmittedTasks.name} ${task.taskView.userSubmittedTasks.lastName}
    `
    files.innerHTML = ''
    task.taskView.files.forEach(element => {
        
        files.innerHTML += `
            <div>
                <p>${element.nameFile}</p>
            </div>
        `
    });

}


const btn_submitReview = document.getElementById('btn_dt')
btn_submitReview.addEventListener('click', async(e) =>{
    
    const status = document.getElementById('status').checked 
    const ratings = document.getElementById('ratings').value

    if(ratings.trim() === '' && status === false){
        alert('Debes llenar los campos');
        return false
    }

    const data = {ratings,status}

    fetch(`/post_status_ratings/${idTask}`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data =>{
        document.querySelector('.overlay').classList.remove("_active")
        addListTask()
    })
    .catch((err) =>{
        console.error('some error happened');
    })

})

// const close_tab = document.getElementById('close_tab')
// close_tab.addEventListener('click', (e)=>{
//     e.preventDefault()
//     document.querySelector('.overlay').classList.remove('_active')
// })

// btn_openForm.addEventListener('click', (e)=>{
//     e.preventDefault()
//     document.querySelector('.overlay_task').classList.add('active')
// })

// btn_cancelForm.addEventListener('click', (e)=>{
//     e.preventDefault()
//     document.querySelector('.overlay_task').classList.remove('active')
// })

