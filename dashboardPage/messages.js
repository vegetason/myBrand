let body=document.querySelector('body')
let table=document.querySelector('table')
const token = localStorage.getItem('token');
fetch('https://mybrand-backend-emhu.onrender.com/messages',{
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
                    fetch(`https://mybrand-backend-emhu.onrender.com/deleteMessage/${tableData1.getAttribute('id')}`,{
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