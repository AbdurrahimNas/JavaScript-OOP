class User {
    #firstName;
    #lastName;
    #email;

    constructor({firstName, lastName, email}){
        this.setUser({firstName, lastName, email});
    }
    setUser({firstName, lastName, email}){
        let re = /[A-Z][a-z]*[^0-9]/;
        console.log(re.exec(firstName))
        if(re.exec(firstName) && re.exec(lastName)){
            this.#firstName = firstName;
            this.#lastName = lastName;
        }else{
            throw new SyntaxError("letters only and first letter has to be an upper-case"); 
        }
        let re1 = /[(A-Z|a-z)]@.[^0-9]/;
        if (re1.exec(email)){
            this.#email = email;
        }else{
            throw new TypeError("an email address can only consist of letters, while strings of letters can be separated by dots.")
        }
    }
    getUser(){
        return { firstName: this.#firstName,
                 lastName: this.#lastName,
                 email: this.#email
        }
    }

}

try {
    let user1 = new User({firstName:'Aaa', lastName:'Bbb', email:'Aaa@gmail.com'});
    console.log(user1.getUser());
    let user2 = new User({firstName:'aaaa', lastName:'Bbbb', email:'Aaaa@gmail.com'});
    console.log(user2.getUser());
} catch(err) {
    console.log(err.message);
}

class Users{
    collection = new Map([[]]);

    add(name, surname, email){
        let user = new User({firstName:name, lastName:surname,email:email});
        this.collection[email] = [name, surname];
    };

    delete(email){
        delete this.collection[email];
    };

    get(email){
        return this.collection[email];
    };

    getAll(){
        let sorting = true;
        let retVal = 0;
        while(sorting){
            sorting = false;
            for(let i in this.collection){
                if (this.collection[i]>this.collection[i+1]){
                    retVal = this.collection[i];
                    this.collection[i] = this.collection[i+1];
                    this.collection[i+1] = retVal;
                    sorting = true;
                }
            }
        }
        return console.log(this.collection)
    }
}

let users = new Users();
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Mmmm", "Ffff", "eeee@gmail.com");
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Xxxx", "Oooo", "dddd@gmail.com");
users.delete("cccc@gmail.com");
console.log(users.get("dddd@gmail.com"));
users.getAll()
