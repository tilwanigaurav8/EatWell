const fs=require('fs');
const path=require('path');

const express=require('express');
const uuid=require('uuid');

const rsdata=require('./util/restaurant-data.js');
const defroutes=require('./routes/default.js');
const rroutes=require('./routes/restaurant.js');

const { fork } = require('child_process');
const { ifError } = require('assert');

const app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('frontend'));
app.use(express.urlencoded({extended:false}));
/*
app.get('/',function(req,res){
    const htmlfile=path.join(__dirname,'views','index.html');
    res.sendFile(htmlfile);
});*/
// if using ejs
/* moved to restaurant.js
app.get('/',function(req,res){
    res.render('index');
});*/
app.use('/',defroutes);
app.use('/',rroutes);
/*
app.get('/restaurants',function(req,res){
    const htmlfile=path.join(__dirname,'views','restaurants.html');
    res.sendFile(htmlfile);
});*/

// if using ejs
/* sent to restaurant.js
app.get('/restaurants',function(req,res){
    const storedr=rsdata.getStoredRestaurants;
    res.render('restaurants',{nor:storedr.length,restaurants:storedr});
});

app.get('/restaurants/:id',function(req,res){
    const resid=req.params.id;
    const storedr=rsdata.getStoredRestaurants();
    for(const restaurant of storedr){
        if(restaurant.id===resid){
            return res.render('restaurant-detail',{restaurant:restaurant});
        }
    }
    return res.status(404).render('404');
});
*/

/*
app.get('/recommend',function(req,res){
    const htmlfile=path.join(__dirname,'views','recommend.html');
    res.sendFile(htmlfile);
});*/

// if using ejs
app.get('/recommend',function(req,res){
    res.render('recommend');
});

app.post('/recommend',function(req,res){
    const restaurant=req.body;
    restaurant.id=uuid.v4();
    const storedr=rsdata.getStoredRestaurants();
    storedr.push(restaurant);
    rsdata.storerest(storedr);
    res.redirect('/confirm');
});
/*
app.get('/about',function(req,res){
    const htmlfile=path.join(__dirname,'views','about.html');
    res.sendFile(htmlfile);
});*/

// if using ejs
/* sent to default.js
app.get('/about',function(req,res){
    res.render('about');
});*/
/*
app.get('/confirm',function(req,res){
    const htmlfile=path.join(__dirname,'views','confirm.html');
    res.sendFile(htmlfile);
});*/

// if using ejs
app.get('/confirm',function(req,res){
    res.render('confirm');
});

// handle the errors of users while typing url
app.use(function(req,res){
    res.status(404).render('404');
});

// handle server side errors
app.use(function(error,req,res,next){
    res.status(500).render('500');
})

app.listen(3000);