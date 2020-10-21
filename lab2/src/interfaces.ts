namespace TablesDB {
    export interface Anime {
        length: number,
        columns: {
            a_name: string,
            description: string,
            series: number,
            genre: number
        }
    }

    export interface Genre {
        length: number,
        columns: {
            g_name: string
        }
    }

    export interface Passport {
        length: number,
        columns: {
            name: string,
            surname: string,
            birth_date: string
        }
    }

    export interface Review {
        length: number,
        columns: {
            r_text: string,
            user_id: number,
            anime_id: number
        }
    }

    export interface User {
        length: number,
        columns: {
            username: string,
            registry_date: string
        }
    }

    export interface User_Passport {
        length: number,
        columns: {
            passport_id: number,
            user_id: number
        }
    }

    export interface Watched {
        length: number,
        columns: {
            watch_anime_id: number,
            watch_user_id: number
        }
    }

    export type NewRow = Anime | Genre | Passport | Review | User | User_Passport | Watched;
}