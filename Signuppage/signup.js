let form=document.querySelector('form');
let FullnameTExt=document.querySelector('#fullnametext');
let emailText=document.querySelector('#emailText');
let usernameText=document.querySelector('#usernameText')
let passwordText=document.querySelector('#passwordText')
let copasswordText=document.querySelector('#copassText')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let password=document.getElementById('Password').value;
    let copassword=document.getElementById('co-password').value;
    let Fullname=document.getElementById('fullname').value;
    let username=document.getElementById('username').value;
    let email=document.getElementById('email').value;
    if(Fullname===''||Fullname===null||Fullname.match(/[^A-Za-z\s]/g)!==null||email.match( /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g)===null||email===""||email===null||username.length<10 ||username.length>20||username.match(/\W/g)!==null||username===''||username===null||password.length<=8||password.match(/['"$/ ]/g)!=null||password.match(/[0-9]/g)===null||password.match( /[^a-zA-Z0-9'"\/$]/g)===null||password.length>15||password===''||password==='null'||password!==copassword){
        e.preventDefault();
    // let user=createUser(Fullname,username,pass,copass)
    // users.push(user)
    console.log(password)
    if(Fullname!==''){
        if(Fullname.match(/[^A-Za-z\s]/g)!==null){
            FullnameTExt.textContent='Full name cannot include characters which are not letters and space'
            FullnameTExt.style.color='red'
        }
        else{
            FullnameTExt.textContent='Full name approved'
            FullnameTExt.style.color='green'
        }
    }
    else if(Fullname===''){
        FullnameTExt.textContent='Full name cannot be empty'
        FullnameTExt.style.color='red'
    }
    if(email!==''){
        if(email.match( /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g)===null){
            emailText.textContent='Your email is not complete.Try again'
            emailText.style.color='red';
        }
        else{
            emailText.textContent='email approved'
            emailText.style.color='green';
        }
    }
    else if(email===""){
        emailText.textContent='email cannot be empty'
        emailText.style.color='red';
    }
    if(username!==""){
        if (username.length<10){
            usernameText.textContent='username cannot go under 10 characters';
            passwordText.style.color='red'
        }
        else if (username.length>20){
            usernameText.textContent='username cannot exceed 20 characters'
            usernameText.style.color='red'
        }
        else if(username.match(/\W/g)!==null){
            usernameText.textContent='username cannot include characters which are not letters and numbers'
            usernameText.style.color='red'
        }
        else{
            usernameText.textContent='username approved'
            usernameText.style.color='green'
        }
    }
    else if(username===''){
        usernameText.textContent='username cannot be empty'
        usernameText.style.color='red'
    }

    if(password!==''){
        if(password.length<=8){
            passwordText.textContent='password cannot go under 8 characters';
            passwordText.style.color='red';
        }
        else if(password.match(/['"$/ ]/g)!=null){
            passwordText.textContent=`password cannot include spaces, ' ," ,$ and /`;
            passwordText.style.color='red';
        }
        else if(password.match(/[0-9]/g)===null){
            passwordText.textContent=`password must contain at least 1 number`;
            passwordText.style.color='red';
        }
        else if(password.match( /[^a-zA-Z0-9'"\/$]/g)===null){
            passwordText.textContent=`password must contain at least 1 character which is not a number or a letter`;
            passwordText.style.color='red';
        }
        else if(password.length>15){
            passwordText.textContent=`password cannot exceed 15 characters`;
            passwordText.style.color='red';
        }
        else{
            passwordText.textContent=`password approved`;
            passwordText.style.color='green'; 
        }
    }
    else if (password===''){
        passwordText.textContent=`password cannot be empty`;
        passwordText.style.color='red';
    }
    if(copassword!==''){
        if(password===copassword){
            copasswordText.textContent='password match';
            copasswordText.style.color='green';
        }
        else if(password!==copassword){
            copasswordText.textContent=`password don't match.Try a
            gain`;
            copasswordText.style.color='red';
        }
    }
    else if(copassword===''){
        copasswordText.textContent=`password cannot be empty `;
        copasswordText.style.color='red';
    }
    }

    else if(Fullname!==''&&Fullname!==null&&Fullname.match(/[^A-Za-z\s]/g)===null&&email.match( /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g)!==null&&email!==""&&email!==null&&username.length>10 &&username.length<20&&username.match(/\W/g)===null&&username!==''&&username!==null&&password.length>=8&&password.match(/['"$/ ]/g)===null&&password.match(/[0-9]/g)!==null&&password.match( /[^a-zA-Z0-9'"\/$]/g)!==null&&password.length<15&&password!==''&&password!=='null'&&password===copassword){
        let feedBack=document.querySelector('#feedback');
        e.preventDefault()
        console.log(email,password,username)
        fetch('https://mybrand-backend-emhu.onrender.com/auth/register',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:`${email}`,
                password:`${password}`,
                username:`${username}`
            })
    
        })
        .then(res=>{
            if(res.status===200) {
                let inputs=document.querySelectorAll('input');
                inputs.forEach(input=>input.textContent='')
            }
            console.log(res)
        })
        .catch(error=>{console.log(error)})
    }
})
// test=document.querySelector('textarea')
// test.addEventListener('input',()=>{
//     if(test.value.length<20){
//         divtext.textContent=`min:${20-test.value.length}`
//     }
//     else{
//         divtext.style.border='1px solid green'
//     }
//     console.log(test.value.length)
// })
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