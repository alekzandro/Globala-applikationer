
function gen_navdata (req){
    if (req.auth){
        return {loginstatus:true, username: req.auth.username}
    }
    else {
        return {loginstatus:false, username: null}
    }
}

module.exports = gen_navdata;