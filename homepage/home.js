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
// let lists=document.querySelectorAll('li')
// let a=document.querySelector('a');
// let svg=document.querySelector('svg')
// lists.forEach(li=>{
//     li.addEventListener('mouseover',()=>{
//         li.style.borderBottom='1px solid black';
//         svg.style.fill='#FFB703'
//         a.style.color='#FFB703'
//     })
// })  
const token=localStorage.getItem('token')
const getUserIdFromToken = token => {
  const decodedToken = JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/'))));
  return decodedToken.userId || null;
};

if(token!==null){
  const userId = getUserIdFromToken(token);
console.log(userId);
  fetch('https://mybrand-backend-emhu.onrender.com/users')
.then(res=>{
  res.json().then(data=>{
      console.log(data)
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
