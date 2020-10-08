const input_search = document.getElementById('input_search')


class Data{
    async getUser(){
        let req = await fetch('/users')
        let res = await req.json()
        return res
    }
}

class Add{
    async searchUser(){
        let users = await data.getUser()
        let showResult = document.getElementById('showResult')
        showResult.innerHTML = ''
        //filtrar el arreglo users para que me devuelve solo los usuarios teacher
        let _users = users.users.filter(element =>{
            return element.category === 'teacher'
        })

        let text = input_search.value.toLowerCase()
        for(let user of _users){
            
            let name = user.name.toLowerCase()
            let lasName = user.lastName.toLowerCase()

            if(name.indexOf(text) !== -1 || lasName.indexOf(text) !== -1){
                showResult.innerHTML += `
                    <a href="/profile/${user._id}" class="box_user_search">
                        <div class="search_user">
                            <div class="img_user">
                                <img src="${user.profileImg ? user.profileImg:'../../img/images.png'}" alt="">
                            </div>
                            <div class="name_user">
                                <p>${user.name} ${user.lastName}</p>
                            </div>
                        </div>
                    </a>
                `
            }
            
        }
        if(showResult.innerHTML == ''){
            showResult.innerHTML += `
                <div href="" class="box_user_search">
                    <div class="search_user">
                        <div class="name_user">
                            <p>Usuario no encontrado</p>
                        </div>
                    </div>
                </div>
            `
        }

    }
}

const data = new Data()
const add = new Add()

input_search.addEventListener('keyup', add.searchUser)