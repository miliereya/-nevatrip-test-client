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
}

export interface ILSearchResults {
    heading: string
    boat: string
    hour: string
    min: string
    passengers: string
    add: string
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