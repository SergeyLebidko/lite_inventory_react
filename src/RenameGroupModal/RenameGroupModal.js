import React, {useState, useEffect} from 'react';
import {connector} from '../store/storeConnector';
import style from './RenameGroupModal.module.scss';
import {ERROR_TIMEOUT} from '../settings';

function RenameGroupModal({rename, error, clearError, selectedGroup, closeForm}) {
    let [title, setTitle] = useState(selectedGroup.title);
    let [inputError, setInputError] = useState(null);

    // Сбрасываем ошибки при монтировании
    useEffect(() => clearError(), []);

    let changeTitleHandler = event => {
        let nextValue = event.target.value;
        if (nextValue && nextValue.trim() === '') return;
        setTitle(nextValue);
    };

    let saveHandler = () => {
        if (!title) {
            setInputError('Название не может быть пустым');
            setTimeout(() => setInputError(null), ERROR_TIMEOUT);
            return;
        }
        rename(selectedGroup.id, selectedGroup.title, title);
    }

    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Введите новое название для группы<br/>{selectedGroup.title}</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="title_field">Название:</label>
                    </td>
                    <td>
                        <input type="text" id="title_field" value={title} onChange={changeTitleHandler}/>
                    </td>
                </tr>
                </tbody>
            </table>
            {error ? <div className="error">{error}</div> : ''}
            {inputError ? <div className="error">{inputError}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Сохранить" onClick={saveHandler}/>
            </div>
        </div>
    );
}

export default connector(RenameGroupModal);