let form= document.querySelector('form');
let feedBack=document.querySelector('#feedback');
let okbtn=document.querySelector('#Ok')
let dialog2=document.querySelector('#dialog2')
let dialog1=document.querySelector('#dialog1')
let yesbtn=document.querySelector('#Yes');


okbtn.addEventListener('click',()=>{
    dialog2.close();
})
form.addEventListener('submit',async (e)=>{
     e.preventDefault();
     let email=document.getElementById('email').value;
     let password=document.getElementById('Password').value;
     fetch("https://mybrand-backend-emhu.onrender.com/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email:`${email}`,
            password:`${password}`
        })
     })
.then(res=>{
    if(res.status===201){
        res.json().then(data=>{
            var role = data.user.userRole;
            var token= data.token;
            var email= data.user.email;
            var userId= data.user._id;
            var name = data.user.username;
            localStorage.setItem('token',token)
        
            if (email === 'irakozepaulin1234@gmail.com') {
                localStorage.setItem('adminIsLoggedIn', true);
                localStorage.setItem('currentUserEmail', email);
                localStorage.setItem('currentUsername', name);
                localStorage.setItem('userId', userId);
                dialog1.showModal();
                yesbtn.addEventListener('click',()=>{
                window.location.href = "../dashboardPage/dashboard.html";
                })
            } else {
                
                localStorage.setItem('userIsLoggedIn', true);
                localStorage.setItem('currentUserEmail', email);
                localStorage.setItem('currentUsername', name);
                localStorage.setItem('userId', userId);
                dialog1.showModal();
                yesbtn.addEventListener('click',()=>{
                window.location.href = "../homepage/index.html";
                })
            }
            })
    }
    else if(res.status!==201){
        dialog2.showModal()
    }
  
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
const token=localStorage.getItem('token')
const getUserIdFromToken = token => {
  const decodedToken = JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/'))));
  return decodedToken.userId || null;
};

if(token!==null){
  const userId = getUserIdFromToken(token);
  fetch('https://mybrand-backend-emhu.onrender.com/users')
.then(res=>{
  res.json().then(data=>{
      const users=data;
      users.forEach(user=>{

          if (userId!=='661f937a29bd0474b48feab4' && userId===user._id){
              let delLink=document.createElement('a')
              let delTitle=document.createElement('h3')
              let LogLink=document.createElement('a')
              let LogTitle=document.createElement('h3')
              LogTitle.textContent='Log Out',
              LogLink.setAttribute('href','../loginPage/login.html')
              LogLink.appendChild(LogTitle)
              navBar.appendChild(LogLink)
              delTitle.textContent='Delete Account'
              delLink.appendChild(delTitle)
              navBar.appendChild(delLink)
              LogLink.addEventListener('click',()=>{
                  localStorage.clear();
              })
              delLink.addEventListener('click',()=>{
                  fetch(`https://mybrand-backend-emhu.onrender.com/users/${user._id}`,{
                      method:'delete',
                      headers:{
                          "Content-Type":"application/json",
                          'Authorization': `Bearer ${token}`
                  }
                  })
                  .then(res=>{
                      if(res.status===200){
                          localStorage.clear();
                          window.location.reload();
                      }
                  })
              })
          }
      })
  })
})
}
