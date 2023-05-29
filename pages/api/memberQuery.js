import axios from 'axios';
import api_keys from 'private/api_keys.json' assert {type: 'json'};

export default async function handleQuery(req, res) {

    const formatName = (someName) => {

        let nameArr;
        let lastName;


        nameArr = someName.split(', ')
        lastName = nameArr[0][0] + nameArr[0].slice(1).toLowerCase()
        nameArr.shift()
        nameArr.push(lastName)

        return nameArr.join(' ')

    }

    const header= `X-API-KEY: ${api_keys}`;
    let parsedResults;
    let someMember= req.query.memberid;

    const api_config = {
        method: 'get',
        url: `https://api.propublica.org/congress/v1/members/${someMember}/votes.json/`,
        headers: { header }
    }

    axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
    }).catch(function (error) {
        console.log(error)
    });

    //res.status(200).json(parsedResults)

}