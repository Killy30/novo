const form = document.getElementById('form')
const container = document.getElementById('container')
const btn = document.getElementById('btn')
const myId = container.dataset.id
const passAlamr = document.getElementById('passAlamr')
const futureAlamr = document.getElementById('futureAlamr')
const btnCrear = document.getElementById('btnCrear')
const box_form = document.getElementById('box_form')
const btnCrear_m = document.getElementById('btnCrear_m')


console.log(myId);


btnCrear.addEventListener('click', (e) =>{
    e.preventDefault()
    if(box_form.style.display == 'none'){
        box_form.style.display = 'block'
        btnCrear.style.display = 'none'
    }
})

btnCrear_m.addEventListener('click', (e) =>{
    e.preventDefault()
    if(box_form.style.display == 'block'){
        box_form.style.display = 'none'
        btnCrear.style.display = 'flex'
    }
})

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const date = document.getElementById('date').valueAsNumber;
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;

    const alamr = new Date(date)
    const time_alamr = new Date(alamr.getUTCFullYear(), alamr.getUTCMonth(), alamr.getUTCDate(), alamr.getUTCHours(), alamr.getUTCMinutes(), alamr.getUTCSeconds())
    const the_time = time_alamr.getTime() - (new Date()).getTime();

    const dataForm = {
        descripcion: descripcion,
        titulo: titulo,
        timeA: time_alamr,
        myId: myId
    }
    console.log(date);
    

    if(titulo == "" || !date){
        alert('Por favor llenar los campos titulo y fecha')
        return
    }else if(the_time <= 0){
        alert('Esta Fecha ya ha pasado por favor poner una fecha valida')
        return
    }

    data_r.sendData(dataForm)
    form.reset()
})

class Data_r {
    async sendData(dataForm){
        fetch('/recordatorios/'+ JSON.stringify(dataForm), {
            method: 'POST',
            body: JSON.stringify(dataForm)
        })
        .then(res => res.json())
        .then(datos => {
            console.log(datos);
            this.resiveData()
        })
    }

    resiveData(){
        fetch('/alarm')
        .then(res => res.json())
        .then(data =>{
            alerta(data.msg)
            this.addFutureData(data.msg)
            this.addPassData(data.msg)
        })
    }

    addPassData(data){
        passAlamr.innerHTML = ''
        for(var i = data.length - 1; i >= 0; i--){
            const time = new Date(data[i].timeA)
            const the_time = time.getTime() - (new Date()).getTime();
            
            if(the_time < 0){
                passAlamr.innerHTML += `
                    <div class="box_alamr_past">
                        <div class="hju">
                            <div class="div_t"> 
                                <strong class="jklk">${data[i].titulo}</strong>
                            </div>
                            <div class="div_d"> 
                                <p class="phsj">${data[i].descripcion}</p>
                            </div >
                        </div>
                    </div>
                `
            }
        }
        
    }

    addFutureData(data){
        futureAlamr.innerHTML = ''
        for(let i = 0; i < data.length; i++){
            const time = new Date(data[i].timeA)
            const the_time = time.getTime() - (new Date()).getTime();
            
            
            if(the_time > 0){
                console.log(
                    time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                  );
                futureAlamr.innerHTML += `
                    <div class="box_alamr">
                        <div class="hju">
                            <div class="div_t"> 
                                <strong class="jklk">${data[i].titulo}</strong>
                            </div>
                            <div class="div_d"> 
                                <p class="phsj">${data[i].descripcion}</p>
                            </div>
                        </div>
                        <div class="bsde">
                            <div class="div_f">
                                <samp>${fecha(time.getTime())}<samp>
                                <samp>${time.getDate()}<samp>
                                <samp>${time.getFullYear()}<samp>

                            </div>
                            <div class="div_h">
                                <samp>${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<samp>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    }
}

function alerta(data){
    
    for(let i = 0; i < data.length; i++){
        const time = new Date(data[i].timeA)
        const the_time = time.getTime() - (new Date()).getTime();
        
        if(the_time > 0){
            setTimeout(function(){
                alert(data[i].titulo +' '+ data[i].descripcion)
            },the_time)
            return;
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


const data_r = new Data_r()
data_r.resiveData()