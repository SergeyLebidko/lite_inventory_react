import React from 'react';
import style from './NoMatch.module.scss';

function NoMatch({location}) {
    return (
        <div>Страница {location.pathname} не найдена...</div>
    );
}

export default NoMatch;

