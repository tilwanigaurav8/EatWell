const { name } = require('ejs');
const express=require('express');
const rsdata=require('../util/restaurant-data.js');
const router=express.Router();
router.get('/restaurants',function(req,res){
    let order=req.query.order;
    if(order!=='asc' && order!=='desc'){
        order='asc';
    }
    else if(order==='asc'){
        order='desc';
    }
    else if(order==='desc'){
        order='asc';
    }
    const storedr=rsdata.getStoredRestaurants();
    storedr.sort(function(resA,resB){
        if(order==='asc' && resA.name>resB.name){
            return 1;
        }
        else if(order==='desc' && resB.name>resA.name){
            return 1;
        }
        return -1;
    });
    res.render('restaurants',{nor:storedr.length,restaurants:storedr});
});

router.get('/restaurants/:id',function(req,res){
    const resid=req.params.id;
    const storedr=rsdata.getStoredRestaurants();
    for(const restaurant of storedr){
        if(restaurant.id===resid){
            return res.render('restaurant-detail',{restaurant:restaurant});
        }
    }
    return res.status(404).render('404');
});

router.get('/recommend',function(req,res){
    res.render('recommend');
});

router.post('/recommend',function(req,res){
    const restaurant=req.body;
    restaurant.id=uuid.v4();
    const storedr=rsdata.getStoredRestaurants();
    storedr.push(restaurant);
    rsdata.storerest(storedr);
    res.redirect('/confirm');
});
router.get('/confirm',function(req,res){
    res.render('confirm');
});
module.exports=router; 