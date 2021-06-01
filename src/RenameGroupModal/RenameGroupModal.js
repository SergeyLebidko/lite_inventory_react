import React from 'react';
import {connect} from 'react-redux';
import {createMaps} from '../store/maps';
import style from './RenameGroupModal.module.scss';

function RenameGroupModal({closeForm}) {
    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Введите новое название для группы</h1>
            <table>
                <tr>
                    <td>
                        <label htmlFor="title_field">Название:</label>
                    </td>
                    <td>
                        <input type="text" id="title_field"/>
                    </td>
                </tr>
            </table>
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Сохранить"/>
            </div>
        </div>
    );
}

export default connect(...createMaps('RenameGroupModal'))(RenameGroupModal);
