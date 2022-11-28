import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?'
    + new URLSearchParams({
        part: 'snippet',
        mine: 'true',
        key: process.env.API_KEY!,
        maxResults: '100',
        access_token: JSON.parse(req.body).accessToken,
    }))
    .then(response => {
        if(response.ok)
            return response.json()
        console.error('status', response.status)
        throw new Error('Server error');
    })
    .then(data => {
        res.status(200).json(data)
        res.end();
        resolve();
    })
    .catch(err => {
        res.status(500).json({success: false, err: err})
        console.error(err);
        res.end();
        resolve();
    })
}

// {
//     headers: new Headers({
//         'Authorization': 'Bearer'+ JSON.parse(req.body).accessToken,
//         'Accept': 'application/json',
//     })
// }