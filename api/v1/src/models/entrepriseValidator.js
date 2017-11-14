import validator from "validator";
import _ from "underscore";

export default class EntrepriseValidator
{
    constructor()
    {
        this._ = _;
        this.val = validator;
        this.status = {
            ok: 200,
            created: 201,
            noContent: 204,
            badRequest: 400,
            unauthorized: 401,
            forbidden: 403,
            notFound: 404,
            methodNotAllowed: 405,
            internalServerError: 500,
        }
    }

    getStatus()
    {
        return this.status;
    }

    checkId(id)
    {
        let error = false;
        if(!this.val.isAlphanumeric(id) || id.length !== 24)
            error = true;

        return error;
    }

    checkArrayString(stringArray)
    {
        let error = false;

        for(let t in stringArray)
        {

            if(!this._.isNull(stringArray[t]))
                if(!this.val.isAlpha(stringArray[t]))
                    error = true;
        }

        return error;
    }

}