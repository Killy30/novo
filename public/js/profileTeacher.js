
const listGroupe = document.getElementById('listGroupe')
const _id = listGroupe.dataset.id
const _myId = listGroupe.dataset.my_id

document.addEventListener('DOMContentLoaded', () => {
    ui.addListGroupe()
})

class getData{
    async getUser(){
        let req = await fetch('/teacher/'+_id)
        let res = await req.json()
        return res
    }
}

class Ui{
    async addListGroupe(){
        let teacher = await getdata.getUser()
        console.log(teacher);
        listGroupe.innerHTML =''

        teacher.teacher.groupes.forEach(element => {
            let verify = element.solicitud.includes(_myId)
            let verify_st = element.students.includes(_myId)
            listGroupe.innerHTML += `
                <div class="box_list">
                    <div class="list_groupe_img">

                    </div>
                    <div class="list_groupe_body">
                        <div class="list_groupe_time">
                        
                        </div>
                        <div class="list_groupe_name">
                            <p>${element.name} ${element.nivel}</p>
                        </div>
                        <div class="list_groupe_description">
                            <p>${element.description}</p>
                        </div>
                        <div class="list_groupe_solicitud">
                            ${verify_st?
                                `<a href="#" data-groupe_id="${element._id}" class="Solicitud_aceptada" >
                                    Solicitud aceptada
                                </a>
                                <a href="" class="btn_go_groupe">Ir al grupo</a>
                                `:
                                `<a href="#" data-groupe_id="${element._id}" class="enviarSolicitud" >
                                    ${verify?'Cancelar solicitud':'Enviar solicitud'}
                                </a>`
                            }
                        </div>
                    </div>
                </div>
            `
        });
    }
}


listGroupe.addEventListener('click', async(e) =>{
    if(e.target.classList.contains('enviarSolicitud')){
        e.preventDefault()
        let groupe_id = e.target.dataset.groupe_id
        console.log(groupe_id);
        
        let req = await fetch('/solicitar_groupe/'+groupe_id)
        let res = await req.json()

        if(res == true){
            e.target.innerText = 'Cancelar solicitud'
        }else{
            e.target.innerText = 'Enviar solicitud'
        }
    }
})

const getdata = new getData()
const ui = new Ui()