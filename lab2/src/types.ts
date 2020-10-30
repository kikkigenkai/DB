namespace TablesDB {
    export type Anime = {
        length: number,
        columns: {
            a_name: string,
            description: string,
            series: number,
            genre: number
        }
    }

    export type Genre = {
        length: number,
        columns: {
            g_name: string
        }
    }

    export type Passport = {
        length: number,
        columns: {
            name: string,
            surname: string,
            birth_date: string
        }
    }

    export type Review = {
        length: number,
        columns: {
            r_text: string,
            user_id: number,
            anime_id: number
        }
    }

    export type User = {
        length: number,
        columns: {
            username: string,
            registry_date: string
        }
    }

    export type User_Passport = {
        length: number,
        columns: {
            passport_id: number,
            user_id: number
        }
    }

    export type Watched = {
        length: number,
        columns: {
            watch_anime_id: number,
            watch_user_id: number
        }
    }

    export type NewRow = Anime | Genre | Passport | Review | User | User_Passport | Watched;
}