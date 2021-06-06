import React from 'react';
import {connector} from '../store/storeConnector';
import {getFeaturesList} from '../utils';
import style from './EquipmentBlock.module.scss';
import EquipmentCard from "../EquipmentCard/EquipmentCard";

function EquipmentBlock({cards, types, features, equipmentsLoadError}) {
    let cardList = '';

    if (cards) {
        cardList = cards.map(card => {
            let featureList = getFeaturesList(features, card.id);
            return <EquipmentCard card={card} types={types} featureList={featureList}/>
        });
    }

    let content = '';
    if (cardList.length > 0) content = <ul className={style.card_list}>{cardList}</ul>;

    return (
        <div className={style.container}>
            {equipmentsLoadError ? <div className="load_error">{equipmentsLoadError}</div> : content}
        </div>
    );
}

export default connector(EquipmentBlock);