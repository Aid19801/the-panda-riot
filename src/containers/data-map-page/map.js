import React from 'react';
import ReactMapboxGL, { Cluster, Marker } from 'react-mapbox-gl';
import Markers from './markers';

import './styles.scss';

const Map = ReactMapboxGL({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });

//   center={[-0.0826, 51.5160]}
// const { markers, setMarkers } = useState([]);

let clusterMarkerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, width: 50, background: '#0F2751',
    borderRadius: '50%',
}


class MapBox extends React.Component {

    constructor() {
        super();
        this.state = {
            coordinates: [],
            total: null,
            leaves: [],
            gigs: [],
            lng: -0.0826,
            lat: 51.5160,
            clickedCluster: false,
            zoom: [9],
        }
        // this.zoom = [9];
    }

    componentWillMount = () => {
        console.log('this props CWM ', this.props)
        this.manageZoom();
        this.storeGigsFromReduxInState()
        this.setState({ gigs: this.props.gigs });
      }
  
    onMove = () => {
        return;
    };


    clusterClick = (coordinates, total, getLeaves) => {
        // console.log('? coords clicked ', coordinates);
        this.setState({
            clickedCluster: true,
            lng: coordinates[0],
            lat: coordinates[1],
            zoom: [14],
        });
    };

    clusterMarker = (coordinates, pointCount, getLeaves) => {
    return (
        <Marker
            key={coordinates.toString()}
            coordinates={coordinates}
            style={clusterMarkerStyle}
            onClick={this.clusterClick.bind(this, coordinates, pointCount, getLeaves)}
        >
          <div className="div__cluster"><p className="p__cluster small white margin-off center">{`Zoom In (${pointCount})`}</p></div>
        </Marker>
    );
    }

    onStyleLoad = (map) => {
        const { onStyleLoad } = this.props;
        return onStyleLoad && onStyleLoad(map);
    };

    storeGigsFromReduxInState = () => {
        if (this.props.gigs && this.props.gigs.length !== 0) {
            this.setState({ gigs: this.props.gigs })
        }
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.gigs && nextProps.gigs.length !== 0) {
            console.log('nextProps lang: ', nextProps.lng)
            this.setState({ 
                gigs: nextProps.gigs,
                lng: nextProps.lng,
                lat: nextProps.lat,
            })
        }
        if (nextProps.gigs !== this.state.gigs) {
            this.setState({
                gigs: nextProps.gigs,
                lng: nextProps.lng,
                lat: nextProps.lat,
            })
        }
    }

    manageZoom = () => {
        if (this.props.zoom) {
            this.setState({ zoom: [15] });
        }
        if (this.state.clickedCluster) {
            this.setState({ zoom: [12] });
        }
        if (!this.props.zoom && !this.state.clickedCluster) {
            this.setState({ zoom: [9] });
        }
    }

    render() {
        const { selectMarker, lng, lat } = this.props;
        const { clickedCluster } = this.state;

        // console.log('THIS.STATE: ', this.state);
      return (
          <div className="map-container">
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={[this.state.lng, this.state.lat] || [lng, lat]}
                zoom={this.state.zoom}
                onStyleLoad={this.onStyleLoad}
                onMove={this.onMove}
                containerStyle={{
                    height: "450px",
                    width: "100%"
            }}>

                <Cluster ClusterMarkerFactory={this.clusterMarker}>
                    { this.state.gigs && this.state.gigs.map((each, key) => (
                        <Markers
                            key={key}
                            data={each}
                            handleClick={selectMarker}
                            coordinates={[each.lng, each.lat]}
                        />
                    ))}
                </Cluster>
            </Map>
          </div>
      )
    }
}

export default MapBox;

export {
    MapBox,
}