import {
    login,
    register,
    loadAccount,
    logout,
    setAccountControlMode,
    resetPassword,
    resetPasswordConfirm,
    clearResetPasswordUuid,
    removeAccount,
    changePassword,
    clearError,
    editAccount,
    loadGroups,
    clearSelectedGroup,
    setSelectedGroup,
    clearGroupsLoadError,
    loadEquipments,
    clearLoadEquipmentsError,
    setSelectedCard,
    clearSelectedCard,
    clearEquipmentCards,
    clearEquipmentFeatures,
    clearEquipmentTypes,
    loadStat,
    clearStat,
} from './actionCreators';

export default function mapDispatchToPropsFactory(component) {
    switch (component) {
        case 'App':
            return dispatch => ({
                loadAccount: () => dispatch(loadAccount()),
            })
        case 'AccountControl':
            return dispatch => ({
                logout: () => dispatch(logout()),
                setMode: mode => dispatch(setAccountControlMode(mode))
            })
        case 'LoginForm':
            return dispatch => ({
                login: (username, password) => dispatch(login(username, password)),
                clearError: () => dispatch(clearError())
            });
        case 'RegisterForm':
            return dispatch => ({
                register: (username, password, email, firstName, lastName) => {
                    dispatch(register(username, password, email, firstName, lastName))
                },
                clearError: () => dispatch(clearError())
            });
        case 'ResetPasswordForm':
            return dispatch => ({
                resetPassword: email => dispatch(resetPassword(email)),
                resetPasswordConfirm: (uuid, code, password) => dispatch(resetPasswordConfirm(uuid, code, password)),
                clearError: () => dispatch(clearError()),
                clearUuid: () => dispatch(clearResetPasswordUuid())
            });
        case 'RemoveAccountForm':
            return dispatch => ({
                remove: password => dispatch(removeAccount(password)),
                clearError: () => dispatch(clearError())
            });
        case 'ChangePasswordForm':
            return dispatch => ({
                change: (currentPassword, nextPassword) => dispatch(changePassword(currentPassword, nextPassword)),
                clearError: () => dispatch(clearError())
            });
        case 'EditAccountForm':
            return dispatch => ({
                edit: data => dispatch(editAccount(data)),
                clearError: () => dispatch(clearError())
            });
        case 'GroupBlock':
            return dispatch => ({
                loadGroups: () => dispatch(loadGroups()),
                clearSelectedGroup: () => dispatch(clearSelectedGroup()),
                clearSelectedCard: () => dispatch(clearSelectedCard()),
                clearGroupsLoadError: () => dispatch(clearGroupsLoadError()),
                clearEquipmentsLoadError: () => dispatch(clearLoadEquipmentsError()),
                clearEquipmentCards: () => dispatch(clearEquipmentCards()),
                clearEquipmentFeatures: () => dispatch(clearEquipmentFeatures()),
                clearEquipmentTypes: () => dispatch(clearEquipmentTypes())
            });
        case 'GroupList':
            return dispatch => ({
                setSelectedGroup: group => dispatch(setSelectedGroup(group)),
                loadEquipments: group => dispatch(loadEquipments(group)),
                clearSelectedCard: () => dispatch(clearSelectedCard())
            });
        case 'EquipmentBlock':
            return dispatch => ({
                setSelectedCard: card => dispatch(setSelectedCard(card))
            });
        case 'ControlBlock':
            return ({});
        case 'StatModal':
            return dispatch => ({
                loadStat: () => dispatch(loadStat()),
                clearStat: () => dispatch(clearStat()),
                clearError: () => dispatch(clearError())
            })
        default:
            return null
    }
}