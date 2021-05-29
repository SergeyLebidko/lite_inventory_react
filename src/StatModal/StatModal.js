import React from 'react';
import style from './StatModal.modal.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function StatModal({stat, closeForm, loadStat, clearError}) {

    let containerClass = `${style.container} ${style.modal}`;
    return (
        <div className={containerClass}>
            <h1>Сводные данные по вашему инвентарю</h1>
            <div className={style.control}>
                <input type="button" value="Закрыть" onClick={closeForm}/>
            </div>
        </div>
    )
}

let stateMap = mapStateToPropsFactory('StatModal');
let dispatchMap = mapDispatchToPropsFactory('StatModal');
export default connect(stateMap, dispatchMap)(StatModal);