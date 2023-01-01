import Item from "./item.interface";

export interface YtResponse<T> {
    kind: string;
    etag: string,
    nextPageToken: string;
    regionCode: string;
    pageInfo: { 
        totalResults: number;
        resultsPerPage: number; 
    };
    items: Item<T>[]
}