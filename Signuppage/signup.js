let fullname=document.getElementById('fullname').value;
let email=document.getElementById('email').value;
let userName=document.getElementById('username').value;
let password=document.getElementById('Password').value;
let coPasssword=document.getElementById('co-password').value;
let errorElement=document.getElementById('error')
let form=document.querySelector('form')
// function createUser(fullname,email,password,coPasssword){
//     fullname=document.getElementById('fullname').value;
//     email=document.getElementById('email').value;
//     userName=document.getElementById('username').value;
//     password=document.getElementById('Password').value;
//     coPasssword=document.getElementById('co-password').value;
//     this.fullname=fullname;
//     this.email=email;
//     this.password=password;
//     this.coPasssword=coPasssword;
// }
let users=[];
function checkPassword(){
    console.log(password,coPasssword)
    if(coPasssword===password){
        errorElement.style.backgroundColor='green'
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    checkPassword()
    // let user=createUser(fullname,email,password,coPasssword)
    console.log(coPasssword,password)
    let message=[];
    // if(fullname==='' || fullname===null){
    //     e.preventDefault()
    //     message.push('Name is required')
    //     errorElement.textContent=message.join(',')
    // }
})