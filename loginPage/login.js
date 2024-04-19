let form= document.querySelector('form');
let feedBack=document.querySelector('#feedback');
form.addEventListener('submit',async (e)=>{
     e.preventDefault();
     let email=document.getElementById('email').value;
     let password=document.getElementById('Password').value;
     console.log(email,password);
     fetch("https://mybrand-backend-emhu.onrender.com/auth/login",{
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
    res.json().then(data=>{

    window.location.href = "../dashboardPage/dashboard.html";
    var role = data.user.userRole;
    var token= data.token;
    var email= data.user.email;
    var userId= data.user._id;
    var name = data.user.username;
    console.log(token,email,userId,name);
    localStorage.setItem('token',token)

    if (email === 'irakozepaulin1234@gmail.com') {
        localStorage.setItem('adminIsLoggedIn', true);
        localStorage.setItem('currentUserEmail', email);
        localStorage.setItem('currentUsername', name);
        localStorage.setItem('userId', userId);
        window.location.href = "../dashboardPage/dashboard.html";
    } else {
        localStorage.setItem('userIsLoggedIn', true);
        localStorage.setItem('currentUserEmail', email);
        localStorage.setItem('currentUsername', name);
        localStorage.setItem('userId', userId);
        window.location.href = "../homepage/index.html";
        
    }
    })
})

window.onload = function() {
var userIsLoggedIn = localStorage.getItem('userIsLoggedIn');
var adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn');

if (userIsLoggedIn) {
    window.location.href = "homepage/index.html";
} else if (adminIsLoggedIn) {
    window.location.href = "/dashboardPage/index.html";
}
}
});
let hamburger=document.querySelector('.hamburger');
let navLinks=document.querySelectorAll('.navLink');
let navBar=document.querySelector('#navBar');
hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('active');
    navBar.classList.toggle('active');
})
navLinks.forEach(link=>{
    link.addEventListener('click',()=>{
        navBar.classList.toggle('active');
        hamburger.classList.toggle('active');
    })
})
