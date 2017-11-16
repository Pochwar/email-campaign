// Middleware to restrict route access
import jwt from 'jsonwebtoken';
import yaml_config from 'node-yaml-config';
import path from 'path';

class AccessGranted  {
    // public
    public(req, res, next) {
        next();
    }

    // can user access member's part ?
    restricted(req, res, next) {
        const token = req.headers.authorization;
        const config = yaml_config.load(path.join(__dirname,'../../config/config.yml'));
        jwt.verify(token, config.APIConfig.token_secret, function(err, decoded) {
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