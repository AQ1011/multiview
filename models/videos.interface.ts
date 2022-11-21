export default interface Video {
    id: {
        videoId: string;
    };
    snippet: {
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

}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
}