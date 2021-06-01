import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {createMaps} from '../store/maps';
import style from './StatModal.module.scss';

function StatModal({stat, error, closeForm, loadStat, clearStat, clearError, setStatSort}) {
    let [showZeroRow, setShowZeroRow] = useState(true);

    // При монтировании сбрасываем ошибки и загружаем статистику
    useEffect(() => {
        clearError();
        clearStat();
        loadStat();
    }, []);

    let changeShowZeroRowHandler = () => setShowZeroRow(!showZeroRow);

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
                        <div className={style.zero_row_control}>
                            Показывать нулевые строки:
                            <input type="checkbox" checked={showZeroRow} onChange={changeShowZeroRowHandler}/>
                        </div>
                        <details>
                            <summary>Количество оборудования по группам (шт.):</summary>
                            <div className={style.sort_control}>
                                <div>
                                    <span onClick={() => setStatSort('count_by_groups', 'title', true)}
                                          className={stat && stat.count_by_groups_sp === 'title;true' ? style.selected_order : ''}>
                                        &darr;
                                    </span>
                                    <span onClick={() => setStatSort('count_by_groups', 'title', false)}
                                          className={stat && stat.count_by_groups_sp === 'title;false' ? style.selected_order : ''}>
                                        &uarr;
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => setStatSort('count_by_groups', 'equipment_count', true)}
                                          className={stat && stat.count_by_groups_sp === 'equipment_count;true' ? style.selected_order : ''}>
                                        &darr;
                                    </span>
                                    <span onClick={() => setStatSort('count_by_groups', 'equipment_count', false)}
                                          className={stat && stat.count_by_groups_sp === 'equipment_count;false' ? style.selected_order : ''}>
                                        &uarr;
                                    </span>
                                </div>
                            </div>
                            <ul>
                                {stat.count_by_groups
                                    .filter(value => showZeroRow ? true : value.equipment_count > 0)
                                    .map(
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
                                    <span onClick={() => setStatSort('price_by_groups', 'title', true)}
                                          className={stat && stat.price_by_groups_sp === 'title;true' ? style.selected_order : ''}>
                                        &darr;
                                    </span>
                                    <span onClick={() => setStatSort('price_by_groups', 'title', false)}
                                          className={stat && stat.price_by_groups_sp === 'title;false' ? style.selected_order : ''}>
                                        &uarr;
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => setStatSort('price_by_groups', 'equipment_price', true)}
                                          className={stat && stat.price_by_groups_sp === 'equipment_price;true' ? style.selected_order : ''}>
                                        &darr;
                                    </span>
                                    <span onClick={() => setStatSort('price_by_groups', 'equipment_price', false)}
                                          className={stat && stat.price_by_groups_sp === 'equipment_price;false' ? style.selected_order : ''}>
                                        &uarr;
                                    </span>
                                </div>
                            </div>
                            <ul>
                                {stat.price_by_groups
                                    .filter(value => showZeroRow ? true : value.equipment_price > 0)
                                    .map(
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
                                    <span onClick={() => setStatSort('count_by_types', 'title', true)}
                                          className={stat && stat.count_by_types_sp === 'title;true' ? style.selected_order : ''}>
                                        &darr;
                                    </span>
                                    <span onClick={() => setStatSort('count_by_types', 'title', false)}
                                          className={stat && stat.count_by_types_sp === 'title;false' ? style.selected_order : ''}>
                                        &uarr;
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => setStatSort('count_by_types', 'equipment_count', true)}
                                          className={stat && stat.count_by_types_sp === 'equipment_count;true' ? style.selected_order : ''}>
                                        &darr;
                                    </span>
                                    <span onClick={() => setStatSort('count_by_types', 'equipment_count', false)}
                                          className={stat && stat.count_by_types_sp === 'equipment_count;false' ? style.selected_order : ''}>
                                        &uarr;
                                    </span>
                                </div>
                            </div>
                            <ul>
                                {stat.count_by_types
                                    .filter(value => showZeroRow ? true : value.equipment_count)
                                    .map(
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
                                    <span onClick={() => setStatSort('price_by_types', 'title', true)}
                                          className={stat && stat.price_by_types_sp === 'title;true' ? style.selected_order : ''}>
                                        &darr;
                                    </span>
                                    <span onClick={() => setStatSort('price_by_types', 'title', false)}
                                          className={stat && stat.price_by_types_sp === 'title;false' ? style.selected_order : ''}>
                                        &uarr;
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => setStatSort('price_by_types', 'equipment_price', true)}
                                          className={stat && stat.price_by_types_sp === 'equipment_price;true' ? style.selected_order : ''}>
                                        &darr;
                                    </span>
                                    <span onClick={() => setStatSort('price_by_types', 'equipment_price', false)}
                                          className={stat && stat.price_by_types_sp === 'equipment_price;false' ? style.selected_order : ''}>
                                        &uarr;
                                    </span>
                                </div>
                            </div>
                            <ul>
                                {stat.price_by_types
                                    .filter(value => showZeroRow ? true : value.equipment_price)
                                    .map(
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

export default connect(...createMaps('StatModal'))(StatModal);