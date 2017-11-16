// Middleware to restrict route access
import jwt from 'jsonwebtoken';

class AccessGranted  {
    // public
    public(req, res, next) {
        next();
    }

    // can user access member's part ?
    restricted(req, res, next) {
        const token = req.headers.authorization;
        jwt.verify(token, 'secret', function(err, decoded) {
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