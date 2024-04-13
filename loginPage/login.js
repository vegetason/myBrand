let userName=document.querySelector('#username');
let Password=document.querySelector('#Password');
let form=document.querySelector('form');
let feedBack=document.querySelector('#feedback');
form.addEventListener('submit',async (e)=>{
     e.preventDefault();
     let email=document.getElementById('email').value;
     let password=document.getElementById('Password').value;
     console.log(email,password);
     fetch("http://localhost:8080/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email:`${email}`,
            password:`${password}`
        })
     })
.then(res=>{
    if(res.status===200){
        feedBack.textContent='Login Successfull';
        console.log(res)
    }
    else if(res.status!==200){
        feedBack.textContent='';
        feedBack.textContent='Login unsuccessful check your email or pasword';
        console.log(res)
    }
});

});