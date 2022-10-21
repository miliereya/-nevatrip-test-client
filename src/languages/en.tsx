import { ILCart, ILHeader, ILSearchResults, ILSearchTicket } from "./ILanguage";

export const enHeader: ILHeader = {
    language: 'en',
    findTicket: 'Search ticket',
    aboutUs: 'About',
    account: 'Account',
    telegram: '@miliereya',
    cart: 'Cart'
}
export const enSearchTicket: ILSearchTicket = {
    heading: 'Make a voyage is pretty simple',
    exapmleFrom: 'Example: Москва',
    exapmleTo: 'Example: Воронеж',
    from: 'From?',
    to: 'To?',
    when: 'When?',
    quantity: 'Passangers',
    search: 'Search Tickets'
}

export const enSearchResults: ILSearchResults = {
    heading: 'Showing results on ',
    boat: 'Ship',
    hour: 'h',
    min: 'm',
    passengers: 'passengers',
    add: 'Add'
}

export const enCart: ILCart = {
    heading: 'Cart',
    boat: 'Ship',
    hour: 'h',
    min: 'm',
    remove: 'remove',
    pay: 'Procced to checkout',
    choose: 'Number of tickets: ',
    price: 'Price'
}