import React, {useEffect} from 'react';
import style from './StatModal.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function StatModal({stat, error, closeForm, loadStat, clearStat, clearError}) {
    // При монтировании сбрасываем ошибки и загружаем статистику
    useEffect(() => {
        clearError();
        clearStat();
        loadStat();
    }, []);


    return (
        <div className={style.modal}>
            <h1>Сводные данные по вашему инвентарю</h1>
            {stat ?
                <ul>
                    <li>
                        Общее количество оборудования (шт.): <span className={style.value}>{stat.total_count}</span>
                    </li>
                    <li>
                        Общая стоимость оборудования (руб.): <span className={style.value}>{stat.total_price}</span>
                    </li>
                </ul>
                :
                ''
            }
            {
                stat && stat.total_count > 0 ?
                    <>
                        <details>
                            <summary>Количество оборудования по группам (шт.):</summary>
                            <div className={style.sort_control}>
                                <div>
                                    <span>&uarr;</span>
                                    <span>&darr;</span>
                                </div>
                                <div>
                                    <span>&uarr;</span>
                                    <span>&darr;</span>
                                </div>
                            </div>
                            <ul>
                                {stat.count_by_groups.map(
                                    value =>
                                        <li key={value.id}>
                                            {value.title}
                                            <span className={style.value}>{value.equipment_count}</span>
                                        </li>
                                )}
                            </ul>
                        </details>
                        <details>
                            <summary>Стоимость оборудования по группам (руб.):</summary>
                            <div className={style.sort_control}>
                                <div>
                                    <span>&uarr;</span>
                                    <span>&darr;</span>
                                </div>
                                <div>
                                    <span>&uarr;</span>
                                    <span>&darr;</span>
                                </div>
                            </div>
                            <ul>
                                {stat.price_by_groups.map(
                                    value =>
                                        <li key={value.id}>
                                            {value.title}
                                            <span className={style.value}>{value.equipment_price}</span>
                                        </li>
                                )}
                            </ul>
                        </details>
                        <details>
                            <summary>Количество оборудования по типам (шт.):</summary>
                            <div className={style.sort_control}>
                                <div>
                                    <span>&uarr;</span>
                                    <span>&darr;</span>
                                </div>
                                <div>
                                    <span>&uarr;</span>
                                    <span>&darr;</span>
                                </div>
                            </div>
                            <ul>
                                {stat.count_by_types.map(
                                    value =>
                                        <li key={value.id}>
                                            {value.title}
                                            <span className={style.value}>{value.equipment_count}</span>
                                        </li>
                                )}
                            </ul>
                        </details>
                        <details>
                            <summary>Стоимость оборудования по типам (руб.):</summary>
                            <div className={style.sort_control}>
                                <div>
                                    <span>&uarr;</span>
                                    <span>&darr;</span>
                                </div>
                                <div>
                                    <span>&uarr;</span>
                                    <span>&darr;</span>
                                </div>
                            </div>
                            <ul>
                                {stat.price_by_types.map(
                                    value =>
                                        <li key={value.id}>
                                            {value.title}
                                            <span className={style.value}>{value.equipment_price}</span>
                                        </li>
                                )}
                            </ul>
                        </details>
                    </>
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