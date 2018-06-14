var getUser = (id,callback) => {
    var user = {
        id,
        name: 'Flo'
    };
    setTimeout(() =>{
        callback(user);
    },3000);
    
};

getUser(3,(user)=>{
    console.log(user);
});