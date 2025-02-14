import cn from 'classnames'
import React, { Fragment, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import Input from './Input'
import { phone, required, validator } from '../../utils/validators'
import { useFormikContext } from 'formik'


export default function Phone() {
    const [showPhone, setShowPhone] = useState(false)
    const {values, setFieldValue} = useFormikContext()
    return (
        <Fragment>
            <Input
                name="phone"
                type="phone"
                validate={validator(phone, required)}
                label="Номер телефона" />
            <div className={cn('control has-icons-right')}>


                <Input
                    optional
                    name="phoneThird"
                    type="phone"
                    label="Номер телефона (дополнительно)" />

                {!showPhone
                    ? (
                        <span className={
                            cn('icon is-right has-text-centered',
                                css(styles.phone),
                                { [css(styles.label)]: 'Номер телефона' })
                        } onClick={() => setShowPhone(true)}>
                            <i
                                className="ion-md-add has-text-success"
                            />
                        </span>
                    )
                    : null}
            </div>

            {showPhone || values.phoneSecond
                ? (
                    <div className={cn('control has-icons-right')}>
                        <Input
                            optional
                            name="phoneSecond"
                            type="phone"
                            label="Номер телефона (дополнительно)" />

                        <span className={
                            cn('icon is-right has-text-centered',
                                css(styles.phone),
                                { [css(styles.label)]: 'Номер телефона' })
                        } onClick={() => {
                            setFieldValue('phoneSecond', '')
                            setShowPhone(false)
                        }}>
                            <i
                                className="ion-md-close has-text-danger"
                            />
                        </span>
                    </div>
                )
                : null}

        </Fragment>
    )
}

const styles = StyleSheet.create({
    phone: {
        pointerEvents: 'auto',
        color: 'black',
        cursor: 'pointer',
    },
    label: {
        marginTop: '25px',
        marginRight: '1px',
        border: '1px solid #b9b9b9',
        ':hover': {
            borderColor: '#858484',
        },
    },
})
