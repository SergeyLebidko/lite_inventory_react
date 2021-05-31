import {connect} from 'react-redux';
import mapStateToPropsFactory from './stateMaps';
import mapDispatchToPropsFactory from './dispatchMaps';

export default function connector(component){
    let statMap = mapStateToPropsFactory(component.name) || {};
    let dispatchMap = mapDispatchToPropsFactory(component.name) || {};
    return connect(statMap, dispatchMap)(component);
}