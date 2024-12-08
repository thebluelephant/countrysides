export interface City {
    x: Number, // lon,
    y: Number, // lat,
    label: String, 
    bounds: [
      [Number, Number], // s, w - lat, lon
      [Number, Number], // n, e - lat, lon
    ],
    raw: {}, // raw provider result
  }