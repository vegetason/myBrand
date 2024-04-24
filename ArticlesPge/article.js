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
                const decodedToken=decode(token);
                theLearnMoreLink.setAttribute('href',`${createElementPageLink(theLearnMoreLink.getAttribute('id'),decodedToken)}`);
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
let subBtn=document.querySelector('#sub');
subBtn.addEventListener('click',()=>{
    let email= document.getElementById('email').value;
    console.log(email)
    if(email.match( /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g)!==null){
        fetch('https://mybrand-backend-emhu.onrender.com/subscribe',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:`${email}`
            })
        }).then(res=>{
            console.log(res,email)
        })
    }
})
function createElementPageLink(id1,id2){

    // Concatenate the IDs with a delimiter
    const encodedIds = encodeURIComponent(id1 + '|' + id2);

    // Use the encoded IDs in your URL
    const url = `../ArticlesPge/readMore.html?ids=${encodedIds}`;
    return url;

}
const decode = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
const token = localStorage.getItem('token');
