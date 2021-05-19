import React from 'react';
import ServiceDescription from '../ServiceDescription/ServiceDescription';
import AccountControl from '../AccountControl/AccountControl';
import style from './MainPage.module.scss'

function MainPage() {
    return (
        <div className={style.container}>
            <ServiceDescription/>
            <AccountControl/>
        </div>
    );
}

export default MainPage;