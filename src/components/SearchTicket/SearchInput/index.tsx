import { FC } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { useAppDispatch } from '../../../hooks/redux'
import { ICity } from '../../../models/ICity'
import { toCapitalize } from '../../../util'
import s from '../SearchInput.module.css'

interface SearchInputProps {
    type: string
    heading: string
    value: string
    setValue: any
    example: string
    icon: string
    autocomplete?: ICity[]
    error: string
}

export const SearchInput: FC<SearchInputProps> = ({
    type,
    heading,
    value,
    setValue,
    example,
    icon,
    autocomplete = [],
    error
}) => {
    const dispatch = useAppDispatch()

    return (
        <div className={s.section}>
            <div className={s.wrapper}>
                <p className={s.heading}>{heading}</p>
                <DebounceInput
                    debounceTimeout={100}
                    type={type}
                    value={value}
                    onChange={(e) => dispatch(setValue(e.target.value))}
                    className={s.input}
                    placeholder={example}
                    style={error !== '' ? {borderBottom: '1px solid var(--color-error)'} : undefined}
                />
                <p className={s.error}>{error}</p>
                {autocomplete.length !== 0 && (
                <div className={s.autocomplete} style={{display: autocomplete[0].title === value.toLowerCase() ? 'none' : 'block'}}>
                    {autocomplete.map((city: ICity) => {
                        const {_id, title} = city
                        return (
                            <button
                                key={_id}
                                onClick={() => dispatch(setValue(toCapitalize(title)))}
                                className={s.autocomplete_button}
                            >
                                {title}
                            </button>
                        )
                    })}
                </div>
            )}
            </div>
            <img
                className={s.img}
                src={icon}
                alt="location"
            />
        </div>
    )
}