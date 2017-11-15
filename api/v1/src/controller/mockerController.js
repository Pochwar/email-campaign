import faker from 'faker';

export default class MockerController
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
                name: "salut",
                email: randomEmail
            })
        }
        res.json({data: data});
    }
}