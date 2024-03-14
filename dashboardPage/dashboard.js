// let articlebtn=document.querySelector('#button1')
// let modal=document.querySelector('dialog')
// let closeModal=document.querySelector('#close')
// articlebtn.addEventListener('click',()=>{
//     modal.showModal()
//     document.getElementById('description').value='';
// })
// function createArticle(description){
//     this.description=description;
//     // this.image=image;
//     return{description}
// }
// let articles=[];
// closeModal.addEventListener('click',()=>{
//     articles.push(createArticle(document.getElementById('description').value));
//     console.log(articles)
//     modal.close();
// })
// articles.forEach(article=>{
//     let div=document.createElement('div');
//     let thebutton=document.createElement('button')
//     let titleOfArticle=document.createElement('h2');
//     div.appendChild(titleOfArticle);
//     let theDialog=document.createElement('dialog');
//     let textArea=
//     theDialog.appendChild(titleOfArticle);
//     div.appendChild(theDialog);
//     div.appendChild(thebutton);
//     thebutton.textContent='Back';
//     thebutton.addEventListener('click',()=>{
//         theDialog.close();
//     })

// })
let newContent=document.querySelector('#new');
let uploadContent=document.querySelector('#upload');
let shareContent=document.querySelector('#share');
let manageBlog=document.querySelector('#newContentToAdd');
let nameOfWhatToManage=document.querySelector('#nameOfWhatToManage');
let back1=document.querySelector('#back1');
newContent.addEventListener('click',()=>{
    manageBlog.showModal();
})
back1.addEventListener('click',()=>{
    manageBlog.close();
})

