import { reject } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";

type Data = {

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log(req.query['videoId'],123123);
    fetch('https://www.googleapis.com/youtube/v3/commentThreads?'
    + new URLSearchParams({
        videoId: req.query['videoId'] as string,
        part: 'snippet,replies',
        eventType: 'live',
        order: 'relevance',
        maxResults: '20',
        key: process.env.API_KEY!
    }))
    .then(response => {
        if(response.ok)
            return response.json()
        throw new Error('Network error');
    })
    .then(data => {
        res.status(200).json(data)
        res.end();
        resolve();
    })
    .catch(err => {
        res.status(500).json({success: false})
        resolve();
    })
}
