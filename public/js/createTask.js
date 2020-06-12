const div_Type_File = document.getElementById('div_Type_File')
const div_welcome = document.getElementById('div_welcome')
const div_type_Texto = document.getElementById('div_type_Texto')
const div_type_image = document.getElementById('div_type_image')


const archivo = document.getElementById('archivo')
const texto = document.getElementById('texto')
const image = document.getElementById('image')




archivo.addEventListener('click', (e) =>{
    e.preventDefault();
   
    if (div_type_Texto.style.display == 'block') {
        div_type_Texto.style.display='none';
    }else if (div_welcome.style.display == 'block') {
        div_welcome.style.display='none';
    }else if (div_type_image.style.display == 'block') {
        div_type_image.style.display='none';
    }

    if (div_Type_File.style.display == 'none') {
        div_Type_File.style.display='block';
    }else if (div_Type_File.style.display == 'block') {
        div_Type_File.style.display='none';
        div_welcome.style.display='block';
    }
})

texto.addEventListener('click', (e) =>{
    e.preventDefault();
   
    if (div_welcome.style.display == 'block') {
        div_welcome.style.display='none';
    }else if (div_Type_File.style.display == 'block') {
        div_Type_File.style.display='none';
    }else if (div_type_image.style.display == 'block') {
        div_type_image.style.display='none';
    }

    if (div_type_Texto.style.display == 'none') {
        div_type_Texto.style.display='block';
    }else if (div_type_Texto.style.display == 'block') {
        div_type_Texto.style.display='none';
        div_welcome.style.display='block';
    }
})

image.addEventListener('click', (e) =>{
    e.preventDefault();
   
    if (div_welcome.style.display == 'block') {
        div_welcome.style.display='none';
    }else if (div_Type_File.style.display == 'block') {
        div_Type_File.style.display='none';
    }else if (div_type_Texto.style.display == 'block') {
        div_type_Texto.style.display='none';
    }

    if (div_type_image.style.display == 'none') {
        div_type_image.style.display='block';
    }else if (div_type_image.style.display == 'block') {
        div_type_image.style.display='none';
        div_welcome.style.display='block';
    }
})