import { FC, useEffect, useState } from 'react'
import { ILSearchTicket } from '../../languages/ILanguage'
import { ruSearchTicket } from '../../languages/ru'
import { SearchInput } from './SearchInput'
import iconLocation from '../../icons/location.png'
import iconCalendar from '../../icons/calendar.png'
import iconSits from '../../icons/sits.png'
import iconSwap from '../../icons/swap.png'
import iconSwap_white from '../../icons/swap_white.png'
import s from './SearchTicket.module.css'
import { ICity } from '../../models/ICity'
import { enSearchTicket } from '../../languages/en'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { cityAPI } from '../../services/CityService'
import { searchSlice } from '../../store/reducers/SearchSlice'
import { SearchRequest } from '../../models/request/SearchRequest'
import SearchResults from '../SearchResults'
import searchAPI from '../../services/SearchService'
import { isLoadingSlice } from '../../store/reducers/IsLoadingSlice'

const SearchTicket: FC = () => {
    const { cityFrom, cityTo, date, quantity, result } = useAppSelector(state => state.SearchSlice)
    const { setCityFrom, setCityTo, setDate, setQuantity, setResult, resetResult } = searchSlice.actions

    const [cityFromSearch, setCityFromSearch] = useState<ICity[] | undefined>([])
    const [cityFromError, setCityFromError] = useState<string>('')

    const { data: cityFromFetched } = cityAPI.useFetchAllCitiesQuery(cityFrom.toLowerCase())

    const [cityToSearch, setCityToSearch] = useState<ICity[] | undefined>([])
    const [cityToError, setCityToError] = useState<string>('')
    const { data: cityToFetched } = cityAPI.useFetchAllCitiesQuery(cityTo.toLowerCase())

    const [dateError, setDateError] = useState<string>('')
    const [quantityError, setQuantityError] = useState<string>('')

    const { language } = useAppSelector(state => state.languageSlice)

    const dispatch = useAppDispatch()
    const { setLoading } = isLoadingSlice.actions

    const [nwf, setNwf] = useState<boolean>(false)

    const [isSwapped, setSwapped] = useState<boolean>(false)

    const text: ILSearchTicket = language === 'ru' ? ruSearchTicket : enSearchTicket

    useEffect(() => {
        if (cityFrom.length > 1) {
            setCityFromSearch(cityFromFetched)
        } else {
            setCityFromSearch([])
        }
    }, [cityFromFetched])

    useEffect(() => {
        if (cityTo.length > 1) {
            setCityToSearch(cityToFetched)
        } else {
            setCityToSearch([])
        }
    }, [cityToFetched])

    const SearchHandler = async () => {
        let error = false
        setCityFromError('')
        setCityToError('')
        setDateError('')
        setQuantityError('')

        if (cityFrom === '') {
            setCityFromError('Обязательное поле')
            error = true
        }
        if (cityTo === '') {
            setCityToError('Обязательное поле')
            error = true
        }
        if (date === '') {
            setDateError('Обязательное поле')
            error = true
        }

        if (quantity !== '1' && quantity !== '2' && quantity !== '3') {
            setQuantityError('Введите число от 1 до 3')
            error = true
        }

        if (error) {
            return
        }

        try {
            dispatch(setLoading(true))
            const res = await searchAPI.getVoyages(cityFrom.toLowerCase(), cityTo.toLowerCase(), date, quantity)
            if (res.data.voyagesData.length !== 0) {
                setNwf(false)
                dispatch(setResult(res.data))
                window.scroll(0, 550)
            } else {
                setNwf(true)
                dispatch(resetResult())
            }
        } catch (e) {

        } finally {
            dispatch(setLoading(false))
        }

    }

    const swapHadnler = () => {
        setSwapped(!isSwapped)
        dispatch(setCityFrom(cityTo))
        dispatch(setCityTo(cityFrom))
        setCityToSearch([])
        setCityFromSearch([])
    }

    return (
        <div className={s.section}>
            <h1 className={s.heading}>{text.heading}</h1>
            <div className={s.container}>
                <div className={s.row}>
                    <button 
                        className={s.swap}
                        onClick={swapHadnler}
                        style={{backgroundColor: isSwapped ? 'var(--color-primary)' : 'var(--color-white)'}}
                    >
                        <img className={s.swap_icon} src={isSwapped ? iconSwap_white : iconSwap} />
                    </button>
                    <SearchInput
                        error={cityFromError}
                        icon={iconLocation}
                        type='text'
                        heading={text.from}
                        example={text.exapmleFrom}
                        value={cityFrom}
                        setValue={setCityFrom}
                        autocomplete={cityFromSearch}
                    />
                    <SearchInput
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
                    <SearchInput
                        error={dateError}
                        icon={iconCalendar}
                        type='date'
                        heading={text.when}
                        example={''}
                        value={date}
                        setValue={setDate}
                    />
                    <SearchInput
                        error={quantityError}
                        icon={iconSits}
                        type='number'
                        heading={text.quantity}
                        example={'0'}
                        value={quantity.toString()}
                        setValue={setQuantity}
                    />
                </div>
                {nwf && <p className={s.nwf}>{text.nwf}</p>}
            </div>
            <button className={s.btn} onClick={SearchHandler}>
                {text.search}
            </button>

            {result && result.voyagesData.length !== 0 && <SearchResults result={result} />}
        </div>
    )
}

export default SearchTicket