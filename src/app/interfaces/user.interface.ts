/**
 * There are the variables that can be used to add a user or make them for something of the user
 */
export interface User{
    name: string,
    company: string,
    email: string,
    password: string,
    admin: boolean,
    superadmin: boolean,
    status:boolean
}