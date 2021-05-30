import React, {useEffect} from 'react';
import style from './StatModal.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import {error} from "../store/reducers";

function StatModal({stat, error, closeForm, loadStat, clearError}) {
    // При монтировании сбрасываем ошибки и загружаем статистику
    useEffect(() => {
        clearError();
        loadStat();
    }, []);

    console.log(stat);

    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Сводные данные по вашему инвентарю</h1>
            {stat ?
                <ul>
                    <li>
                        Общее количество оборудования (шт.): <input type="text" value={stat.total_count} disabled/>
                    </li>
                    <li>
                        Общая стоимость оборудования (руб.): {stat.total_price}
                    </li>
                </ul>
                :
                ''
            }
            {error ? <div className="error">{error}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Закрыть" onClick={closeForm}/>
            </div>
        </div>
    )
}

let stateMap = mapStateToPropsFactory('StatModal');
let dispatchMap = mapDispatchToPropsFactory('StatModal');
export default connect(stateMap, dispatchMap)(StatModal);