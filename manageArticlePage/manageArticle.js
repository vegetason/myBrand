let newArticle=document.querySelector('h1')
let modal=document.querySelector('dialog')
let form=document.querySelector('form')
let error=document.querySelector('#error')
let back=document.querySelector('#back')
let body=document.querySelector('body')
let theArticleContainer=document.createElement('div')
theArticleContainer.classList.add('form-container')
body.appendChild(theArticleContainer)
back.addEventListener('click',()=>{
    modal.close();
})
newArticle.addEventListener('click',()=>{
    modal.showModal();
})
function createArticle(input,textArea){
    this.input=input;
    this.textArea=textArea;
    return{
        input,textArea
    }
}
let Articles=new Array();
form.addEventListener('submit',(e)=>{
    let input=document.getElementById('image').value;
    let textArea=document.querySelector('textarea').value;
    if(input==='' || textArea===''){
        error.textContent='Complete all information'
        error.style.color='red'
        e.preventDefault();
    }
    else{
        e.preventDefault();
        Articles = JSON.parse(localStorage.getItem("articles"))?JSON.parse(localStorage.getItem("articles")):[];
        Articles.push(createArticle(input,textArea))
        Articles.forEach(article=>{
            let theDiv=document.createElement('div')
            let theImage=document.createElement('img')
            theImage.setAttribute('src',`${input}`)
            let theDescription=document.createElement('p')
            theDescription.textContent=`${textArea}`
            theDiv.setAttribute('id','article1')
            theArticleContainer.appendChild(theDiv)
            theDiv.appendChild(theImage)
            theDiv.appendChild(theDescription)
            console.log(Articles)
        })
        localStorage.setItem("articles",JSON.stringify(Articles));
    }
})