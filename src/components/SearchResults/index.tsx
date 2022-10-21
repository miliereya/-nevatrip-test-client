import { FC, useContext } from "react";
import { VoyageResponse } from "../../models/response/VoyageResponse";
import s from './SearchResults.module.css'
import { observer } from "mobx-react-lite"
import { ILSearchResults } from "../../languages/ILanguage";
import { Context } from "../..";
import { ruSearchResults } from "../../languages/ru";
import { enSearchResults } from "../../languages/en";
import { IVoyage } from "../../models/IVoyage";
import iconSits from '../../icons/sits.png'
import CartService from "../../services/Cart.service";


interface SearchResultsProps {
    result: VoyageResponse
}

const SearchResults:FC<SearchResultsProps> = ({result}) => {
    const { store } = useContext(Context)
    const text: ILSearchResults = store.language === 'ru' ? ruSearchResults : enSearchResults

    const voyages = result.voyagesData

    return (
        <div className={s.section}>
            <h3 className={s.heading}>{text.heading}{result.date}</h3>
            <div className={s.wrapper}>
                {voyages.map((voyage: IVoyage) => {
                    const {_id, from, to, price, timeStart, timeEnd, timeTravel} = voyage 
                    const date = result.date
                    const quantity = result.quantity

                    const addToCartHandler = async () => {
                        store.setLoading(true)
                        const res = await CartService.addToCart(store.user.email, _id, quantity, date)
                        store.setLoading(false)
                        if(res.data = 'Success'){
                            console.log('Added')
                        }
                    }

                    return (
                        <div key={_id} className={s.item}>
                            <div className={s.col_1}>
                                <p className={s.ship}>{text.boat}</p>
                                <p className={s.shipName}>Москва-16</p>
                                <p className={s.quantity}>{quantity}<img src={iconSits} className={s.img} /></p>
                            </div>
                            <div className={s.col_2}>
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
                            </div>
                            <button 
                                className={s.btn}
                                onClick={() => addToCartHandler()}
                                disabled={!store.isAuth}
                            >
                                {text.add}
                                <br />
                                ({price * parseInt(quantity)}₽)
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default observer(SearchResults)