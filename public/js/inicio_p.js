import Prueba from './Prueba.js'
// import data from "./data.js"

const body_alarm = document.getElementById('body_recor')
const btn_open = document.getElementById('btn_open')
const btn_cancel = document.getElementById('btn_cancel')

document.addEventListener('DOMContentLoaded', () => {
    const height_value = innerHeight;
    document.querySelector('.box_config').style.height = height_value + 'px';
    datas.getData()

    const prueba = new Prueba()
    prueba.verPrueba()
 
})

btn_open.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.add('active')
})

btn_cancel.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.remove('active')
})

class Datas {
    getData(){
        fetch('/alarm')
        .then(res => res.json())
        .then(data =>{
            adds.addData(data.msg)
           
        })
    }
}

class Adds{
    addData(data){
        let array = data.filter(element => {
            let time = new Date(element.timeA)
            const the_time = time.getTime() - (new Date()).getTime();
            return the_time > 0
        })

        const alarms = array.slice(0,2);
        
        body_alarm.innerHTML = ''
        for(let i = 0; i < alarms.length; i++){
            const time = new Date(alarms[i].timeA)
            
            body_alarm.innerHTML += `
                <div class="box_alamr_past">
                    <div>
                        <div> 
                            <strong>${alarms[i].titulo}</strong>
                        </div>
                        <div> 
                            <p>${alarms[i].descripcion}</p>
                        </div>
                    </div>
                    <div class=""bsde>
                        <div>
                            <samp>${fecha(time.getTime())}<samp>
                            <samp>${time.getDate()}<samp> -
                            <samp>${time.getFullYear()}<samp>
                        </div>
                        <div>
                            <samp>${time.getHours()}<samp>:
                            <samp>${time.getMinutes()}<samp>
                        </div>
                    </div>
                </div>
            `
        }
    }
}

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




const adds = new Adds()
const datas = new Datas()
