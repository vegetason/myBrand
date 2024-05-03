let form=document.querySelector('form')
let emailText=document.querySelector('#emailText')
let nameText=document.querySelector('#nameText')
let messageText=document.querySelector('#messagetext')
let characters=document.querySelector('#characters')
let textarea=document.querySelector('textarea')
let login=document.querySelector('#login');
login.removeAttribute('style');
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
    if(email!=='' && email.match( /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g)!==null && theMesssage.length>=50 && fullname!==''){
        e.preventDefault()
        console.log(email,theMesssage)
        fetch('https://mybrand-backend-emhu.onrender.com/createMessage',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:`${email}`,
                Content:`${theMesssage}`,
            })
    
        })
        .then(res=>{
            if(res.status===200){
                alert('message Sent successfully')
            };
            console.log(res)
        })
        .catch(error=>{console.log(error)})
    }
    }
)
textarea.addEventListener('input',()=>{
    characters.textContent=`characters:${textarea.value.length}`
    characters.style.paddingLeft='30px'
})
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
console.log(userId);
  fetch('https://mybrand-backend-emhu.onrender.com/users')
.then(res=>{
  res.json().then(data=>{
      console.log(data)
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
