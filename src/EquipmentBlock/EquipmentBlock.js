import React, {useState} from 'react';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import {connector} from '../store/storeConnector';
import {getFeaturesList, getTypeTitle} from '../utils';
import style from './EquipmentBlock.module.scss';

const ALL_TYPES = 'all_types';

// Подразумеваем, что отсутствие сортировки - это на самом деле сортировка по id, который не виден пользователю
const SORT_PARAMS = {
    NO_SORT: 'id',
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

function getComparator(field, direction, types) {
    // Функция сортировки для полей с числовыми значениями
    if (field === SORT_PARAMS.PRICE_FIELD || field === SORT_PARAMS.NO_SORT) {
        return (a, b) => {
            let result = 0;
            if (+a[field] < +b[field]) result = -1;
            if (+a[field] > +b[field]) result = 1;
            if (field !== SORT_PARAMS.NO_SORT) result *= direction;
            return result;
        }
    }

    // Функция сортировки для полей со строковыми изначениями
    if (field === SORT_PARAMS.INV_NUMBER_FIELD || field === SORT_PARAMS.TYPE_FIELD || field === SORT_PARAMS.WORKER_FIELD) {
        return (a, b) => {
            let aValue = a[field];
            let bValue = b[field];

            if (field === SORT_PARAMS.TYPE_FIELD) {
                aValue = getTypeTitle(types, aValue);
                bValue = getTypeTitle(types, bValue);
            }

            let result = 0;
            if (aValue < bValue) result = -1;
            if (aValue > bValue) result = 1;
            result *= direction;
            return result;
        }
    }

    // Функция сортировки для полей с датами
    if (field === SORT_PARAMS.PURCHASE_DATE_FIELD) {
        return (a, b) => {
            let aDate = Date.parse(a[field]);
            let bDate = Date.parse(b[field]);

            let result = 0;

            if (isNaN(aDate) && !isNaN(bDate)) result = -1;
            if (!isNaN(aDate) && isNaN(bDate)) result = 1;

            if (+aDate < +bDate) result = -1;
            if (+aDate > +bDate) result = 1;
            result *= direction;
            return result;
        }
    }
}

function EquipmentBlock({cards, types, features, selectedCard, clearSelectedCard, equipmentsLoadError}) {
    let [typeSelection, setTypeSelection] = useState(ALL_TYPES);
    let [sortField, setSortField] = useState(SORT_PARAMS.NO_SORT);
    let [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.UP);

    // Обработчики событий для блока сортировки и отбора
    let typeSelectionChangeHandler = event => setTypeSelection(event.target.value);
    let sortSelectionHandler = event => setSortField(event.target.value);
    let sortDirectionHandler = event => setSortDirection(event.target.value);

    let tmpCards = cards ? [...cards] : [];

    // Применяем выбранную сортировку
    tmpCards.sort(getComparator(sortField, sortDirection, types));

    // Показываем только выбранный тип, отсекая все остальные
    if (typeSelection !== ALL_TYPES) {
        tmpCards = tmpCards.filter(card => card.equipment_type === +typeSelection);
    }

    // Формируем список компонентов-карточек
    let cardList = tmpCards.map(card => {
        let featureList = getFeaturesList(features, card.id);
        return <EquipmentCard key={card.id} card={card} types={types} featureList={featureList}/>
    });

    // Если выбранная карточка не входит в отображаемые в данный момент - сбрасываем её
    let hasShowSelectedCard = false;
    for (let card of tmpCards) {
        if (selectedCard && card.id === selectedCard.id) {
            hasShowSelectedCard = true;
            break;
        }
    }
    if (!hasShowSelectedCard) clearSelectedCard();

    return (
        <div className={style.container}>
            {equipmentsLoadError ?
                <div className="load_error">{equipmentsLoadError}</div>
                :
                <>
                    {(cards && types) && (cards.length > 0) ?
                        <div className={style.selector_container}>
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
                                    <select
                                        onChange={sortDirectionHandler}
                                        disabled={sortField === SORT_PARAMS.NO_SORT}
                                    >
                                        <option value={SORT_DIRECTIONS.UP}>По возрастанию</option>
                                        <option value={SORT_DIRECTIONS.DOWN}>По убыванию</option>
                                    </select>
                                </li>
                                <li className={style.types_selector}>
                                    <span>Показать:</span>
                                    <select onChange={typeSelectionChangeHandler}>
                                        <option key={ALL_TYPES} value={ALL_TYPES} className={style.default}>-- все типы
                                            --
                                        </option>
                                        {types.map(type => <option key={type.id} value={type.id}>{type.title}</option>)}
                                    </select>
                                </li>
                            </ul>
                        </div>
                        :
                        ''
                    }
                    <ul className={style.card_list}>{cardList}</ul>
                </>
            }
        </div>
    );
}

export default connector(EquipmentBlock);