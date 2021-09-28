import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import "../style/Map.scss"

const Naver_Client_ID = `${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;

function NaverMapAPI(props) {
    const navermaps = window.naver.maps;

    return (
      <NaverMap
        id={`NaverMap${Math.floor(Math.random() * 1000)}${props.i}`}
        style={{
          width: "500px",
          height: "300px"
        }}
        defaultCenter={{ lat: props.location.latitude, lng: props.location.longitude }}
        defaultZoom={17}
        >
        <Marker
            key={1}
            position={new navermaps.LatLng(props.location.latitude, props.location.longitude)}
            animation={0}
        />
      </NaverMap>
    );
  }

  function RenderMaps(props) {
      return (
        <div className={`NaverMap`}>
          <RenderAfterNavermapsLoaded
          ncpClientId={Naver_Client_ID}
          error={<p>Maps Load Error</p>}
          loading={<p>Maps Loading...</p>}
          >
          <NaverMapAPI location={{longitude: props.location.longitude, latitude: props.location.latitude}} i={props.i}/>
          </RenderAfterNavermapsLoaded>
          <div>
          
          </div>
        </div>
      );
  }

  export default RenderMaps;