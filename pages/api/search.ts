import { NextApiRequest, NextApiResponse } from "next";

type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        let response = await fetch('https://www.googleapis.com/youtube/v3/search?'
        + new URLSearchParams({
            part: 'snippet',
            maxResults: '20',
            q: req.query['q'] as string,
            // pageToken: req.query['nextPageToken'] as string ?? "",
            key: process.env.API_KEY!
        }));
        
        if(response.ok) {
            let data = await response.json();
            res.status(200).send(data);
        } else {
            throw new Error('Network error');
        }
    } catch (err) {
        res.status(500).send({success: false});
    }
}
