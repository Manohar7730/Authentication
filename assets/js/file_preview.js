function previewFile(){
    const preview = document.querySelector('#avatar-preview');
    const file = document.querySelector('#avatar').files[0];
    const reader = new FileReader();

    reader.addEventListener('load',function(){
        preview.src = reader.result;
        preview.style.display = "block"
    },false)

    if(file){
        reader.readAsDataURL(file);
    }
}