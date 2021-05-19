import React from 'react';
import ServiceDescription from '../ServiceDescription/ServiceDescription';
import AccountControl from '../AccountControl/AccountControl';
import style from './MainPage.module.css.scss'

function MainPage() {
    return (
        <div>
            <ServiceDescription/>
            <AccountControl/>
        </div>
    );
}

export default MainPage;