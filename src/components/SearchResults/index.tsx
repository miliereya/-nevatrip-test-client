import { FC } from "react";
import { VoyageResponse } from "../../models/response/VoyageResponse";
import s from './SearchResults.module.css'
import { ILSearchResults } from "../../languages/ILanguage";
import { ruSearchResults } from "../../languages/ru";
import { enSearchResults } from "../../languages/en";
import { IVoyage } from "../../models/IVoyage";
import iconSits from '../../icons/sits.png'
import { useAppSelector } from "../../hooks/redux";
import { NavLink } from "react-router-dom";
import { userAPI } from "../../services/UserService";
import { AddTicketRequest } from "../../models/request/AddTicketRequest";
import { useState } from 'react'

interface SearchResultsProps {
    result: VoyageResponse
}

const SearchResults: FC<SearchResultsProps> = ({ result }) => {
    const [added, setAdded] = useState('')
    const { user } = useAppSelector(state => state.UserSlice)
    const { language } = useAppSelector(state => state.languageSlice)
    const text: ILSearchResults = language === 'ru' ? ruSearchResults : enSearchResults

    const { isAuth } = useAppSelector(state => state.UserSlice)
    const voyages = result.voyagesData

    const available: boolean = new Date() < new Date(result.date)

    return (
        <div className={s.section}>
            <h3 className={s.heading}>{text.heading}{result.date}</h3>
            <div className={s.wrapper}>
                {voyages.map((voyage: IVoyage) => {
                    const { _id, from, to, price, timeStart, timeEnd, timeTravel } = voyage
                    const { date, quantity } = result
                    const [addToCart] = userAPI.useAddToCartMutation()
                    const AddTicketRequest: AddTicketRequest = {
                        email: user.email,
                        voyage: _id,
                        date,
                        quantity
                    }
                    const addToCartHandler = async () => {
                        await addToCart(AddTicketRequest)
                        setAdded(_id)
                        return setTimeout(function () { setAdded('') }, 1000)
                    }

                    return (
                        <div key={_id} className={s.item} >
                            <div className={s.col_1} style={added === _id ? { boxShadow: '0 0 7px 4px #11ff00' } : undefined}>
                                <p className={s.ship}>{text.boat}</p>
                                <p className={s.shipName}>Москва-16</p>
                                <p className={s.quantity}>{quantity}<img src={iconSits} className={s.img} /></p>
                            </div>
                            <div className={s.col_2} style={added === _id ? { boxShadow: '0 0 7px 4px #11ff00' } : undefined}>
                                <div className={s.time}>
                                    {timeStart}
                                    <div className={s.line}></div>
                                    <span>{timeTravel} {text.min}.</span>
                                    <div className={s.line}></div>
                                    {timeEnd}
                                </div>
                                <div className={s.city_wrapper}>
                                    <p className={s.city}>{from}</p>
                                    <p className={s.city}>{to}</p>
                                </div>
                                <p className={s.date}>{date}</p>
                                {!isAuth && <NavLink to='/account' className={s.auth_error}>{text.authError}</NavLink>}
                            </div>
                            {available ? 
                            <button
                                className={s.btn}
                                onClick={() => addToCartHandler()}
                                disabled={!isAuth}
                            >
                                {text.add}
                                <br />
                                ({price * parseInt(quantity)}₽)
                            </button> : 
                            <div className={s.not_avaliable}>
                                {text.not_avaliable}!
                            </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResults