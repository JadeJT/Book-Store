export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    date_of_birth: string;
    books?: number[];
}