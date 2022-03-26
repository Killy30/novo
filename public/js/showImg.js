
( ()=>{
    let image = document.getElementById('files');
    
    image.addEventListener('change', (e)=> {
        var imgId = Math.floor(Math.random() * 30000) + '_' + Date.now();
        createImages(image, imgId)
    })

    function createImages(img, id){
        var divImg = document.createElement('div');
        divImg.classList.add('divImg', id);
        divImg.dataset.id = id;
        document.getElementById('preView-img').innerHTML = ""
        divImg.setAttribute('style', `background-image: url(${URL.createObjectURL( img.files[0])})`);
        document.getElementById('preView-img').appendChild(divImg)
    }
})()