// Middleware to restrict route access
import jwt from 'jsonwebtoken';
// import localStorage from 'localStorage';

class AccessGranted  {

    // constructor save config
    constructor() {
    }

    // public
    public(req, res, next) {
        next();
    }

    // can user access member's part ?
    restricted(req, res, next) {
       //todo -> get token from header request
        // jwt.verify(token, 'secret');
        const test = true;
        // invalid req
        if(!test) {
            res.status(403).json(
                {error:"Access forbidden",}
            );
        }
        else {
            next();
        }
    }
}

module.exports = AccessGranted;