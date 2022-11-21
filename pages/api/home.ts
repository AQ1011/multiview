import { reject } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";

type Data = {

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    fetch('https://www.googleapis.com/youtube/v3/search?'
    + new URLSearchParams({
        part: 'snippet',
        eventType: 'live',
        maxResults: '20',
        q: 'hololive',
        type: 'video',
        key: process.env.API_KEY!
    }))
    .then(response => {
        if(response.ok)
            return response.json()
        throw new Error('Network error');
    })
    .then(data => {
        console.log('Get Success');
        console.log(data);
        res.status(200).json(data)
        res.end();
        resolve();
    })
    .catch(err => {
        res.status(500).json({success: false})
        resolve();
    })
}
