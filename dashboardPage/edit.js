let content=document.querySelector('#content');
let title=document.querySelector('#title');
let image=document.querySelector('#imgUrl');
const token = localStorage.getItem('token');

let dialog1=document.querySelector('#dialog1')
let yesbtn=document.querySelector('#Yes');
let nobtn=document.querySelector('#No');

var url = window.location.href;
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

fetch('https://mybrand-backend-emhu.onrender.com/blogs',
)
    .then(res=>{
        res.json().then(data=>{
            const blogs=data;
            console.log(blogs)
            for(let i=0;i<blogs.length;i++){
                if(blogs[i]._id===idValue){
                    content.value=`${blogs[i].body}`
                    title.value=`${blogs[i].title}`
                    console.log(blogs[i].imageUrl)
                    image.value=`${blogs[i].imageUrl}`
                    console.log(blogs[i].imageUrl)
                    break
                }
                else continue
            }
        })
    });
    let editBtn=document.querySelector('#editbtn');
    
    editBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        dialog1.showModal();
    })

    yesbtn.addEventListener('click',(e)=>{
        e.preventDefault()
        fetch(`https://mybrand-backend-emhu.onrender.com/updateBlog/${idValue}`,{

            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                body:`${content.value}`,
                title:`${title.value}`,
                imageUrl:`${image.value}`
            })

        }).then(res=>{if(res.status===200)window.location.href='./dashboard.html';
                           else alert('Error occured')
                     })
    })
    nobtn.addEventListener('click',()=>{
        dialog1.close()
    })
    let back=document.querySelector('#back');
    back.addEventListener('click',()=>{window.location.href='./dashboard.html'})