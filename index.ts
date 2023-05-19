/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example creates a simple polygon representing the Bermuda Triangle.
// When the user clicks on the polygon an info window opens, showing
// information about the polygon's coordinates.

let map: google.maps.Map;

let infoWindow: google.maps.InfoWindow;

function initMap(): void {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: 5,
    center: { lat: 24.886, lng: -70.268 },
    mapTypeId: 'terrain',
  });

  // Define the LatLng coordinates for the polygon.
  const triangleCoords: google.maps.LatLngLiteral[] = [
    { lat: 51.67025784746965, lng: -0.3869408962220655 },
    { lat: 51.657480601249844, lng: -0.2454919216126905 },
    { lat: 51.62935797481731, lng: -0.191246926495503 },
    { lat: 51.586288058646986, lng: -0.353295266339253 },
    { lat: 51.61545844207286, lng: -0.366668701171875 },
    { lat: 51.61486375332319, lng: -0.364281594464253 },
    { lat: 51.61571648275052, lng: -0.367028176495503 },
    { lat: 51.61486375332322, lng: -0.3663415309876905 },
  ];
  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  });

  bermudaTriangle.setMap(map);

  // Add a listener for the click event.
  bermudaTriangle.addListener('click', showArrays);

  infoWindow = new google.maps.InfoWindow();
}

function showArrays(event: any) {
  // Since this polygon has only one path, we can call getPath() to return the
  // MVCArray of LatLngs.
  // @ts-ignore
  const polygon = this as google.maps.Polygon;
  const vertices = polygon.getPath();

  let contentString =
    '<b>Bermuda Triangle polygon</b><br>' +
    'Clicked location: <br>' +
    event.latLng.lat() +
    ',' +
    event.latLng.lng() +
    '<br>';

  // Iterate over the vertices.
  for (let i = 0; i < vertices.getLength(); i++) {
    const xy = vertices.getAt(i);

    contentString +=
      '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' + xy.lng();
  }

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
