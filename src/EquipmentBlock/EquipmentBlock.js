import React from 'react';
import style from './EquipmentBlock.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function EquipmentBlock({cards, types, features, equipmentsLoadError}) {
    let getTypeTitle = typeId => {
        for (let type of types) if (type.id === typeId) return type.title;
        return null;
    }

    let getFeaturesList = cardId => {
        return features.filter(feature => feature.equipment_card === cardId);
    }

    let cardList = cards.map(card => {
        let typeTitle = getTypeTitle(card.equipment_type);
        if (!typeTitle) typeTitle =
            <span className="load_error">{"...не удалось определить тип оборудования..."}</span>;

        let featureList = getFeaturesList(card.id);

        return (
            <li key={card.id} className={style.card}>
                <table>
                    <tbody>
                    {card.inv_number ?
                        <tr>
                            <td>
                                Инв. номер:
                            </td>
                            <td>
                                {card.inv_number}
                            </td>
                        </tr>
                        :
                        ''
                    }
                    <tr>
                        <td>
                            Тип:
                        </td>
                        <td>
                            {typeTitle}
                        </td>
                    </tr>
                    {card.title ?
                        <tr>
                            <td>
                                Описание:
                            </td>
                            <td>
                                {card.title}
                            </td>
                        </tr>
                        :
                        ''
                    }
                    {card.comment ?
                        <tr>
                            <td>
                                Комментарий:
                            </td>
                            <td>
                                {card.comment}
                            </td>
                        </tr>
                        :
                        ''
                    }
                    {card.worker ?
                        <tr>
                            <td>
                                Должность пользователя:
                            </td>
                            <td>
                                {card.worker}
                            </td>
                        </tr>
                        :
                        ''
                    }
                    {card.purchase_date ?
                        <tr>
                            <td>
                                Дата приобретения:
                            </td>
                            <td>
                                {card.purchase_date}
                            </td>
                        </tr>
                        :
                        ''
                    }
                    {card.price ?
                        <tr>
                            <td>
                                Стоимость:
                            </td>
                            <td>
                                {card.price}
                            </td>
                        </tr>
                        :
                        ''
                    }
                    </tbody>
                </table>
                {featureList.length > 0 ?
                    <details>
                        <summary>Характеристики:</summary>
                        <ul>
                            {featureList.map(feature => {
                                return (
                                    <li>
                                        <span>{feature.name}</span>
                                        <span>{feature.value}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </details>
                    :
                    ''
                }
            </li>
        );
    });

    let content = '';
    if (cardList.length > 0) content = <ul className={style.card_list}>{cardList}</ul>;

    return (
        <div className={style.container}>
            {equipmentsLoadError ? <div className="load_error">{equipmentsLoadError}</div> : content}
        </div>
    );
}

let stateMap = mapStateToPropsFactory('EquipmentBlock');
let dispatchMap = mapDispatchToPropsFactory('EquipmentBlock');
export default connect(stateMap, dispatchMap)(EquipmentBlock);