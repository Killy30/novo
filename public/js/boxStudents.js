const _users_contain = document.querySelector('#_users_contain')
const students = document.querySelector('#students')
const admin = document.querySelector('#admin')
const id = _users_contain.dataset.idg
const id_ = _users_contain.dataset.id

// const sizeHeight = ()=>{
//     let h = innerHeight;
//     document.querySelector('.box_menbers').style.height = h+'px'
// }
// sizeHeight()


let getData = async() =>{
    let req = await fetch('/room/'+id)
    let res = await req.json()
    return res

}

let addUserOfGroupe = async() =>{
    let room = await getData()
    
    for (let i = 0; i < room.users.length; i++) {
        if(room.users[i]._id == id_){
            admin.innerHTML = `
                <div class="user_box">
                    <div class="user_profile">
                        <img src="${room.users[i].profileImg? users[i].profileImg : '../../img/images.png'}" alt="">
                    </div>
                    <div class="user_name">
                        <p>${room.users[i].name} ${room.users[i].lastName}</p>
                    </div>
                </div>
            `
        }else{
            students.innerHTML += `
                <div class="user_box">
                    <div class="user_profile">
                        <img src="${room.users[i].profileImg? users[i].profileImg : '../../img/images.png'}" alt="">
                    </div>
                    <div class="user_name">
                        <p>${room.users[i].name} ${room.users[i].lastName}</p>
                    </div>
                </div>
            `
        }
    }
}
addUserOfGroupe()