import React from 'react';
import YTSearch from 'youtube-api-search';
import './styles.scss'

const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;

const VideoListItem = ({ video, index }) => {
    const imgURL = video.snippet.thumbnails.default.url;
    console.log('id is here ', video.id.videoId);
    const { id } = video;
    const { videoId } = id;

    return (
        <>
        <li onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`)} className={index % 3 === 0 ? "list-group-item" : "list-group-item dark"}>
            <div className="video-list media">

            <div className="media-left">
                <img alt="open mic comedy youtube set thumbnail" className="media-object" src={imgURL} />
            </div>

            <div className="media-body">
                <div className="media-heading">
                    <p className="p__gig-blurb youtube-p">
                        {video.snippet.title}
                    </p>
                </div>
                <div className="media-description">
                    <p className="p__gig-blurb youtube-p">
                        {video.snippet.description}
                    </p>
                </div>
            </div>
            </div>
        </li>
        </>
    )
}

const VideoList = ({ videos }) => {
    const VideoItems = () => {
        return videos.map((video, i) => <VideoListItem key={i} index={i + 2} video={video} />)
    }
    return (
        <ul className="col-md-12 list-group">
            <VideoItems />
        </ul>
    )
}


class YouTubeEmbed extends React.Component {
    constructor() {
        super()
        this.state = {
            searchTerm: '',
            videos: [],
        }
    }

    componentWillMount = () => {
        
        this.setState({ searchTerm: this.props.term });

        YTSearch({key: YOUTUBE_KEY, term: this.props.term }, (data) => {
            this.setState({ videos: data })
            console.log('AT | data back from YT ', data);
        });
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.term !== this.state.searchTerm) {
            YTSearch({key: YOUTUBE_KEY, term: nextProps.term }, (data) => {
                this.setState({ videos: data, searchTerm: nextProps.term })
            });
        }
    }

    render() {
        const { videos } = this.state;
        const { heading } = this.props;
        return (
            <div className="youtube-embed">
                <div className="title-and-ptag">
                    <h1 className="youtube-h1">YouTube</h1>
                    <p>#{heading}</p>
                </div>
                <hr />
                <VideoList videos={videos} />
            </div>
          )
    }
}


export default YouTubeEmbed;