export interface Account {
    id: string,
    created_at: string,
    role: string,
    firstname: string | null ,
    lastname: string | null,
    email: string,
    username: string | null,
    introduction: string | null,
    centers_of_interest: string[],
    city: {
      lat : number,
      lon : number
    }
  }