export const authSession = async (req, res, next) => {

    if(req.signedCookies['loggedin']){
        next()
    } else {
        res.redirect('/')
    }

}