const btn_cancel = document.getElementById('btn_cancel')
const btn_cancel_two = document.getElementById('btn_cancel_two')
const btn_open = document.getElementById('btn_open')
const tab_ul = document.getElementById('my_Tab')
const overlay = document.getElementById('overlay')



btn_open.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.add('active')
})

btn_cancel.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.remove('active')
})

btn_cancel_two.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.overlay').classList.remove('active')
})

overlay.addEventListener('click', (e)=>{
    if(e.target.classList.contains('overlay')){
        document.querySelector('.overlay').classList.remove('active')
    }
})

tab_ul.addEventListener('click', e =>{
    if(e.target.classList.contains('item_two')){
        e.preventDefault()
        document.querySelector('.item_one').classList.remove('item_active')
        document.querySelector('.item_two').classList.add('item_active')
        document.getElementById('tab_panel_one').style.display='none'
        document.getElementById('tab_panel_two').style.display='block'
    }
    if(e.target.classList.contains('item_one')){
        e.preventDefault()
        document.querySelector('.item_two').classList.remove('item_active')
        document.querySelector('.item_one').classList.add('item_active')
        document.getElementById('tab_panel_two').style.display='none'
        document.getElementById('tab_panel_one').style.display='block'
    }
})