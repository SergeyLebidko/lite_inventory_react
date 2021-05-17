export default function mapStateToPropsFactory(component) {
    switch (component) {
        case 'App':
            return state => {
                console.log('Состояние', state);
                return {
                    account: state.account
                }
            }
        default:
            return {}
    }
}