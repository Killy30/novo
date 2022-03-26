const boxSolicitud = document.getElementById('boxSolicitud')
const _gpId = boxSolicitud.dataset._id_g

import DataRequest from './DataRequest.js';

document,addEventListener('DOMContentLoaded', () =>{
    ui.addUi()
})

class Ui{
    async addUi(){
        let groupe = await DataRequest(`/groupe_id/${_gpId}`)
        let users = groupe.students 
        console.log(groupe);
        boxSolicitud.innerHTML = ''

        for(var i = users.length -1; i>=0 ; i--){
            boxSolicitud.innerHTML += `
                <div class="box_user">
                    <div class="img_user">
                        <img src="${users[i].profileImg? users[i].profileImg : '../../img/images.png'}" alt="">
                    </div>
                    <div class="box_body">
                        <div class="box_name">                            
                            <p>${users[i].name} ${users[i].lastName}</p>
                        </div>
                        <div class="box_btn">
                            <a href="#" data-user_id="${users[i]._id}" class="btn_delete">Eliminar del grupo</a>
                        </div>
                    </div>
                </div>
            `
        }
    }
}

boxSolicitud.addEventListener('click', async(e) =>{

    if(e.target.classList.contains('btn_delete')){
        e.preventDefault()

        if(confirm('Seguro que deseas eliminar lo de este grupo')){

            let ids = {
                groupe_id: _gpId,
                user_id:   e.target.dataset.user_id
            }
            let req = await fetch('/delete-user-groupe/'+JSON.stringify(ids))
            let res = await req.json()
            if(res === 'succes'){
                ui.addUi()
            }
        }
    }
})


const ui = new Ui()
