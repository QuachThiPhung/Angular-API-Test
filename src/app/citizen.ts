export interface ICitizen {
    id: number;
    fullName?:string;
    address?:string;
    nationality?:string;
    identityNumber?:string;
    phoneNumber?:string;
    email?:string;
    gender?:string;
    dateOfBirth?:string;
}

export class Citizen implements ICitizen {
    id!: number;
    fullName?:string;
    address?:string;
    nationality?:string;
    identityNumber?:string;
    phoneNumber?:string;
    email?:string;
    gender?:string;
    dateOfBirth?:string;
    // public generateName (name: string){
    //     this.name = name;
    // }
}

