let userName=document.querySelector('#username');
let Password=document.querySelector('#Password');
let form=document.querySelector('form');
form.addEventListener('click',(e)=>{
    if(userName.value==='irakozepirlo@gmail.com' && Password.value==='Hardock76()'){
        alert('login successful')
    }
})