import React, {useState, useEffect} from 'react';
import {connector} from '../store/storeConnector';
import style from './TypesModal.module.scss';

function TypesModal({types, loadTypes, clearTypes, error, clearError, loadError, clearLoadError, closeForm}) {
    let [tmpTypes, setTmpTypes] = useState(types);
    let [selectedType, setSelectedType] = useState(null);

    // При монтировании сбрасываем список типов и ошибки и снова запускаем загрузку списка типов
    useEffect(() => {
        clearTypes();
        clearLoadError();
        clearError();
        loadTypes();
    }, []);

    // При обновлении списка с сервера, сразу же заносим данные во временный список, с которым будем работать
    useEffect(() => setTmpTypes(types), [types]);

    let content = '';
    if (tmpTypes) {
        content = (
            <>
                <h1>Добавляйте, изменяйте или удаляйте типы оборудования</h1>
                <em>
                    Учтите, что при удалении типа оборудования, все карточки, связанные с этим типом также будут удалены
                </em>
                <div className={style.type_control}>
                    <input type="button" value="Добавить"/>
                    <input type="button" value="Изменить"/>
                    <input type="button" value="Удалить"/>
                </div>
                {tmpTypes.length > 0 ?
                    <ul>
                        {tmpTypes.map((type, index) =>
                            <li key={index}
                                className={type === selectedType ? style.selected : ''}
                                onClick={() => setSelectedType(type)}
                            >
                                {type.title}
                            </li>
                        )}
                    </ul>
                    :
                    ''
                }
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