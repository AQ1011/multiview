import Video from "./videos.interface";

export interface YtResponse {
    kind: string;
    etag: string,
    nextPageToken: string;
    regionCode: string;
    pageInfo: { 
        totalResults: number;
        resultsPerPage: number; 
    };
    items: Video[]
}