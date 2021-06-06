import React, {useState} from 'react';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import CardSelectionControl, {
    ALL_TYPES,
    SORT_PARAMS,
    SORT_DIRECTIONS
} from '../CardSelectionControl/CardSelectionControl';
import {connector} from '../store/storeConnector';
import {getFeaturesList} from '../utils';
import style from './EquipmentBlock.module.scss';

function getComparator(field, direction) {
    return (a, b) => {
        let result = 0;
        if (a[field] < b[field]) result = -1;
        if (a[field] > b[field]) result = 1;
        result *= direction;
        return result;
    }
}

function EquipmentBlock({cards, types, features, selectedCard, clearSelectedCard, equipmentsLoadError}) {
    let [typeSelection, setTypeSelection] = useState(ALL_TYPES);
    let [sortField, setSortField] = useState(SORT_PARAMS.NO_SORT);
    let [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.UP);

    // Показываем только выбранный тип, отсекая все остальные
    let tmpCards = cards ? [...cards] : [];
    if (typeSelection !== ALL_TYPES) {
        tmpCards = tmpCards.filter(card => card.equipment_type === +typeSelection);
    }

    let cardList = tmpCards.map(card => {
        let featureList = getFeaturesList(features, card.id);
        return <EquipmentCard key={card.id} card={card} types={types} featureList={featureList}/>
    });

    // Если выбранная карточка не входит в отображаемые сейчас - сбрасываем её
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
                    <CardSelectionControl
                        types={types}
                        setTypeSelection={setTypeSelection}
                        setSortField={setSortField}
                        setSortDirection={setSortDirection}
                    />
                    <ul className={style.card_list}>{cardList}</ul>
                </>
            }
        </div>
    );
}

export default connector(EquipmentBlock);