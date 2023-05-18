const fs=require('fs');
const path=require('path');

const filepath=path.join(__dirname,'..','data','restaurants.json');

function getStoredRestaurants(){
    const filedata=fs.readFileSync(filepath);
    const storedr=JSON.parse(filedata);
    return storedr;
}

function storerest(storablerest){
    fs.writeFileSync(filepath,JSON.stringify(storablerest));
}

module.exports={
    getStoredRestaurants:getStoredRestaurants,
    storerest:storerest
};