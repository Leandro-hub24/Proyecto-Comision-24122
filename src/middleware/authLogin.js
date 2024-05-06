

export const authLogin = async (req, res, next) => {

    if(req.signedCookies['loggedin']){
        next()
    } else {
        res.render('Stop')
    } 

}