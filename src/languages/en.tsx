import { ILAccount, ILCart, ILHeader, ILSearchResults, ILSearchTicket } from "./ILanguage";

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
    search: 'Search Tickets',
    nwf: 'Nothing was found'
}

export const enSearchResults: ILSearchResults = {
    heading: 'Showing results on ',
    boat: 'Ship',
    hour: 'h',
    min: 'm',
    passengers: 'passengers',
    add: 'Add',
    authError: 'Sign in, to add tickets!',
    not_avaliable: 'Irrelevant date'
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

export const enAccount: ILAccount = {
    logout: 'Logout',
    user: 'User',
    login: 'Login',
    signup: 'Sign up',
    password: 'Password',
    registr_form: 'Sign in / up',
    role: 'role'
}