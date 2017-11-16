export default class AuthenticityService {
    constructor() {}

    checkAuthenticity(requestDecodeId, requestBodyId) {
        return (requestDecodeId === requestBodyId);
    }
}