import mapStateToPropsFactory from './stateMaps';
import mapDispatchToPropsFactory from './dispatchMaps';

export function createMaps(component) {
    let stateMap = mapStateToPropsFactory(component);
    let dispatchMap = mapDispatchToPropsFactory(component);
    return [stateMap, dispatchMap];
}