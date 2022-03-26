
const _idG = overlay.dataset.id
const body_groupe = document.getElementById('body_groupe')
const selectView = document.getElementById('selectView')



import countTimeEnd from "./countTimeEnd.js"
import DateFormate from "./DateFormat.js"
import DataRequest from "./DataRequest.js"

document.addEventListener('DOMContentLoaded', async() => {
    let tasks = await DataRequest(`/get-tasks/${_idG}`)
    ui.addTask(tasks)
 
})

 
class Ui{
    async addTask(allTasks){
        let stat = document.getElementById('stat')
        let routine = document.getElementById('routine')

        stat.innerHTML = ''
        routine.innerHTML = ''

        let tasksRoutine = allTasks.filter(task =>{
            let limit_time = new Date(task.limitTime)
            return limit_time == 'Invalid Date'
        })

        let tasksStat = allTasks.filter(task =>{
            let limit_time = new Date(task.limitTime)
            return limit_time.getTime() > Date.now()
        })
        
        let eachTask = (task) =>{
            let time = new Date(task.timesAgo)

            let limit_time = new Date(task.limitTime)
            let t = limit_time.getTime()
            let a = Date.now()

            routine.innerHTML +=`
                <a class="box_task"  href="/task/${task._id}">
                    <div class="box_descp">
                        <p class="taskTitle">${task.title ? task.title : "Titulo"}</p>
                        <p>${task.description.substring(0,60)+'...'}</p>
                    </div>
                    <div class="box_time_task">        
                        <div class="box_timeAgo">
                            <div>${limit_time=='Invalid Date'? `<p style="color: rgb(0, 190, 10);"> Rutinario <p>`
                                    :DateFormate(limit_time.getTime())+'/'+limit_time.getDate()+'/'+limit_time.getFullYear()
                                }   
                            </div>
                            <div class="hs">
                                <p>${limit_time=='Invalid Date'? ''
                                    :time.getHours()+':'+time.getMinutes()
                                }<p>
                            </div>
                        </div>
                    </div>
                    <div class="puntuacion_box">
                        <strong>10</strong>
                    </div> 
                </a>
            `
        }
        
        for(let i = tasksStat.length - 1;i >= 0; i--){
            eachTask(tasksStat[i])
        }

        for(let i = tasksRoutine.length - 1;i >= 0; i--){
            eachTask(tasksRoutine[i])
        }
        
    }
}



selectView.addEventListener('change', async(e)=>{

    let tasks = await DataRequest(`/get-tasks/${_idG}`)
 
    if(e.target.value === 'all'){
        
        ui.addTask(tasks)
    }else if(e.target.value === 'today'){
        let today_tasks = tasks.filter(task =>{
            let createDate = new Date(task.timesAgo)
            let todayDate = Date.now()
            let todayDateConfig = new Date(todayDate)
            return createDate.getDate() == todayDateConfig.getDate()
        })
        ui.addTask(today_tasks)
    }else if(e.target.value === 'limit'){
        let limit_tasks = tasks.filter(task =>{
            let limit_time = new Date(task.limitTime)
            return task.limitTime !== undefined 
        })
        ui.addTask(limit_tasks)
    }else if(e.target.value === 'unlimit'){
        let unlimit_tasks = tasks.filter(task =>{
            return task.limitTime == undefined
        })
        ui.addTask(unlimit_tasks)
    }else if(e.target.value === 'expired'){
        let expired_tasks = tasks.filter(task =>{
            if(task.limitTime !== undefined){
                let limit_time = new Date(task.limitTime)
                return limit_time.getTime() < Date.now()
            }
        })
        ui.addTask(expired_tasks)
    }

    
})



const ui = new Ui()


