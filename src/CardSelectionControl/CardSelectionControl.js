import React from 'react';
import style from './CardSelectionControl.module.scss';

export const ALL_TYPES = 'all_types';

function CardSelectionControl({types, setTypeSelection}) {
    let typeSelectionChangeHandler = event => setTypeSelection(event.target.value);

    return (
        <div className={style.container}>
            <ul>
                {types ?
                    <li>
                        <span>Показать:</span>
                        <select onChange={typeSelectionChangeHandler}>
                            <option key={ALL_TYPES} value={ALL_TYPES} className={style.all}>-- все типы --</option>
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