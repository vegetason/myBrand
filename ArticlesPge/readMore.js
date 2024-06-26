let content=document.querySelector('#content');
let title=document.querySelector('h1');
let image=document.querySelector('#image');
let commentsContainer=document.querySelector('#commentsContainer')
let login=document.querySelector('#login');
login.removeAttribute('style');
let dialog1=document.querySelector('#dialog1')
let yesbtn=document.querySelector('#Yes');
let nobtn=document.querySelector('#No');
let okbtn=document.querySelector('#Ok')
let dialog2=document.querySelector('#dialog2')
const token = localStorage.getItem('token');
var url = window.location.href;

// function getParameterByName(name, url) {
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// // Retrieve the id parameter
// var idValue = getParameterByName('id', url);

// Retrieve the query parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const encodedIds = urlParams.get('ids');

// Decode the query parameter
const decodedIds = decodeURIComponent(encodedIds);

// Split the decoded IDs based on the delimiter
const [id, userIdData] = decodedIds.split('|');

const userIdObj = JSON.parse(userIdData);
let userId;
if(userIdObj===null) userId=0;

 userId = userIdObj;



let likesNbr=document.querySelector('#likesNumber');
likesNbr.textContent=`Likes:0`
fetch('https://mybrand-backend-emhu.onrender.com/blogs')
    .then(res=>{
        res.json().then(data=>{
            const blogs=data;
            for(let i=0;i<blogs.length;i++){
                if(blogs[i]._id===id){
                    image.setAttribute('src',`${blogs[i].imageUrl}`)
                    content.textContent=`${blogs[i].body}`
                    title.textContent=`${blogs[i].title}`
                    likesNbr.textContent=`Likes: ${blogs[i].likes.length}`
                    let comment= blogs[i].comment
                    comment.forEach(n=>{
                        let comments=document.createElement('div')
                        let theDiv=document.createElement('div');
                        let time=document.createElement('div')
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
    okbtn.addEventListener('click',()=>{
        dialog2.close();
    })
    let commentBtn=document.querySelector('#comment')
    commentBtn.addEventListener('click',()=>{
        let commentText=document.querySelector('textarea').value;
        fetch(`https://mybrand-backend-emhu.onrender.com/createComment/${id}/user/${userId}`,{
            method:'post',
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                text:`${commentText}`
            })
        }).then(res=>{
            if (res.status===200) window.location.reload();
            else {
                dialog2.showModal()
            }
        })
    })
    let likeBtn=document.querySelector('#like');
    likeBtn.addEventListener('click',()=>{
        fetch(`https://mybrand-backend-emhu.onrender.com/like/${id}/user/${userId}`,{
            method:'post',
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
            },
        }).then(res=>{
            if(res.status===200) window.location.reload();
            else {
                dialog2.showModal()
            }
        })
    })
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