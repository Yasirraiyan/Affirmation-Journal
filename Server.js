const express=require('express');
const http=require('http');
const mongoose=require('mongoose');
const cors=require('cors');
const { error } = require('console');
require('dotenv').config();
const port=3000;
const app=express();
app.use(express.json);
app.use(cors());
mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,

    });
    const AffirmationSchema=new mongoose.Schema({
        text:{type:String,required:true}
    })
    const Affirmation=mongoose.model("Affirmation",AffirmationSchema);
   app.post('/affirmations',async(req,res)=>
{
    try
    {
        const {text}=req.body;
         if(!text)
         {
            return
                res.status(400).json({error:"Affirmation is Required!"});
            

         }
         const newAffirmation=new Affirmation({text});
         await newAffirmation.save();
         res.status(201).json({message:"Affirmation added:",affirmation:newAffirmation})
        
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
});
app.put('/affirmations',async(req,res)=>{
        try
        {

        }
        catch(error)
        {
           res.status(404).json({});
        }
});
app.get("/affirmations",async(req,res)=>
{
    try
    {
         const affirmation=new Affirmation.find();
         if(affirmation.length()==0)
         {
            return
            (
            res.status(404).json({error:"No affirmations found!"})
            )
         }
         const randomAffirmation=affirmation[Math.floor(Math.random()*affirmations.length)];
         res.status(200).json(randomAffirmation);
    }
    catch
    {
        res.status(500).json({error:error.Message});
    }
    
    
})
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log('Server running on port:${PORT}'));
