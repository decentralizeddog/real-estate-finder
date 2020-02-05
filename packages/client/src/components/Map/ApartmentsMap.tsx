import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import markerImage from 'assets/img/background.jpg';
import './Maps.css';

// redux
import { RootState } from 'types';
import { mapStyles, markerStyles } from './MapStyle';

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { selectApartmentList } from 'store/apartment/apartmentSelector';
import { Apartment } from '@shared/types';

// eslint-disable-next-line
const useStyles = () => ({
  mainMap: {
    height: '600px',
  },
  infoWindow: {
    width: '100%',
    height: '130px',
    padding: '15px',
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'center',
    display: 'flex'
  },
  markerImg: {
    width: '150px',
    height: '100px',
  },
  markerText: {
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '100%',
    justifyContent: 'center'
  }
});


const DEFAULT_MAP_LOCATION = { lat: 37.09024, lng: -95.712891 };
const DEFAULT_MAP_ZOOM = 5;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCIW48wqv3oz7ZgL8Q8vSQUwJ3xfQjjeEM&v=3.exp&libraries=geometry,drawing,places";

const CMap = withScriptjs(withGoogleMap((props: any) =>
  <GoogleMap
    defaultZoom={DEFAULT_MAP_ZOOM}
    defaultCenter={DEFAULT_MAP_LOCATION}
    options={{
      styles: mapStyles,
      disableDefaultUI: false
    }}

  >
    {props.children}
  </GoogleMap>
));

interface StateFromProps {
  apartmentsList: ReturnType<typeof selectApartmentList>;
}
interface DispatchFromProps {
}
interface OwnProps {}
interface StyleProps {
  classes: any,
}

type Props = StateFromProps & DispatchFromProps & OwnProps & StyleProps;

export const ApartmentsMap = ({
  classes,
  apartmentsList,
}: Props) => {
  const [ selectedItem, selectItem ] = React.useState<Apartment | undefined>(undefined);
  return (
    <React.Fragment>
      <CMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className={classes.mainMap} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={DEFAULT_MAP_LOCATION}
      >
        <MarkerClusterer
          gridSize={60}
          averageCenter
          enableRetinaIcons
          styles={markerStyles}
        >
          {apartmentsList.map((item, index) => {
            return item.coordinates ?  (
              <Marker key={index}
                position={{ lat: item.coordinates[0], lng: item.coordinates[1] }}
                onClick={(e) => selectItem(item)}
              >
                { selectedItem && selectedItem._id === item._id && (
                  <InfoWindow onCloseClick={() => selectItem(undefined)}>
                    <div className={'infoWindowView'}>
                      <div>
                        <img className={'markerImg'} src={markerImage} alt='' />
                      </div>
                      <div className={'markerText'}>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>$ {item.price}</p>
                        <p>{item.size} sq</p>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ) : null;
          })}
        </MarkerClusterer>
      </CMap>
    </React.Fragment>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    apartmentsList: selectApartmentList(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
  }
}

ApartmentsMap.prototype = {
  classes: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(useStyles)(ApartmentsMap))
