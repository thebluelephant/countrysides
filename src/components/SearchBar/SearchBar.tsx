import React, { useEffect } from 'react';
import s from './SearchBar.module.scss';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';


const SearchBar = () => {
    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        searchLabel: 'Rechercher une adresse, ville, ...',
        showMarker: false,
        classNames: {
            container: s.searchbarContainer,
            button: s.searchbarButton,
            resetButton: s.searchbarReset,
            // msgbox: string;
            form: s.searchbarForm,
            input: s.searchbarInput,
            //resultlist: s.searchbarResults,
            item: s.searchbarResult,
            // notfound: string;
        }
    });

    const map = useMap();

    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map]);


    return null
}

export default SearchBar