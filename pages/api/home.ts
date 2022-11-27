import { reject } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";

type Data = {

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    fetch('https://www.googleapis.com/youtube/v3/videos?'
    + new URLSearchParams({
        part: 'snippet',
        // eventType: 'live',
        maxResults: '20',
        // q: 'hololive',
        // type: 'video',
        chart: 'mostPopular',
        pageToken: req.query['nextPageToken'] as string ?? "",
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
        console.log(err);
        resolve();
    })
}
