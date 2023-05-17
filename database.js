let mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/facedb',
{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('coonected')).catch((err)=>console.log(err))
const playlistSchema=new mongoose.Schema({
    id:Number,
    name:String,
    Password:String,
    email:String,
    entries:Number,
    joined:Date
})
const table=new mongoose.model('facetable',playlistSchema)

 //return id of user  
 const fetch=async()=>{
 try
 {
    const result= await table.find()  
    const s=new Array(...result) 
    return s[s.length-1].id
 }
 catch(err){return false;}
 }


//user Registration
 const userRegisterdb=async(userData)=>{
    try
    {
    const result=await table.insertMany([userData])
    return true
    }
    catch(err){
    return false;
    }
 } 

 //userSignIn()
const userSignIn=async(useremail,userpassword)=>{
try
{
const result= await table.find({email:useremail,Password:userpassword})
const s=new Array(...result)
return s[0];
}
catch(err){return false}
}

//user entries update
const userEntriesUpdate=async(userId)=>
{
try
{
const result=await table.find({id:userId})
const r=result[0].entries+1
await table.updateOne({id:userId},{$set:{entries:r}}) 
const result1=await table.find({id:userId})
const finalres=new Array(...result1);
return finalres[0];
}
catch(err){return ;}
}


//data fetch from id
const userDataFetch=async(userId)=>
{
try
{
const result=await table.find({id:userId})
const r=result[0].entries
await table.updateOne({id:userId},{$set:{entries:r}}) 
const result1=await table.find({id:userId})
const finalres=new Array(...result1);
return finalres[0];
}
catch(err){return ;}
}

const emailCheck=async(useremail)=>{
try
{
   const result=await table.find({email:useremail})
   let r=new Array(...result)
   if(r.length>=1)
   return false
   else
   return true;
   
}
catch(err){return false}

}


//exported module
module.exports.userEntriesUpdate=userEntriesUpdate
module.exports.userSignIn=userSignIn
module.exports.userRegisterdb=userRegisterdb
module.exports.fetch=fetch;
module.exports.userDataFetch=userDataFetch
module.exports.emailCheck=emailCheck

