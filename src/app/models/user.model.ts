
export class User{
    constructor(
        public uid: string,
        public name: string,
        public email: string
    ){}

    static firebaseUserToUser({uid, name, mail}){
        return new User(uid, name, mail)
    }
    
}