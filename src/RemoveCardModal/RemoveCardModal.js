import React, {useEffect} from 'react';
import {connector} from '../store/storeConnector';
import style from './RemoveCardModal.module.scss';

function RemoveCardModal({remove, selectedCard, error, clearError, closeForm}) {
    // При монтировании сбрасываем ошибки
    useEffect(() => clearError(), []);

    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Вы действительно хотите удалить выделенную карточку?</h1>
            {error ? <div className="error">{error}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Нет" onClick={closeForm}/>
                <input type="button" value="Да" onClick={()=>remove(selectedCard)}/>
            </div>
        </div>
    )
}

export default connector(RemoveCardModal);