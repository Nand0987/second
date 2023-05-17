const express=require('express')
const cros=require('cors')
const app=express();
const db=require('./database')
const api=require('./api')
const cookieparser=require('cookie-parser')
const imagesize=require('./image')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cros())
app.use(cookieparser())




//Home page
app.get('/',(req,res)=>{
console.log();
res.json('Home page')
    
})

//api request
app.post('/image',(req,res)=>{
api.detectFaces(req.body.url).then((data)=>res.json(data));
})

//Image height width finder
app.post('/size',(req,res)=>{
  console.log(req.body.url);
imagesize.getImageDimensions(req.body.url)
  .then(dimensions => {
  res.json(JSON.stringify({w:dimensions.width,h:dimensions.height}))
 
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

})



//Signin user
app.post('/signin',(req,res)=>{
db.userSignIn(req.body.Email,req.body.Password).then((data)=>{
  if(data==false)
  return res.json('invalid user')
  else(data==true)
  {
    return res.json(data)
  }
});
})

//Register User
app.post('/Register',(req,res)=>{
    const userdata={
    id:123,
    name:req.body.Name,
    Password:req.body.Password,
    email:req.body.Email,
    entries:0,
    joined:new Date()}
    db.fetch().then((data)=>{
      if(data==false)
      userdata.id=123
      else
      userdata.id=Number(data)+1
    }).then((data)=>{db.userRegisterdb(userdata)
      .then((data)=>{res.json(userdata)})})
    
})

//userEntriesUpdate(req.body.id)
app.post('/id',(req,res)=>{
db.userEntriesUpdate(req.body.id).then((data)=>{
return res.json(data)  
})
})

//data fetch from id
app.post('/id1',(req,res)=>{
  db.userDataFetch(req.body.id).then((data)=>{
  return res.json(data)  
  })
  })

//emailCheck
app.post('/emailCheck',(req,res)=>{
db.emailCheck(req.body.Email).then((data)=>{
if(data==true)
res.json(true)
else
res.json(false)
})

})

//app listner
app.listen(3000,()=>{
    console.log('server listen ');
})