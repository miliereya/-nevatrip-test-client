export interface ILHeader {
    language: string
    findTicket: string
    aboutUs: string
    account: string
    telegram: string
    cart: string
}

export interface ILSearchTicket {
    heading: string
    from: string
    exapmleFrom: string
    exapmleTo: string
    to: string
    when: string
    quantity: string
    search: string
    nwf: string
}

export interface ILSearchResults {
    heading: string
    boat: string
    hour: string
    min: string
    passengers: string
    add: string
    authError: string
    not_avaliable: string
}
export interface ILCart {
    heading: string
    boat: string
    hour: string
    min: string
    remove: string
    choose: string
    price: string
    pay: string
}

export interface ILAccount {
    logout: string
    user: string
    login: string
    signup: string
    password: string
    registr_form: string
    role: string
}