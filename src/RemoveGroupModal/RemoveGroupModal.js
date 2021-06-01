import React, {useEffect} from 'react';
import style from './RemoveGroupModal.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function RemoveGroupModal({error, clearError, selectedGroup, removeGroup, closeForm}) {
    // При монтировании сбрасываем ошибки
    useEffect(() => clearError(), []);

    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Вы действительно хотите удалить группу<br/>"{selectedGroup.title}"?</h1>
            {error ? <div className="error">{error}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Нет" onClick={closeForm}/>
                <input type="button" value="Да" onClick={() => removeGroup(selectedGroup)}/>
            </div>
        </div>
    )
}

let stateMap = mapStateToPropsFactory('RemoveGroupModal');
let dispatchMap = mapDispatchToPropsFactory('RemoveGroupModal');
export default connect(stateMap, dispatchMap)(RemoveGroupModal);
