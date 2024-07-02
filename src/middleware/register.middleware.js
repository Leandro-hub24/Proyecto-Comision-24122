export const registerMiddleware = async (req, res, next) => {

    if(req.login){
        res.redirect('/')
    } else {
        next()
    }

}