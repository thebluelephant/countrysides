import { Account } from "./account"

export interface GatheringPlace {
    id: string,
    location_name : string,
    location_insee : string,
    location_coordinates : {
      lat : number,
      lon : number
    }
    accounts : Pick<Account, 'id'>[]
  }
