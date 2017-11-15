import faker from 'faker';

export default class MockingService
{
    constructor(){
        //
    }

    generateCampaigns(req, res){
        // todo generate campaigns data
        const data = [];
        for(let i=0; i < 10; i++){
            const randomName = faker.name.findName();
            const randomEmail = faker.internet.email();
            data.push({
                name: "tavu",
                email: randomEmail
            })
        }
        res.json({data: data});
    }
}