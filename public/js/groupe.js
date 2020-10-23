const btn_cancel = document.getElementById('btn_cancel')
const btn_cancel_two = document.getElementById('btn_cancel_two')
const btn_open = document.getElementById('btn_open')
const tab_ul = document.getElementById('my_Tab')
const overlay = document.getElementById('overlay')
const _idG = overlay.dataset.id
const body_groupe = document.getElementById('body_groupe')


btn_open.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.add('active')
})

btn_cancel.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.remove('active')
})

btn_cancel_two.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.remove('active')
})

overlay.addEventListener('click', (e)=>{
    if(e.target.classList.contains('overlay')){
        document.querySelector('.overlay').classList.remove('active')
    }
})

tab_ul.addEventListener('click', e =>{
    if(e.target.classList.contains('item_two')){
        e.preventDefault()
        document.querySelector('.item_one').classList.remove('item_active')
        document.querySelector('.item_two').classList.add('item_active')
        document.getElementById('tab_panel_one').style.display='none'
        document.getElementById('tab_panel_two').style.display='block'
    }
    if(e.target.classList.contains('item_one')){
        e.preventDefault()
        document.querySelector('.item_two').classList.remove('item_active')
        document.querySelector('.item_one').classList.add('item_active')
        document.getElementById('tab_panel_two').style.display='none'
        document.getElementById('tab_panel_one').style.display='block'
    }
})

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
            let b = tasks[i].description.split('\n')
            // console.log(b);
            let a = tasks[i].description.charAt()
            // console.log(a);
            let c = tasks[i].description.length
            // console.log(c);

    

           

            // let h = tasks[i].description.match(/([A-Z]*[0-9])/gi)
            // console.log(h);

            body_groupe.innerHTML +=`
                <div class="box_task">
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
                    <div class="box_btn">
                        <a href="">Ver tarea</a>
                    </div>
                </div>
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
