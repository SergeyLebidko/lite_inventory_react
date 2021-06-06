import React from 'react';
import style from './CardSelectionControl.module.scss';

export const ALL_TYPES = 'all_types';

export const SORT_PARAMS = {
    NO_SORT: 'no_sort',
    INV_NUMBER_FIELD: 'inv_number',
    TYPE_FIELD: 'equipment_type',
    WORKER_FIELD: 'worker',
    PURCHASE_DATE_FIELD: 'purchase_date',
    PRICE_FIELD: 'price'
}

export const SORT_DIRECTIONS = {
    UP: 1,
    DOWN: -1
}

function CardSelectionControl({types, setTypeSelection, setSortField, setSortDirection}) {
    let typeSelectionChangeHandler = event => setTypeSelection(event.target.value);
    let sortSelectionHandler = event => setSortField(event.target.value);
    let sortDirectionHandler = event => setSortDirection(event.target.value);

    return (
        <div className={style.container}>
            <ul>
                <li>
                    <span>Сортировать:</span>
                    <select onChange={sortSelectionHandler}>
                        <option value={SORT_PARAMS.NO_SORT} className={style.default}>
                            -- не сортировать --
                        </option>
                        <option value={SORT_PARAMS.INV_NUMBER_FIELD}>
                            Инв. номер
                        </option>
                        <option value={SORT_PARAMS.TYPE_FIELD}>
                            Тип
                        </option>
                        <option value={SORT_PARAMS.WORKER_FIELD}>
                            Должность пользователя
                        </option>
                        <option value={SORT_PARAMS.PURCHASE_DATE_FIELD}>
                            Дата приобретения
                        </option>
                        <option value={SORT_PARAMS.PRICE_FIELD}>
                            Цена
                        </option>
                    </select>
                </li>
                <li>
                    <select onChange={sortDirectionHandler}>
                        <option value={SORT_DIRECTIONS.UP}>По возрастанию</option>
                        <option value={SORT_DIRECTIONS.DOWN}>По убыванию</option>
                    </select>
                </li>
                {types ?
                    <li className={style.types_selector}>
                        <span>Показать:</span>
                        <select onChange={typeSelectionChangeHandler}>
                            <option key={ALL_TYPES} value={ALL_TYPES} className={style.default}>-- все типы --</option>
                            {types.map(type => <option key={type.id} value={type.id}>{type.title}</option>)}
                        </select>
                    </li>
                    :
                    ''
                }
            </ul>
        </div>
    )
}

export default CardSelectionControl;