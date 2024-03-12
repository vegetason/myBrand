let form=document.querySelector('form')
let emailText=document.querySelector('#emailText')
let nameText=document.querySelector('#nameText')
let messageText=document.querySelector('#messagetext')
let characters=document.querySelector('#characters')
let textarea=document.querySelector('textarea')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let email=document.getElementById('email').value;
    let fullname=document.getElementById('name').value;
    let theMesssage=document.getElementById('messages').value;
    if(email!==''){
        if(email.match( /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g)===null){
            emailText.textContent='Your email is not complete.Try again'
            emailText.style.color='red';
        }
        else{
            emailText.textContent='email approved'
            emailText.style.color='green';
            emailText.style.paddingLeft='30px'
        }
    }
    else if(email===""){
        emailText.textContent='email cannot be empty'
        emailText.style.color='red';
        emailText.style.paddingLeft='30px'
    }
    if(fullname===''){
        nameText.textContent='name cannot be empty'
        nameText.style.color='red'
        nameText.style.paddingLeft='30px'
    }
    else{
        nameText.textContent=''
    }
    if(theMesssage.length<50){
        messageText.textContent='The message cannot go under 50 characters'
        messageText.style.color='red'
        messageText.style.paddingLeft='30px'
    }
    else{
        messageText.textContent=''
    }
})
textarea.addEventListener('input',()=>{
    characters.textContent=`characters:${textarea.value.length}`
    characters.style.paddingLeft='30px'
})