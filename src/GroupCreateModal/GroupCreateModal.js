import React from 'react';
import style from './GroupCreateModal.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function GroupCreateModal({closeForm}) {
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
                            <input type="text" id="title_field"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="parent_group_field">Размещение:</label>
                        </td>
                        <td>
                            <select id="parent_group_field">
                                <option>-- поместить в корень --</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('GroupCreateModal');
let dispatchMap = mapDispatchToPropsFactory('GroupCreateModal');
export default connect(stateMap, dispatchMap)(GroupCreateModal);