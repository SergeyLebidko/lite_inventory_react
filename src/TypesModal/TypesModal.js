import React, {useEffect} from 'react';
import {connector} from '../store/storeConnector';
import style from './TypesModal.module.scss';

function TypesModal({types, loadTypes, clearTypes, error, clearError, loadError, clearLoadError, closeForm}) {
    // При монтировании сбрасываем список типов и ошибки и снова запускаем загрузку списка типов
    useEffect(() => {
        clearTypes();
        clearLoadError();
        clearError();
        loadTypes();
    });

    let content = '';
    if (types) {
        content = (
            <>
                <h1>Добавляйте, изменяйте или удаляйте типы оборудования</h1>
                <em>
                    Учтите, что при удалении типа оборудования, все карточки, связанные с этим типом также будут удалены
                </em>
            </>
        );
    }

    return (
        <div className={style.container + ' ' + style.modal}>
            {content}
            {loadError ? <div className="load_error">{loadError}</div> : ''}
            {error ? <div className="error">{error}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Сохранить" disabled={!Boolean(types)}/>
            </div>
        </div>
    );
}

export default connector(TypesModal);