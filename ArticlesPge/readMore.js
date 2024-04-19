let content=document.querySelector('#content');
let title=document.querySelector('h1');
let image=document.querySelector('#image');
let commentsContainer=document.querySelector('#commentsContainer')

var url = window.location.href;

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Retrieve the id parameter
var idValue = getParameterByName('id', url);

fetch('https://mybrand-backend-emhu.onrender.com/blogs')
    .then(res=>{
        res.json().then(data=>{
            const blogs=data;
            console.log(blogs)
            for(let i=0;i<blogs.length;i++){
                if(blogs[i]._id===idValue){
                    image.setAttribute('src',`${blogs[i].imageUrl}`)
                    content.textContent=`${blogs[i].body}`
                    title.textContent=`${blogs[i].title}`
                    let comment= blogs[i].comment
                    console.log(blogs[i].comment)
                    comment.forEach(n=>{
                        let comments=document.createElement('div')
                        let theDiv=document.createElement('div');
                        let time=document.createElement('div');
                        theDiv.textContent=`${n.text}`
                        time.textContent=`Created at:${n.createdAt}`
                        comments.append(theDiv,time)
                        commentsContainer.appendChild(comments)
                    })
                    break
                }
                else continue
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