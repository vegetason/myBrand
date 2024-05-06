let hamburger=document.querySelector('.hamburger');
let navLinks=document.querySelectorAll('.navLink');
let navBar=document.querySelector('#navBar');
let login=document.querySelector('#login');

let dialog1=document.querySelector('#dialog1')
let yesbtn=document.querySelector('#Yes');
let nobtn=document.querySelector('#No');

login.removeAttribute('style');
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
            login.setAttribute('style','display:none;')
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
                dialog1.showModal()
            })
            yesbtn.addEventListener('click',()=>{
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
            });
            nobtn.addEventListener('click',()=>{
                dialog1.close()
            })
          }
      })
  })
})
}
