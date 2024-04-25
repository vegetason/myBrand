let body=document.querySelector('body')
let table=document.querySelector('table')
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
fetch('http://localhost:8080/messages',{
    method:'GET',
    'Authorization': `Bearer ${token}`,
})
    .then(res=>{
        res.json().then(data=>{
            const messages=data;
            if(messages.length===0){
                alert('No messages for you')
            }
            messages.forEach(message=>{
                let tableRow=document.createElement('tr');
                let tableData1=document.createElement('td');
                let tableData2=document.createElement('td');
                let tableData3=document.createElement('td');
                let delBtn=document.createElement('button')
                delBtn.textContent='Delete';
                tableData1.setAttribute('id',`${message._id}`)
                tableData1.textContent=`${message.email}`;
                tableData2.textContent=`${message.Content}`;
                tableData3.appendChild(delBtn)
                tableRow.append(tableData1,tableData2,tableData3);
                table.append(tableRow)
                delBtn.addEventListener('click',()=>{
                    fetch(`http://localhost:8080/deleteMessage/${tableData1.getAttribute('id')}`,{
                        method:'delete',
                        // headers: {
                        //     'Authorization': `Bearer ${token}`,
                        // },
                    })
                    .then(res=>{
                        if(res.status===200) window.location.reload();
                    })
                })
            })
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