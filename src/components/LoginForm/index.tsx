import { useContext, useState } from 'react'
import { Context } from '../..'
import s from './loginForm.module.css'
import { observer } from 'mobx-react-lite'

const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const { store } = useContext(Context)

    const loginHandler = async () => {
        const email_regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
        if (!email_regex.test(email)){
            return setError('Invalid Email')
        }
        await store.login(email, password)
        setError(store.logError)
    }

    return (
        <div className={s.section}>
            <p className={s.heading}>Sign in</p>
            <p className={s.error}>{error}</p>
            <input
                className={s.input}
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text" 
                placeholder='Email'
            />
            <input
                className={s.input}
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password" 
                placeholder='Password'
            />
            <button
                className={s.btn}
                onClick={() => loginHandler()}
            >
                Go!
            </button>
        </div>
    )
}
export default observer(LoginForm)