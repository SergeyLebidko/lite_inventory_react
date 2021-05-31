import {connect} from 'react-redux';
import mapStateToPropsFactory from './stateMaps';
import mapDispatchToPropsFactory from './dispatchMaps';

export function connector(component) {
    let stateMap = mapStateToPropsFactory(component.name) || {};
    let dispatchMap = mapDispatchToPropsFactory(component.name) || {};
    return connect(stateMap, dispatchMap)(component);
}