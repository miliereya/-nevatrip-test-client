import { FC, useContext, useEffect, useState } from 'react'
import { ILSearchTicket } from '../../languages/ILanguage'
import { ruSearchTicket } from '../../languages/ru'
import { SearchLocation } from './SearchLocation'
import iconLocation from '../../icons/location.png'
import iconCalendar from '../../icons/calendar.png'
import iconSits from '../../icons/sits.png'
import s from './SearchTicket.module.css'
import CityService from '../../services/CityService'
import { ICity } from '../../models/ICity'
import VoyageService from '../../services/VoyageService'
import { Context } from '../..'
import { observer } from "mobx-react-lite"
import { enSearchTicket } from '../../languages/en'
import SearchResults from '../SearchResults'

const SearchTicket: FC = () => {
    const { store } = useContext(Context)

    const [cityFrom, setCityFrom] = useState<string>('')
    const [cityFromSearch, setCityFromSearch] = useState<ICity[]>([])
    const [cityFromError, setCityFromError] = useState<string>('')

    const [cityTo, setCityTo] = useState<string>('')
    const [cityToSearch, setCityToSearch] = useState<ICity[]>([])
    const [cityToError, setCityToError] = useState<string>('')

    const [date, setDate] = useState<string>('')
    const [dateError, setDateError] = useState<string>('')

    const [quantity, setQuantity] = useState<string>('')
    const [quantityError, setQuantityError] = useState<string>('')

    const text: ILSearchTicket = store.language === 'ru' ? ruSearchTicket : enSearchTicket

    useEffect(() => {
        if (cityFrom.length > 1 && cityFrom.toLowerCase() !== cityFromSearch[0]?.title) {
            const getCities = async () => {
                try {
                    const res = await CityService.getCities(cityFrom.toLowerCase())
                    if (res.data.length === 0) {
                        return setCityFromSearch([])
                    }
                    setCityFromSearch(res.data)
                } catch (e) {
                    console.log(e)
                }
            }

            getCities()
        } else {
            setCityFromSearch([])
        }
    }, [cityFrom])

    useEffect(() => {
        if (cityTo.length > 1 && cityTo.toLowerCase() !== cityToSearch[0]?.title) {
            const getCities = async () => {
                try {
                    const res = await CityService.getCities(cityTo.toLowerCase())
                    if (res.data.length === 0) {
                        return setCityToSearch([])
                    }
                    setCityToSearch(res.data)
                } catch (e) {
                    console.log(e)
                }
            }

            getCities()
        } else {
            setCityToSearch([])
        }
    }, [cityTo])

    const SearchHandler = async () => {
        let error = false
        setCityFromError('')
        setCityToError('')
        setDateError('')
        setQuantityError('')

        if(cityFrom === ''){
            setCityFromError('Обязательное поле')
            error = true
        }
        if(cityTo === ''){
            setCityToError('Обязательное поле')
            error = true
        }
        if(date === ''){
            setDateError('Обязательное поле')
            error = true
        }
        if(quantity !== '1' && quantity !== '2' && quantity !== '3'){
            setQuantityError('Введите число от 1 до 3')
            error = true
        }

        if(error){
            return
        }

        const from = cityFrom.toLowerCase()
        const to = cityTo.toLowerCase()

        store.setLoading(true)
        const res = await VoyageService.getVoyages(from, to, date, quantity)
        if(res.data.voyagesData.length !== 0){
            store.setSearchResult(res.data)
            window.scrollTo(0, 350)
        } else {
            store.setSearchResult({voyagesData: [], date: '', quantity: ''})
            console.log('Ничего')
            console.log(store.user.tickets)
        }
        store.setLoading(false)
    }

    return (
        <div className={s.section}>
            <h1 className={s.heading}>{text.heading}</h1>
            <div className={s.container}>
                <div className={s.row}>
                    <SearchLocation
                        error={cityFromError}
                        icon={iconLocation}
                        type='text'
                        heading={text.from}
                        example={text.exapmleFrom}
                        value={cityFrom}
                        setValue={setCityFrom}
                        autocomplete={cityFromSearch}
                    />
                    <SearchLocation
                        error={cityToError}
                        icon={iconLocation}
                        type='text'
                        heading={text.to}
                        example={text.exapmleTo}
                        value={cityTo}
                        setValue={setCityTo}
                        autocomplete={cityToSearch}
                    />
                </div>
                <div className={s.row}>
                    <SearchLocation
                        error={dateError}
                        icon={iconCalendar}
                        type='date'
                        heading={text.when}
                        example={''}
                        value={date}
                        setValue={setDate}
                    />
                    <SearchLocation
                        error={quantityError}
                        icon={iconSits}
                        type='number'
                        heading={text.quantity}
                        example={'0'}
                        value={quantity}
                        setValue={setQuantity}
                    />
                </div>
            </div>
            <button className={s.btn} onClick={SearchHandler}>
                {text.search}
            </button>
            {store.searchResult.voyagesData.length !== 0 && <SearchResults result={store.searchResult}/>}
        </div>
    )
}

export default observer(SearchTicket)