import { observer } from "mobx-react-lite"
import { FC, useContext } from "react"
import { Context } from "../.."
import LoginForm from "../LoginForm"
import RegisterForm from "../RegisterForm"
import s from './account.module.css'

const Account: FC = () => {
    const { store } = useContext(Context)
    if(store.isLoading) {
        return <div></div>
    }

      if (!store.isAuth) {
        return (
            <>
                <div className={s.section}>
                    <LoginForm />
                    <RegisterForm />
                </div>
            </>
        )
    }
    return (
        <>
            <div className='container'>
                <div className={s.wrapper}>
                    <p className={s.desc}>Id: <span>{store.user.id}</span></p>
                    <p className={s.desc}>Email: <span>{store.user.email}</span></p>
                    <button className={s.btn_logout} onClick={() => store.logout()}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default observer(Account)