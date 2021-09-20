
const middleware = {
    checkURL: (req, res, next) => {
        if(req.url.startsWith('/home/') || req.url.startsWith('/image/') || req.url.startsWith('/user/') ){
            next()
        }else{
            let validURL = ["/user", "/signin", "/signup" , "/logOut"]
            validURL.includes(req.url) ? next() : res.redirect('/')
        }
    }
}

module.exports = middleware