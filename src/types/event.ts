interface EventTiming {
    begin: string;
    end: string;
  }
  
interface LocationCoordinates {
    lon: number;
    lat: number;
  }
  
export interface ODEvent {
    uid: string;
    slug: string;
    canonicalurl: string;
    title: string;
    description: string;
    conditions: string | null;
    timings: EventTiming[];
    location_coordinates: LocationCoordinates;
    location_city: string;
    location_address: string;
    location_name: string;
    location_postalcode: string | null;
    firstdate_begin: string;
    lastdate_end: string;
    location_insee: string | null;
  }
  
export interface OpenDataEvent {
    total_count: number;
    results: ODEvent[];
  }