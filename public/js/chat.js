let socket = io()
let box_chat = document.getElementById('box_chat')
let administrator = document.querySelector('#administrator')
let form_chat = document.getElementById('form_chat')
let show_message = document.getElementById('show_message')

let _idg = box_chat.dataset.idg 
let _id = box_chat.dataset.id
let _userId = show_message.dataset.id

const sizeHeight = ()=>{
    let h = innerHeight;
    document.querySelector('.contain').style.height = h+'px'
}
sizeHeight()


let getData_ = async() =>{
    let req = await fetch('/room/'+_idg)
    let res = await req.json()
    return res

}


let showAllMessage = async() =>{
    let room = await getData_()
    let messages = room.messages
    show_message.innerHTML = ''

    for(let i = 0; i < messages.length; i++){

        let user = room.users.find((u)=>{
            return u._id == messages[i].myId
        })

        if(room.groupeId.teacher === _userId && room.groupeId.teacher ===  messages[i].myId){
            
            show_message.innerHTML +=`
                <div class="bjsd_my">
                    <div class="msg_hsd_my_pro">
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }else if(room.groupeId.teacher != _userId && room.groupeId.teacher ===  messages[i].myId){
           
            show_message.innerHTML +=`
                <div class="bjsd">
                    <div class="msg_hsd_pro">
                        <div class="msg_name_o_pro">
                            <p>${user.name} ${user.lastName}</p>
                        </div>
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }else if(messages[i].myId === _userId && room.groupeId.teacher != _userId){
           
            show_message.innerHTML +=`
                <div class="bjsd_my">
                    <div class="msg_hsd_my">
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }else if(messages[i].myId != _userId && room.groupeId.teacher != messages[i].myId){
            
            show_message.innerHTML +=`
                <div class="bjsd">
                    <div class="msg_hsd">
                        <div class="msg_name_o">
                            <p>${user == undefined? 'Usuario Eliminado':`${user.name} ${user.lastName}`}</p>
                        </div>
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }
    }
    let x = show_message.scrollHeight
    show_message.scrollBy(0, x);
}
showAllMessage()

let addMessage = (data) =>{
    let messages = data.room.messages
    let users = data.room.users
    show_message.innerHTML = ''
    console.log(data.room.groupeId);
    for(let i = 0; i < messages.length; i++){

        let user = users.find((u)=>{
            return u._id == messages[i].myId
        })

        if(data.room.groupeId.teacher === _userId && data.room.groupeId.teacher ===  messages[i].myId){
            
            show_message.innerHTML +=`
                <div class="bjsd_my">
                    <div class="msg_hsd_my_pro">
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }else if(data.room.groupeId.teacher != _userId && data.room.groupeId.teacher ===  messages[i].myId){
        
            show_message.innerHTML +=`
                <div class="bjsd">
                    <div class="msg_hsd_pro">
                        <div class="msg_name_o_pro">
                            <p>${user.name} ${user.lastName}</p>
                        </div>
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }else if(messages[i].myId === _userId && data.room.groupeId.teacher != _userId){
          
            show_message.innerHTML +=`
                <div class="bjsd_my">
                    <div class="msg_hsd_my">
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }else if(messages[i].myId != _userId && data.room.groupeId.teacher != messages[i].myId){
            
            show_message.innerHTML +=`
                <div class="bjsd">
                    <div class="msg_hsd">
                        <div class="msg_name_o">
                            <p>${user == undefined? 'Usuario Eliminado':`${user.name} ${user.lastName}`}</p>
                        </div>
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }
    }
    let x = show_message.scrollHeight
    show_message.scrollBy(0, x);
}


socket.emit('join-room', {
    idGroupe: _idg
})

socket.on('message', (data)=>{
    addMessage(data)
})

form_chat.addEventListener('submit', (e) =>{
    e.preventDefault()
    let text = document.getElementById('text').value

    socket.emit('message-emit',{
        idGroupe: _idg,
        message: text,
        userId: _userId
    })

    form_chat.reset()
})