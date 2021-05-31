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
                cards: state.equipmentCards,
                types: state.equipmentTypes,
                features: state.equipmentFeatures,
                selectedCard: state.selectedCard,
                equipmentsLoadError: state.equipmentsLoadError
            });
        case 'ControlBlock':
            return state => ({
                selectedGroup: state.selectedGroup,
                selectedCard: state.selectedCard,
                hasGroups: Boolean(state.groups),
                hasCards: Boolean(state.equipmentCards),
                mode: state.controlBlockMode
            });
        case 'StatModal':
            return state => ({
                error: state.error,
                stat: state.stat
            });
        case 'GroupCreateModal':
            return state => ({
                groups: state.groups,
                selectedGroup: state.selectedGroup,
                error: state.error
            })
        default:
            return null
    }
}