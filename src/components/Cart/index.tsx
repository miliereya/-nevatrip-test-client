import { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { enCart } from '../../languages/en'
import { ILCart } from '../../languages/ILanguage'
import { ruCart } from '../../languages/ru'
import s from './Cart.module.css'
import { observer } from 'mobx-react-lite'
import TicketService from '../../services/TicketsService'
import { IVoyage } from '../../models/IVoyage'
import { ITicket } from '../../models/ITicket'
import CartService from '../../services/Cart.service'
import { useLocation } from 'react-router'

const Cart = () => {
    const { store } = useContext(Context)
    const text: ILCart = store.language === 'ru' ? ruCart : enCart

    const [tickets, setTickets] = useState<ITicket[]>([])
    const [voyages, setVoyages] = useState<IVoyage[]>([])
    const [priceTotal, setPriceTotal] = useState<number>(0)

    const [trigger, setTrigger] = useState<boolean>(false)

    const location = useLocation()

    useEffect(() => {
        if (store.isAuth) {
            const getTickets = async () => {
                store.setLoading(true)
                try {
                    const res = await TicketService.getTickets(store.user.tickets)
                    setTickets(res.data.resData)
                    setVoyages(res.data.voyagesData)
                    let tPrice: number = 0
                    for(let i = 0; i < res.data.voyagesData.length; i++){
                        tPrice += res.data.voyagesData[i].price
                    }
                    setPriceTotal(tPrice)
                } catch (e) {
                    console.log(e)
                } finally {
                    store.setLoading(false)
                }
            }
            getTickets()
        }
    }, [store.isAuth, trigger, location])

    if (!store.isAuth) {
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

                    const removeFromCartHandler = async () => {
                        store.setLoading(true)
                        const res = await CartService.deleteFromCart(store.user.email, _id)
                        store.setLoading(false)
                        if(res.data = 'Success'){
                            console.log('Deleted')
                            setTrigger(!trigger)
                        }
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
                                onClick={() => removeFromCartHandler()}
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
export default observer(Cart)