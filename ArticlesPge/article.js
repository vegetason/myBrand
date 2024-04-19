let body=document.querySelector('body')
let theBlogContainer=document.querySelector('#container');
fetch('https://mybrand-backend-emhu.onrender.com/blogs')
    .then(res=>{
        res.json().then(data=>{
            const blogs=data;
            console.log(blogs)
            for(let i=0;i<blogs.length;i++){
                console.log(blogs[i]._id)
                let theDiv=document.createElement('div');
                let thetitle=document.createElement('h1')
                thetitle.textContent=`${blogs[i].title}`
                let thepic=document.createElement('img')
                thepic.setAttribute('src',`${blogs[i].imageUrl}`)
                let thebody=document.createElement('div')
                thebody.textContent=`${blogs[i].body}`
                theDiv.append(thetitle,thepic,thebody);
                theBlogContainer.appendChild(theDiv);
                let theLearnMoreLink=document.createElement('a');
                theLearnMoreLink.setAttribute('id',`${blogs[i]._id}`)
                theLearnMoreLink.setAttribute('href',`../ArticlesPge/readMore.html?id=${theLearnMoreLink.getAttribute('id')}`);
                theLearnMoreLink.textContent='Read more';
                theDiv.appendChild(theLearnMoreLink)
            }
        })
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