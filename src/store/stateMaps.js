export default function mapStateToPropsFactory(component) {
    switch (component) {
        case 'AccountControl':
            return state => ({
                account: state.account,
                mode: state.accountControlMode
            });
        case 'RegisterForm':
            return state => ({
                error: state.error
            });
        case 'LoginForm':
            return state => ({
                error: state.error
            });
        case 'ResetPasswordForm':
            return state => ({
                error: state.error,
                uuid: state.resetPasswordUuid
            });
        case 'RemoveAccountForm':
            return state => ({
                error: state.error
            });
        case 'ChangePasswordForm':
            return state => ({
                error: state.error
            });
        case 'EditAccountForm':
            return state => ({
                account: state.account,
                error: state.error
            });
        case 'Inventory':
            return state => ({
                hasAccount: state.account !== null
            })
        case 'GroupBlock':
            return state => ({
                groupsLoadError: state.groupsLoadError
            });
        case 'GroupList':
            return state => ({
                groups: state.groups,
                selectedGroup: state.selectedGroup
            });
        case 'EquipmentBlock':
            return state => ({
                equipmentsLoadError: state.equipmentsLoadError,
                selectedGroup: state.selectedGroup,
                cards: state.equipmentCards ,
                features: state.equipmentFeatures
            })
        default:
            return null
    }
}