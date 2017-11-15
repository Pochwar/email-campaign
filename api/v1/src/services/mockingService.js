export default class MockingService
{
    constructor(){
        //
    }

    generateCampaigns(req, res){
        const data = [
            {
                id: "123456",
                contenu: "blabla ceci est le contenu de la campagne N° 123456",
                date: "04-12-2017",
                sujet: "Sujet de la campagne N° 123456"
            },
            {
                id: "456789",
                contenu: "blabla ceci est le contenu de la campagne N° 456789",
                date: "05-12-2017",
                sujet: "Sujet de la campagne N° 456789"
            },
            {
                id: "000000",
                contenu: "blabla ceci est le contenu de la campagne N° 000000",
                date: "06-12-2017",
                sujet: "Sujet de la campagne N° 000000"
            },
            {
                id: "99999",
                contenu: "blabla ceci est le contenu de la campagne N° 99999",
                date: "07-12-2017",
                sujet: "Sujet de la campagne N° 99999"
            },
            {
                id: "123123",
                contenu: "blabla ceci est le contenu de la campagne N° 123123",
                date: "08-12-2017",
                sujet: "Sujet de la campagne N° 123123"
            },
        ];
        res.json({data: data});
    }
}