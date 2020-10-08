const btn_cancel = document.getElementById('btn_cancel')
const btn_open = document.getElementById('btn_open')



btn_open.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.add('active')
})

btn_cancel.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.remove('active')
})
