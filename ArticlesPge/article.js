let openModals=document.querySelectorAll('.img');
let closeModal=document.querySelector('#back');
let modal=document.querySelector('dialog')
openModals.forEach(img=>{
    img.addEventListener('click',()=>{
        modal.showModal()
    })
})
closeModal.addEventListener('click',()=>{
    modal.close();
})