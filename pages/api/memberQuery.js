import axios from 'axios';
import api_keys from 'private/api_keys.json' assert {type: 'json'};

export default async function Main(req, res) {
  const formatName = (someName) => {
    let nameArr;
    let lastName;
  
    nameArr = someName.split(', ');
    lastName = nameArr[0][0] + nameArr[0].slice(1).toLowerCase();
    nameArr.shift();
    nameArr.push(lastName);
  
    return nameArr.join(' ');
  };

  let parsedResults;
  let someMember = req.query.member_id;
  const API_URL = `https://api.propublica.org/congress/v1/members/${someMember}/votes.json`;

  const api_config = {
    headers: {"X-API-Key": api_keys.key }
  };

  axios.get(API_URL, api_config)
    .then((response) => {
      res.status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    });
}