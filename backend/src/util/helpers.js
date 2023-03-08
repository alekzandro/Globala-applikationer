
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
//mm/dd/yy
function formatDateNow(){
    const zeroAdder = (str) => {
        return str.length === 1?"0"+str:str;
    }

    const date = new Date();
    const month = date.getMonth();
    const day = date.getDay();
    const year = date.getFullYear();
    return year.toString()
     + "-" + zeroAdder(month.toString())
    + "-" + zeroAdder(day.toString());
}

function equalDates(d1, d2){
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
    && d1.getDay() === d2.getDay();
}

module.exports = {gen_navdata: gen_navdata, dateformat: formatDateNow, equalDates: equalDates};