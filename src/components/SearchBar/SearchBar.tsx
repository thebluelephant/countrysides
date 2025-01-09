import React, { useEffect } from 'react';
import s from './SearchBar.module.scss';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';

type Props = {
    onFilterOnDate: (date: any) => void
    resetDateFilter: () => void
}

const SearchBar = ({ onFilterOnDate, resetDateFilter }: Props) => {
    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider({
            params: {
                countrycodes: 'fr',
            },
        }),
        searchLabel: 'Rechercher une adresse, ville, ...',
        showMarker: false,
        geocodingQueryParams: { countrycodes: 'fr' },
        classNames: {
            container: s.searchbarContainer,
            button: s.searchbarButton,
            resetButton: s.searchbarReset,
            form: s.searchbarForm,
            input: s.searchbarInput,
            item: s.searchbarResult,

        }
    });

    const map = useMap();

    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map]);


    return (
        <form>
            <input type="date" className={s.dateFilter} onChange={(e) => onFilterOnDate(e.target.value)} />
            <button className={s.resetFilterButton} onClick={() => resetDateFilter()} type='reset'>
                <img src="icon/close.svg" alt="reset date filter icon" />
            </button>

        </form>

    )
}

export default SearchBar