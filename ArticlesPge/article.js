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
            if(res.status===200){
                window.location.reload()
            }
        })
    }
})
function createElementPageLink(id1,id2){

    // Concatenate the IDs with a delimiter
    const encodedIds = encodeURIComponent(id1 + '|' + id2);

    // Use the encoded IDs in your URL
    const url = `../ArticlesPge/readMore.html?ids=${encodedIds}`;
    return url;

}const decode = token => {
    // Check if token is null or undefined
    if (!token) {
      console.error('Token is null or undefined');
      return null;
    }
  
    try {
      // Split the token and retrieve the payload (second part)
      const payload = token.split('.')[1];
      if (!payload) {
        console.error('Token does not contain a payload');
        return null;
      }
  
      // Replace URL-safe characters and decode the payload
      const decodedPayload = atob(payload.replace('-', '+').replace('_', '/'));
      
      // Map each character to its hexadecimal representation
      const decodedCharacters = decodedPayload.split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`);
      
      // Join the characters into a string
      return decodeURIComponent(decodedCharacters.join(''));
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null; // Handle error case appropriately
    }
  };
  const token=localStorage.getItem('token')
  const getUserIdFromToken = token => {
    const decodedToken = JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/'))));
    return decodedToken.userId || null;
};

if(token!==null){
    const userId = getUserIdFromToken(token);
console.log(userId);
    fetch('https://mybrand-backend-emhu.onrender.com/users')
.then(res=>{
    res.json().then(data=>{
        console.log(data)
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
                })
            }
        })
    })
})
}
