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