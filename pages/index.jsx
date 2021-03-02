import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
      <>
        <div style={{ height: "100vh", width: "100%" }}>
          <h1>LatLngBounds.getCenter bug repro</h1>
          <p>Open the console. You'll see that:</p>
          <ol>
            <li>
              <code>onGoogleApiLoaded</code> was called even though loading the
              api failed
            </li>
            <li>
              When <code>onGoogleApiLoaded</code> gets called, the definition of{" "}
              <code>LatLngBounds.getCenter</code> looks okay. But it changes to
              an empty function after a brief timeout.
            </li>
          </ol>
          <p>
            This happens any time the google api fails to load for any reason
          </p>
          <a href="https://github.com/Eguzkiman/google-map-react-bug-repro/blob/main/pages/index.jsx">
            Source code here
          </a>
          <GoogleMapReact
            /* We're using a bad key here to make loading the api fail, but the same bug happens when it fails for any other reason */
            bootstrapURLKeys={{ key: "wrong key" }}
            /* If remove the line above 👆, .extend definition no longer mutates */
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onGoogleApiLoaded={({ maps }) => {
              console.log("onGoogleApiLoaded called!");
              console.log(
                "at the moment of getting called:",
                maps.LatLngBounds.prototype.getCenter
              );
              setTimeout(() => {
                console.log(
                  "after 2 secs:",
                  maps.LatLngBounds.prototype.getCenter
                );
              }, 2000);
            }}
          ></GoogleMapReact>
        </div>
      </>
    );
  }
}

export default SimpleMap;
