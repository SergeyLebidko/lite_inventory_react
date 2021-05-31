import React, {useState, useEffect} from 'react';
import style from './GroupCreateModal.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function GroupCreateModal({groups, selectedGroup, error, clearError, createGroup, closeForm}) {
    let [title, setTitle] = useState('');
    let [inputError, setInputError] = useState(null);
    let [selectValue, setSelectValue] = useState(selectedGroup ? selectedGroup.id : 'root');

    // При монтировании сбрасываем ошибки
    useEffect(() => clearError(), []);

    let titleChangeHandler = event => {
        if (event.target.value.trim() === '') {
            setTitle('');
            return;
        }
        setTitle(event.target.value);
    };
    let selectHandler = event => setSelectValue(event.target.value);
    let createHandler = () => {
        if (title.length === 0) {
            setInputError('Введите название группы');
            setTimeout(() => setInputError(null), 4000);
            return;
        }

        let group = selectValue === 'root' ? null : selectValue;
        createGroup(title, group);
    }

    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Введите название новой группы</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="title_field">Название группы:</label>
                    </td>
                    <td>
                        <input type="text" id="title_field" value={title} onChange={titleChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Размещение:</label>
                    </td>
                    <td>
                        <select onChange={selectHandler} defaultValue={selectedGroup ? selectedGroup.id : 'root'}>
                            <option key="root" value="root">
                                -- поместить в корень --
                            </option>
                            {groups.map(group =>
                                <option key={group.id} value={group.id}>
                                    {group.title}
                                </option>
                            )}
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
            {inputError ? <div className="error">{inputError}</div> : ''}
            {error ? <div className="error">{error}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Создать" onClick={createHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('GroupCreateModal');
let dispatchMap = mapDispatchToPropsFactory('GroupCreateModal');
export default connect(stateMap, dispatchMap)(GroupCreateModal);