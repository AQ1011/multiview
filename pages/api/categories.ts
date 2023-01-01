import { NextApiRequest, NextApiResponse } from "next";

type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        let response = await fetch('https://www.googleapis.com/youtube/v3/videoCategories?'
        + new URLSearchParams({
            part: 'snippet',
            regionCode: 'vn',
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
