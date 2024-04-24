let body=document.querySelector('body')
let submitButton=document.getElementById('done')
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
                let removebutton=document.createElement('button');
                removebutton.setAttribute('id',`${blogs[i]._id}`);
                // theDiv.appendChild(removebutton);
                removebutton.textContent='Remove Blog',
                removebutton.addEventListener('click',()=>{
                    let id=removebutton.getAttribute('id')
                    console.log(id)
                    deleteBlog(id);
                })
                let edit=document.createElement('button');
                edit.setAttribute('id',`${blogs[i]._id}`);
                edit.textContent='Edit'
                edit.addEventListener('click',()=>{
                    window.location.href = `../dashboardPage/edit.html?id=${edit.getAttribute('id')}`;
                })
                let thediv2=document.createElement('div')
                thediv2.append(removebutton,edit);
                thediv2.setAttribute('id','btnContainer')
                theDiv.appendChild(thediv2);
            }
        })
    });
    submitButton.addEventListener('click',(e)=>{
        e.preventDefault();
        fetch(`https://mybrand-backend-emhu.onrender.com/createBlog`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                title:document.getElementById('title').value,
                imageUrl:document.getElementById('imageUrl').value,
                body:document.getElementById('content').value
            })
        }).then(res=>{
            if(res.status===200) window.location.reload();
        });
    })
    // function deleteBlog(_id) {
    
    //     const token = localStorage.getItem('token');
    
    //   // Assuming you need to make a separate DELETE request to the API
    //   fetch(`https://mybrand-backend-emhu.onrender.com/${_id}`, {
    //       method: 'delete',
    //       headers: {
    //           'Authorization': `Bearer ${token}`,
    //       },
    //   })
    //   .then(response => {
    //       if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //       }
    //       return response.json();
    //   })
    //   .then(data => {
    //       // After successful deletion, reload the posts
    //       window.location.reload
          
    //   })
    //   .catch(error => {
    //       console.error('There was a problem deleting the blog post:', error);
    //   });
    // };
    function deleteBlog(_id) {
    
        const token = localStorage.getItem('token');
    
      // Assuming you need to make a separate DELETE request to the API
      fetch(`hhttps://mybrand-backend-emhu.onrender.com/deleteBlog/${_id}`, {
          method: 'delete',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // After successful deletion, reload the posts
          window.location.reload();
      })
      .catch(error => {
          console.error('There was a problem deleting the blog post:', error);
      });
    };
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
    const decode = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    const token = localStorage.getItem('token');

    console.log(decode(token))