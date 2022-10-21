import { Dispatch, FC, SetStateAction } from 'react'
import { ICity } from '../../../models/ICity'
import { toCapitalize } from '../../../util'
import s from '../SearchInput.module.css'

interface SearchLocationProps {
    type: string
    heading: string
    value: string
    setValue: Dispatch<SetStateAction<string>>
    example: string
    icon: string
    autocomplete?: ICity[]
    error: string
}

export const SearchLocation: FC<SearchLocationProps> = ({
    type,
    heading,
    value,
    setValue,
    example,
    icon,
    autocomplete = [],
    error
}) => {
    return (
        <div className={s.section}>
            <div className={s.wrapper}>
                <p className={s.heading}>{heading}</p>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={s.input}
                    placeholder={example}
                    style={error !== '' ? {borderBottom: '1px solid var(--color-error)'} : undefined}
                />
                <p className={s.error}>{error}</p>
                {autocomplete.length !== 0 && (
                <div className={s.autocomplete}>
                    {autocomplete.map((city: ICity) => {
                        const {_id, title} = city
                        return (
                            <button
                                key={_id}
                                onClick={() => setValue(toCapitalize(title))}
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