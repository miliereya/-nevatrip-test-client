import { useEffect, useState } from 'react'
import { enCart } from '../../languages/en'
import { ILCart } from '../../languages/ILanguage'
import { ruCart } from '../../languages/ru'
import s from './Cart.module.css'
import { IVoyage } from '../../models/IVoyage'
import { ITicket } from '../../models/ITicket'
import { useLocation } from 'react-router'
import { useAppSelector } from '../../hooks/redux'
import { userAPI } from '../../services/UserService'
import { DeleteFromCartRequest } from '../../models/request/DeleteFromCartRequest'

const Cart = () => {
    const { language } = useAppSelector(state => state.languageSlice)
    const { isAuth, user } = useAppSelector(state => state.UserSlice)
    const text: ILCart = language === 'ru' ? ruCart : enCart

    const { isCartLoading } = useAppSelector(state => state.IsLoadingSlice)

    const [tickets, setTickets] = useState<ITicket[]>([])
    const [voyages, setVoyages] = useState<IVoyage[]>([])
    const [priceTotal, setPriceTotal] = useState<number>(0)

    const [trigger, setTrigger] = useState<boolean>(false)

    const location = useLocation()

    const [getCart] = userAPI.useGetCartMutation()
    const [deleteFromCart] = userAPI.useDeleteFromCartMutation()

        useEffect(() => {
            if (isAuth) {
                const getTickets = async () => {
                    try {
                        const data = await getCart(user.tickets).unwrap()
                        setTickets(data.resData)
                        setVoyages(data.voyagesData)
                        let tPrice: number = 0
                        for(let i = 0; i < data.voyagesData.length; i++){
                            tPrice += data.voyagesData[i].price
                        }
                        setPriceTotal(tPrice)
                    } catch (e) {
                        console.log(e)
                    }
                }
                getTickets()
            }
        }, [isAuth, trigger, location, user.tickets])

    if(isCartLoading) {
        return <div></div>
    }

    if (!isAuth) {
        return <div className={s.UN}>Вы не авторизованы</div>
    }

    return (
        <div className={s.section}>
            <h4 className={s.heading}>
                {text.heading}
            </h4>
            <div className={s.wrapper}>
                {tickets.map((ticket: ITicket, index) => {
                    const { _id, date } = ticket
                    const {
                        from,
                        to,
                        price,
                        timeStart,
                        timeEnd,
                        timeTravel,
                    }: IVoyage = voyages[index]

                    const deleteFromCartRequest: DeleteFromCartRequest = {
                        ticket: _id,
                        email: user.email
                    }

                    return (
                        <div key={_id} className={s.item}>
                            <div className={s.col_1}>
                                <p className={s.ship}>{text.boat}</p>
                                <p className={s.shipName}>Москва-16</p>
                                <p className={s.date}>{date}</p>
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
                                <p className={s._id}>ID: {_id}</p>
                            </div>
                            <button
                                className={s.btn}
                                onClick={() => deleteFromCart(deleteFromCartRequest)}
                            >
                                {text.remove}
                                <br />
                                ({price}₽)
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className={s.summary}>
                <p className={s.choose}>{text.choose} {tickets.length}</p>
                <p className={s.price_total}>{text.price}: {priceTotal}₽</p>
                <button className={s.pay_btn}>
                    {text.pay}
                </button>
            </div>
        </div>
    )
}
export default Cart