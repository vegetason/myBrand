let lists=document.querySelector('ol')
const token = localStorage.getItem('token');
const decode = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));


let userId=localStorage.getItem('userId');
if(token===null || userId!=='661f937a29bd0474b48feab4'){
    let html=document.querySelector('html')
    html.setAttribute('style','display:none;')
    window.location.href='../loginPage/login.html';
    localStorage.clear();
}
else{
    let html=document.querySelector('html')
    html.removeAttribute('style')
}
fetch('http://localhost:8080/subscribers',{
    headers:{
        "Content-Type":"application/json",
        'Authorization': `Bearer ${token}`
    },
})
.then(res=>{
    res.json().then(data=>{
        const Subscribers=data;
        for(let i=0;i<Subscribers.length;i++){
            let list =document.createElement('li')
            list.textContent=`${Subscribers[i].email}`
            lists.appendChild(list)
        }
        console.log(Subscribers);
    })
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