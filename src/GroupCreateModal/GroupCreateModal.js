import React, {useState} from 'react';
import style from './GroupCreateModal.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function GroupCreateModal({groups, selectedGroup, createGroup, closeForm}) {
    let [title, setTitle] = useState('');
    let [inputError, setInputError] = useState(null);
    let [selectValue, setSelectValue] = useState(selectedGroup ? selectedGroup.id : 'root');

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
                        <label htmlFor="parent_group_field">Размещение:</label>
                    </td>
                    <td>
                        <select id="parent_group_field" onChange={selectHandler}>
                            <option key="root" value="root" selected={selectValue === 'root'}>
                                -- поместить в корень --
                            </option>
                            {groups.map(group =>
                                <option key={group.id} value={group.id} selected={selectValue === group.id}>
                                    {group.title}
                                </option>
                            )}
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
            {inputError ? <div className="error">{inputError}</div> : ''}
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