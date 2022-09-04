import { Wrapper } from "@googlemaps/react-wrapper";
import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import Constants from "../helpers/Constants";

const Marker = (options) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
      // setTimeout(() => {
      //   marker.setAnimation({ animation: google.maps.Animation.BOUNCE });
      // }, 500);
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      setTimeout(() => {
        marker.setOptions(options);
        marker.setIcon({
          url: "/marker1.png",
          // labelOrigin: new google.maps.Point(16, 56),
          // size: new google.maps.Size(32, 32),
          // anchor: new google.maps.Point(16, 32),
        });
        marker.setAnimation(google.maps.Animation.DROP);
        // marker.setLabel({
        //   text: "Sacred Chank Productions",
        //   color: "#FFFFFF",
        //   fontWeight: "bold",
        // });
      }, 1000);
    }
  }, [marker, options]);
  return null;
};

const GoogleMap = ({ center, zoom, children, setLatitude, setLongitude }) => {
  const ref = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      const m = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: Constants.GOOGLE_MAP_STYLE,
        mapTypeControl: false,
        streetViewControl: false,
        panControl: false,
        zoomControl: false,
        // scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        // draggable: false,
        disableDefaultUI: true,
      });
      setMap(m);

      // m?.event.addListenerOnce(map, "idle", function () {
      //   console.log("GEre");
      // });
      m?.addListener("dragend", function () {
        console.log("Gello");
        setLatitude(this.getCenter().lat());
        setLongitude(this.getCenter().lng());
        console.log(this.getCenter().lat() + " " + this.getCenter().lng());
        // document.getElementById('default_latitude').value = map.getCenter().lat();
        // document.getElementById('default_longitude').value = map.getCenter().lng();
      });
    }
  }, [map]);

  return (
    <>
      <div ref={ref} id="map" className="w-full h-64" />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Map = ({ latitude, setLatitude, longitude, setLongitude }) => {
  // const center = { lat: 52.3559766, lng: -7.7276328 };
  // const [latitude, setLatitude] = useState(52.3559766);
  // const [longitude, setLongitude] = useState(-7.7276328);
  const zoom = 16;
  return (
    <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY} className="h-96">
      <GoogleMap
        center={{ lat: latitude, lng: longitude }}
        zoom={zoom}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      >
        {/* <Marker position={center} /> */}
      </GoogleMap>
    </Wrapper>
  );
};
export default Map;
