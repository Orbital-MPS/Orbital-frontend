import React from 'react'
import {useState,memo} from 'react' 
import { MapContainer, TileLayer, Marker,LayerGroup, Circle, FeatureGroup,Rectangle, Popup,useMapEvents,useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

const Leaf = ({coordinate}) => {
const [position,setPosition] = useState(coordinate)
  // const map = useMapEvents({
  //   click() {
  //     map.locate()
  //   },
  //   locationfound(e) {
  //     setPosition(e.coordinate)
  //     map.flyTo(e.latlng, map.getZoom())
  //   },
  // })
  function ChangeView({ center, zoom }) {
    console.log('switching THE ')
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
    const  center = coordinate;
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const fillBlueOptions = { fillColor: 'blue' }
const fillRedOptions = { fillColor: 'red' }
const greenOptions = { color: 'green', fillColor: 'green' }
const purpleOptions = { color: 'purple' }

    return(


      <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{width:'100%' , height:'220%'}}>
      <TileLayer
      
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={coordinate}  />
      <LayerGroup>
        <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
        <Circle
          center={center}
          pathOptions={fillRedOptions}
          radius={100}
          stroke={false}
        />
        <LayerGroup>
          <Circle
            center={[27.20, 77.49]}
            pathOptions={greenOptions}
            radius={100}
          />
        </LayerGroup>
      </LayerGroup>
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup</Popup>
        <Circle center={[51.51, -0.06]} radius={200} />
        <Rectangle bounds={rectangle} />
      </FeatureGroup>
    </MapContainer>
      
          
      

    )
}

export default memo(Leaf);
