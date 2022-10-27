import { ILAccount, ILCart, ILHeader, ILSearchResults, ILSearchTicket } from "./ILanguage";

export const ruHeader: ILHeader = {
    language: 'ru',
    findTicket: 'Найти билет',
    aboutUs: 'О нас',
    account: 'Аккаунт',
    telegram: '@miliereya',
    cart: 'Корзина'
}

export const ruSearchTicket: ILSearchTicket = {
    heading: 'Купить билет на теплоход просто',
    exapmleFrom: 'Например: Москва',
    exapmleTo: 'Например: Воронеж',
    from: 'Откуда?',
    to: 'Куда?',
    when: 'Когда?',
    quantity: 'Количество людей',
    search: 'Поиск билетов',
    nwf: 'Ничего не найдено'
}

export const ruSearchResults: ILSearchResults = {
    heading: 'Показаны результаты на ',
    boat: 'Теплоход',
    hour: 'ч',
    min: 'м',
    passengers: 'Пассажиров',
    add: 'Добавить',
    authError: 'Авторизуйтесь, чтобы добавить билет!',
    not_avaliable: 'Неактуальная дата'
}
export const ruCart: ILCart = {
    heading: 'Корзина',
    boat: 'Теплоход',
    hour: 'ч',
    min: 'м',
    remove: 'удалить',
    pay: 'Перейти к оплате',
    choose: 'Кол-во билетов: ',
    price: 'Цена'
}
export const ruAccount: ILAccount = {
    logout: 'Выйти',
    user: 'Пользователь',
    login: 'Логин',
    signup: 'Регистрация',
    password: 'Пароль',
    registr_form: 'Регистрация',
    role: 'роль'
}