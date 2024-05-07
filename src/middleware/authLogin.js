

export const authLogin = async (req, res, next) => {

    if(req.signedCookies['loggedin'] && req.signedCookies['rol'] === 'admin'){
        next()
    } else {
        res.redirect('/')
    }

}