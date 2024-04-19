let content=document.querySelector('#content');
let title=document.querySelector('#title');
let image=document.querySelector('#imgUrl');

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
        e.preventDefault()
        fetch(`https://mybrand-backend-emhu.onrender.com/updateBlog/${idValue}`,{

            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                body:`${content.value}`,
                title:`${title.value}`,
                imageUrl:`${image.value}`
            })

        }).then(res=>{if(res.status===200)window.location.href='./dashboard.html';
                           else alert('Error occured')
                     })
    })
    let back=document.querySelector('#back');
    back.addEventListener('click',()=>{window.location.href='./dashboard.html'})