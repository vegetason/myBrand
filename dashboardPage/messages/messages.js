let body=document.querySelector('body')
let theMessageContainer=document.querySelector('#container');
const token = localStorage.getItem('token');
fetch('https://mybrand-backend-emhu.onrender.com/messages',{
    method:'GET',
    'Authorization': `Bearer ${token}`,
})
    .then(res=>{
        res.json().then(data=>{
            const messages=data;
            console.log(messages)
            for(let i=0;i<messages.length;i++){
                let theDiv=document.createElement('div');
                let email=document.createElement('div')
                email.textContent=`${messages[i].email}`
                console.log(messages[i].email,messages[i].Content)
                let thebody=document.createElement('div')
                thebody.textContent=`${messages[i].Content}`

                theMessageContainer.appendChild(email,thebody);
                theMessageContainer.appendChild(theDiv);
                let removebutton=document.createElement('button');
                removebutton.setAttribute('id',`${messages[i]._id}`);
                // theDiv.appendChild(removebutton);
                removebutton.textContent='Remove Message',
                removebutton.addEventListener('click',()=>{
                    let id=removebutton.getAttribute('id')
                    console.log(id)
                    deleteBlog(id);
                })
                theDiv.appendChild(removebutton);
            }
        })
    });