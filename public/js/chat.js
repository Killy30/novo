let socket = io()
let box_chat = document.getElementById('box_chat')
let administrator = document.querySelector('#administrator')
let form_chat = document.getElementById('form_chat')
let show_message = document.getElementById('show_message')

let _idg = box_chat.dataset.idg 
let _id = box_chat.dataset.id
let _userId = show_message.dataset.id

import DataRequest from './DataRequest.js';

const sizeHeight = ()=>{
    let h = innerHeight - 90;
    document.querySelector('.contain').style.height = h+'px'
}
sizeHeight()


let showAllMessage = async() =>{
    let room = await DataRequest(`/room/${_idg}`)

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
                        ${ messages[i].file ? `<img class="file_upload" src="${messages[i].file}" alt=""></img>`:``}
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }else if(room.groupeId.teacher != _userId && room.groupeId.teacher ===  messages[i].myId){
           
            show_message.innerHTML +=`
                <div class="bjsd">
                    <div class="msg_hsd_pro">
                        <div class="msg_name_o_pro">
                            ${ messages[i].file ? `<img class="file_upload" src="${messages[i].file}" alt=""></img>`:``}
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
                        ${ messages[i].file ? `<img class="file_upload" src="${messages[i].file}" alt=""></img>`:``}
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
                        ${ messages[i].file ? `<img class="file_upload" src="${messages[i].file}" alt=""></img>`:``}
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
  
    for(let i = 0; i < messages.length; i++){

        let user = users.find((u)=>{
            return u._id == messages[i].myId
        })

        if(data.room.groupeId.teacher === _userId && data.room.groupeId.teacher ===  messages[i].myId){
            
            show_message.innerHTML +=`
                <div class="bjsd_my">
                    <div class="msg_hsd_my_pro">
                        ${ messages[i].file ? `<img class="file_upload" src="${messages[i].file}" alt=""></img>`:``}
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
                        ${ messages[i].file ? `<img class="file_upload" src="${messages[i].file}" alt=""></img>`:``}
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }else if(messages[i].myId === _userId && data.room.groupeId.teacher != _userId){
          
            show_message.innerHTML +=`
                <div class="bjsd_my">
                    <div class="msg_hsd_my">
                        ${ messages[i].file ? `<img class="file_upload" src="${messages[i].file}" alt=""></img>`:``}
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
                        ${ messages[i].file ? `<img class="file_upload" src="${messages[i].file}" alt=""></img>`:``}
                        <p>${messages[i].message.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>
            `
        }
    }
    let x = show_message.scrollHeight
    show_message.scrollBy(0, x);
}

// show users

const showUser = async()=>{
    const boxUsers = document.querySelector('.show_student_connect')
    let room = await DataRequest(`/room/${_idg}`)

    let users = room.users.filter(u =>{
        return u.category != 'teacher'
    })
    
    users.forEach(user =>{
        console.log(user)
        boxUsers.innerHTML += `
            <div>
                <p>${user.name} ${user.lastName}</p>
            </div>
        `
    })
}
showUser()


// emit message

socket.emit('join-room', {
    idGroupe: _idg
})

socket.on('message', (data)=>{
    addMessage(data)
})

const messageToSend = async(e)=>{
    e.preventDefault()
    let text = document.getElementById('text').value
    let file = document.getElementById('files').files

    
    if(file.length === 0 && text.trim() === '') return false

    const formData = new FormData()
    formData.append('filesChat', file[0])
    formData.append('message', text)
    formData.append('userId', _userId)
    formData.append('idGroupe', _idg)

    if(file.length === 0){
          // socket.emit('message-emit',formData)

        socket.emit('message-emit',{
            idGroupe: _idg,
            message: text,
            userId: _userId,
        })
    }else{
        if((/\.(jpg|jpeg|png|gif|JPG)$/i).test(file[0].name)){
            fetch('/filesUpload', {
                method: 'POST', 
                body: formData,
            })
            .then(res => res.json())
            .then(data =>{
                
            })
        }else{
            alert('El tipo de archivo que usted a subido no es aceptado en este chat, favor de subir otro tipo de archivo ')
        }
    }

    form_chat.reset()
}

form_chat.addEventListener('submit', messageToSend)

let text = document.getElementById('text')
text.addEventListener('keydown', e =>{
    let key = event.which || event.keyCode;
    console.log(e.shiftKey);
    if(key === 13 && !e.shiftKey){
        messageToSend(e)
    }
})
