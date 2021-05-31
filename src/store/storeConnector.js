import {connect} from 'react-redux';
import mapStateToPropsFactory from './stateMaps';
import mapDispatchToPropsFactory from './dispatchMaps';

export default function connector(component){
    let statMap = mapStateToPropsFactory(component) || {};
    let dispatchMap = mapDispatchToPropsFactory(component) || {};
    return connect(statMap, dispatchMap);
}