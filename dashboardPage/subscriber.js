let lists=document.querySelector('ol')
fetch('http://localhost:8080/subscribers')
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