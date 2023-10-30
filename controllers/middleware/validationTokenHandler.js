const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next) => {
    console.log(req.user,"testststtsts")
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERET, (err, decode) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decode,"1234")
            req.user = decode.user;
            next();
        });

        if(!token) {
            res.status(401);
            throw new Error("user is not authorized or token is not valid")
        }
    }

})

module.exports = validateToken