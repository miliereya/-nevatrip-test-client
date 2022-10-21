import { useContext,useState} from 'react'
import { ruHeader} from '../../languages/ru'
import s from './Header.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { ILHeader } from '../../languages/ILanguage'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import { enHeader} from '../../languages/en'


const Header = () => {
    const { store } = useContext(Context)
    const nav = useLocation().pathname
    const [active, setActive] = useState<string>(nav)
    const text: ILHeader = store.language === 'ru' ? ruHeader : enHeader

    return (
        <header className={s.section}>
            <h2 className={s.logo}>Bon<br /><span>Voyage</span></h2>
            <div className={s.wrapper}>
                <nav>
                    <div className={s.nav_row}>
                        <NavLink onClick={() => setActive('/')} to='/' className={active === '/' ? s.link_active : s.link}>
                            {text.findTicket}
                        </NavLink>
                        <NavLink to='/' className={s.link}>
                            {text.aboutUs}
                        </NavLink>
                        <NavLink onClick={() => setActive('/account')} to='/account' className={active === '/account' ? s.link_active : s.link}>
                            {text.account}
                        </NavLink>
                    </div>
                    <div className={s.nav_row}>
                        <NavLink to='/' className={s.link}>
                            {text.telegram}
                        </NavLink>
                        <NavLink onClick={() => setActive('/cart')} to='/cart' className={active === '/cart' ? s.link_active : s.link}>
                            {text.cart}
                        </NavLink>
                        <button className={s.btn} onClick={() => store.setLanguage(store.language === 'ru' ? 'en': 'ru')}>
                            {store.language === 'ru' ? 'en' : 'ru'}
                        </button>
                    </div>
                </nav>
                <div className={s.divider_wrapper}>
                    <div className={s.divider}></div>
                </div>
            </div>
        </header>
    )
}

export default observer(Header)