const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'random_token_secret');
        const userId = decodedToken.userId;
        const moderator = decodedToken.moderator;
        req.auth = {
            userId: userId,
            moderator: moderator
        };
        console.log(req.body);
            console.log(req.auth);
        if ((req.body.userId && req.body.userId !== userId) && !moderator) {
            throw "Invalid User ID";
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({error});
    }
};