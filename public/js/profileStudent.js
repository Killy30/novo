const card_body = document.getElementById('card_body')
let _id = card_body.dataset.id
const btn_agregar = document.querySelector('#agregar')
const overlay = document.getElementById('overlay')

btn_agregar.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.add('active')
})

overlay.addEventListener('click', (e)=>{
    if(e.target.classList.contains('overlay')){
        document.querySelector('.overlay').classList.remove('active')
    }
})





class Getting{
    async getGroupes(){
        const req = await fetch('/get-my-user')
        const res = await req.json()
        return res
    }
}


class Ui{
    async showGroupes(){
        const user = await getting.getGroupes()
        card_body.innerHTML =''
        
        for(let i = 0; i < user.groupes.length; i++){
            let status = user.groupes[i].students.includes(_id)
           
            card_body.innerHTML += `
            <div class="box_a">
                <div class="box_b">${user.groupes[i].name} ${user.groupes[i].nivel}</div>
                ${
                    status?''
                    :`<a href="" class="unir" data-id="${user.groupes[i]._id}">Unir a esta curso</a>`
                }
                
            </div>`
        }
    }
}


card_body.addEventListener('click', async(e) =>{
    
    if(e.target.classList.contains('unir')){
        e.preventDefault()

        let ids = {
            groupe_id: e.target.dataset.id,
            user_id: _id
        }
    
        let req = await fetch('/accept-user/'+JSON.stringify(ids))
        let res = await req.json()

        if(res === 'succes'){
            ui.showGroupes()
        }
        
    }
})

const getting = new Getting()
const ui = new Ui()

ui.showGroupes()