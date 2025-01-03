import React, { useEffect } from 'react';
import s from './Title.module.scss';

type Props = {
    title: string
}


const Title = ({ title }: Props) => {
    return (
        <div className={s.title}>
            <div className={s.line} />
            <p>{title}</p>
            <div className={s.line} />
        </div>
    )
}

export default Title