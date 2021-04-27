
console.log('jjjj');
const btn_cancelForm = document.getElementById('btn_cancel')
const btn_openForm = document.getElementById('btn_openForm')


const close_tab = document.getElementById('close_tab')
close_tab.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.remove('_active')
})

btn_openForm.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay_task').classList.add('active')
})

btn_cancelForm.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay_task').classList.remove('active')
})
