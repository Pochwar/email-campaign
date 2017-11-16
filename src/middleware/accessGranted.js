// Middleware to restrict route access
import jwt from 'jsonwebtoken';
require('dotenv').config();

class AccessGranted  {
    // public
    public(req, res, next) {
        next();
    }

    // can user access member's part ?
    restricted(req, res, next) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.API_TOKEN_SECRET, function(err, decoded) {
            if (err) {
                res.status(403).json(
                    {error:"Access forbidden",}
                );
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
}

module.exports = AccessGranted;