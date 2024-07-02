

export const authLogin = async (req, res, next) => {

    if(req.login && req.user.rol === 'admin'){
        next()
    } else {
        res.redirect('/')
    }

}