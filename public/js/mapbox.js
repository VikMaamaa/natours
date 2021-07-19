/*eslint-disable*/
export const displayMap = (locations) => {
    try {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFhbWFhdmljdG9yIiwiYSI6ImNrcTVudG52OTE5MzEydmxuMjZ1ODQwNm8ifQ.dAZeYmW6jd8us_bVPpoqtQ';

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/maamaavictor/ckq610zer8dqy18rl485fb1dn',
            scrollZoom: false
                // center: [-118.113491, 34.111745],
                // zoom: 10,
                // interactive:
        })

        const bounds = new mapboxgl.LngLatBounds();

        locations.forEach(loc => {
            //Add Marker
            const el = document.createElement('div');
            el.className = 'marker';

            new mapboxgl.Marker({
                    element: el,
                    anchor: 'bottom'
                })
                .setLngLat(loc.coordinates)
                .addTo(map);

            //Add Popup
            new mapboxgl.Popup({
                    offset: 30
                })
                .setLngLat(loc.coordinates)
                .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
                .addTo(map)

            //Extend map bounds to include current location
            bounds.extend(loc.coordinates);
        });

        map.fitBounds(bounds, {
            padding: {
                top: 200,
                bottom: 150,
                left: 100,
                right: 100
            }
        });
    } catch (err) {
        console.log(err);
        // showAlert('error', err);
    }

}