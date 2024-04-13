require('dotenv').config()
const express=require('express');
const app=express();

const jwt=require('jsonwebtoken')

app.use(express.json())
const posts=[
    {
        username:'kyle',
        title:'Post 1'
    },
    {
        username:'Jim',
        title:'Post 2'
    }
];
app.get('/posts',authenticateToken,(req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))


});

app.post('/login',(req,res)=>{
//Authenticate user

const username=req.body.username

const user={name:username}

const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
res.json({ accessToken:accessToken })
})
function authenticateToken(req,res,next){
    const authHeader = req.headers
    const token=authHeader
    console.log(token)
    if(token == null) return res.sendStatus(401)
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403);
        req.user =user
        next()
    })
}
app.listen(3000)
