
const _idG = overlay.dataset.id
const body_groupe = document.getElementById('body_groupe')


class GetData{
    async getTasks(){
        let req = await fetch('/get-tasks/'+_idG)
        let res = await req.json()
        return res
    }
}

class Ui{
    async addTask(){
        const tasks = await getdata.getTasks()
        console.log(tasks);
        for(let i = tasks.length - 1;i >= 0; i--){
            let time = new Date(tasks[i].timesAgo)
            // let b = tasks[i].description.split('\n')
            // let a = tasks[i].description.charAt()
            // let c = tasks[i].description.length

            // let h = tasks[i].description.match(/([A-Z]*[0-9])/gi)
            // <div class="box_btn">
            //     <a href="/task/${tasks[i]._id}">Ver tarea</a>
            // </div>

            body_groupe.innerHTML +=`
                <a class="box_task"  href="/task/${tasks[i]._id}">
                    <div class="box_time_task">
                        <div></div>
                        
                        <div class="box_timeAgo">
                            <div>
                                <samp>${fecha(time.getTime())}<samp>/<samp>${time.getDate()}<samp>/<samp>${time.getFullYear()}<samp>
                            </div>
                            <div class="hs">
                                <samp>${time.getHours()}<samp>:<samp>${time.getMinutes()}<samp>
                            </div>
                        </div>
                    </div>
                    <div class="box_descp">
                        <p>${tasks[i].description}</p>
                    </div>
                    <div class="box_files_">
                        <div class="box_file">
                            <img src="../img/logo_files.png" alt="">
                        </div>
                        <div class="box_count_files">
                            <p>${tasks[i].files.length} Archivo</p>
                        </div>
                    </div>
                    
                </a>
            `
        }
    }
}

const getdata = new GetData()
const ui = new Ui()
ui.addTask()


function fecha(date){
    var d = new Date(date);
    
    var month = new Array();
    month[0] = "Enero";
    month[1] = "Febrero";
    month[2] = "Marzo";
    month[3] = "Abril";
    month[4] = "Mayo";
    month[5] = "Junio";
    month[6] = "Julio";
    month[7] = "Agosto";
    month[8] = "Septiembre";
    month[9] = "Octubre";
    month[10] = "Noviembre";
    month[11] = "Diciembre";
    return month[d.getMonth()];
}
