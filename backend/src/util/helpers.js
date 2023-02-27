
function gen_navdata (req){
    if (req.auth){
        if(req.auth.role_id == 1){
            return {loginstatus:true, username: req.auth.name, recruiter: true}
        } else {
            return {loginstatus:true, username: req.auth.name, recruiter: false}
        }    
    }
    else {
        return {loginstatus:false, username: null, recruiter: null}
    }
}

module.exports = gen_navdata;