// imports
const express = require('express')
const app = express()
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const alert = require('alert');
app.use(bodyParser.urlencoded({extended:true}));
const dbURI = 'mongodb+srv://babu:babu@cluster0.wkbnxsg.mongodb.net/cluster0?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      }))
    .catch((err) =>console.log(err));

    const managementdetailsSchema = {
        email:String,
        category:String,
        hosp:String,
        admin:String,
        phone:String,
        pass:String,
        location:String
    }

    const donordetailsSchema = {
        email:String,
        name:String,
        phone:String,
        pass:String,
        location:String
    }


const ManagementDetail = mongoose.model("managementdetails",managementdetailsSchema);
const DonorDetail = mongoose.model("donordetails",donordetailsSchema);

//static files
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUnititalized: false

}));

app.get('',(req,res)=>{
    res.render(__dirname + '/views/index')
})
app.get('/managementregister',(req,res)=>{
    res.render(__dirname + '/views/managementregister')
})
app.get('/managementlogin',(req,res)=>{
    res.render(__dirname + '/views/managementlogin')
})
app.get('/donorlogin',(req,res)=>{
    res.render(__dirname + '/views/donorlogin')
})
app.get('/managementhome',(req,res)=>{
    res.render(__dirname + '/views/managementhome')
})

app.get('/donorregister',(req,res)=>{
    res.render(__dirname + '/views/donorregister')
})
app.get('/bloodstock',(req,res)=>{
    res.render(__dirname + '/views/bloodstock')
})
app.get('/brangular',(req,res)=>{
    res.render(__dirname + '/views/brangular')
})
app.get('/donarhome',(req,res)=>{
    res.render(__dirname + '/views/donarhome')
})
app.get('/donate',(req,res)=>{
    res.render(__dirname + '/views/donate')
})
app.get('/donorrequest',(req,res)=>{
    res.render(__dirname + '/views/donorrequest')
})
app.get('/notification',(req,res)=>{
    res.render(__dirname + '/views/notification')
})
app.get('/organisebc',(req,res)=>{
    res.render(__dirname + '/views/organisebc')
})

app.post('/managementregister',function(req,res){
    let newManagementDetail = new ManagementDetail({
        email: req.body.memail,
        category: req.body.mcategory,
        hosp: req.body.mhosp,
        admin: req.body.madmin,
        phone: req.body.mphone,
        pass: req.body.mpass,
        location: req.body.mlocation
    });
    newManagementDetail.save();
   res.redirect('/managementlogin')
})

app.post('/managementlogin',function(req,res){
    //req.session.userID = ;
    const email = req.body.manemail;
    const password  = req.body.manpass;
    ManagementDetail.findOne({email:email,pass:password}, function(err,user){
        if(err){
            console.log(err)
        }
        if(!user){
             alert("Incorrect username or password");
             return res.redirect('/managementlogin');
            
        }
        alert("Login Successful!");
        return res.redirect('/managementhome');
    })
    
})

app.post('/donorregister',function(req,res){
    let newDonorDetail = new DonorDetail({
        email: req.body.demail,
        name: req.body.dname,
        phone: req.body.dphone,
        pass: req.body.dpass,
        location: req.body.dloc
    });
    newDonorDetail.save();
   res.redirect('/donorlogin')
})

app.post('/donorlogin',function(req,res){
    //req.session.userID = ;
    const email = req.body.donemail;
    const password  = req.body.donpass;
    DonorDetail.findOne({email:email,pass:password}, function(err,user){
        if(err){
            console.log(err)
        }
        if(!user){
            alert("Incorrect username or password");
            return res.redirect('/donorlogin');
        }
        alert("Login Successful!");
        return res.redirect('/donarhome');
    })
    
})








/* "dependencies": {
    "alert": "^5.1.1",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "express-handlebars": "^6.0.6",
    "express-session": "^1.17.3",
    "mongoose": "^6.7.1",
    "typescript": "^4.9.3"
  },*/