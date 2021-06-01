import React from 'react';
import {connector} from '../store/storeConnector';
import style from './CardModal.module.scss';

function CardModal({closeForm}) {
    return (
        <div className={style.container + ' ' + style.modal}>
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Сохранить"/>
            </div>
        </div>
    );
}

export default connector(CardModal);

