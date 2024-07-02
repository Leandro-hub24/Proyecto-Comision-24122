export const authSession = async (req, res, next) => {

    if(req.login){
        next()
    } else {
        res.redirect('/')
    }

}