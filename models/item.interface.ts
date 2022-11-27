export default interface Item<T> {
    id: {
        videoId: string;
    } | string;
    snippet: T;
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface CommentSnippet {
    authorChannelId: { value: string };
    authorChannelUrl: string; 
    authorDisplayName: string; 
    authorProfileImageUrl: string;
    canRate: true;
    likeCount: 1827; 
    publishedAt: Date
    textDisplay: string;
    textOriginal: string;
    updatedAt: Date;
    videoId: string;
    viewerRating: string;
}

export interface VideoSnippet {
    title: string;
    publishedAt: Date;
    channelId: string;
    description: string;
    thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
    };
    channelTitle: string;
    publishTime: Date;
    liveBroadcastContent: string;
};