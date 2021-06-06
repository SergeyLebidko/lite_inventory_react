import * as act from './actionCreators';

export default function mapDispatchToPropsFactory(component) {
    switch (component) {
        case 'App':
            return dispatch => ({
                loadAccount: () => dispatch(act.loadAccount()),
            })
        case 'AccountControl':
            return dispatch => ({
                logout: () => dispatch(act.logout()),
                setMode: mode => dispatch(act.setAccountControlMode(mode))
            })
        case 'LoginForm':
            return dispatch => ({
                login: (username, password) => dispatch(act.login(username, password)),
                clearError: () => dispatch(act.clearError())
            });
        case 'RegisterForm':
            return dispatch => ({
                register: (username, password, email, firstName, lastName) => {
                    dispatch(act.register(username, password, email, firstName, lastName))
                },
                clearError: () => dispatch(act.clearError())
            });
        case 'ResetPasswordForm':
            return dispatch => ({
                resetPassword: email => dispatch(act.resetPassword(email)),
                resetPasswordConfirm: (uuid, code, password) => dispatch(act.resetPasswordConfirm(uuid, code, password)),
                clearError: () => dispatch(act.clearError()),
                clearUuid: () => dispatch(act.clearResetPasswordUuid())
            });
        case 'RemoveAccountForm':
            return dispatch => ({
                remove: password => dispatch(act.removeAccount(password)),
                clearError: () => dispatch(act.clearError())
            });
        case 'ChangePasswordForm':
            return dispatch => ({
                change: (currentPassword, nextPassword) => dispatch(act.changePassword(currentPassword, nextPassword)),
                clearError: () => dispatch(act.clearError())
            });
        case 'EditAccountForm':
            return dispatch => ({
                edit: data => dispatch(act.editAccount(data)),
                clearError: () => dispatch(act.clearError())
            });
        case 'GroupBlock':
            return dispatch => ({
                loadGroups: () => dispatch(act.loadGroups()),
                clearGroups: () => dispatch(act.clearGroups()),
                clearSelectedGroup: () => dispatch(act.clearSelectedGroup()),
                clearSelectedCard: () => dispatch(act.clearSelectedCard()),
                clearGroupsLoadError: () => dispatch(act.clearGroupsLoadError()),
                clearEquipmentsLoadError: () => dispatch(act.clearLoadEquipmentsError()),
                clearEquipmentCards: () => dispatch(act.clearEquipmentCards()),
                clearEquipmentFeatures: () => dispatch(act.clearEquipmentFeatures()),
                clearEquipmentTypes: () => dispatch(act.clearEquipmentTypes())
            });
        case 'GroupList':
            return dispatch => ({
                setSelectedGroup: group => dispatch(act.setSelectedGroup(group)),
                loadEquipments: group => dispatch(act.loadEquipments(group)),
                clearSelectedCard: () => dispatch(act.clearSelectedCard())
            });
        case 'ControlBlock':
            return dispatch => ({
                setMode: mode => dispatch(act.setControlBlockMode(mode))
            });
        case 'StatModal':
            return dispatch => ({
                loadStat: () => dispatch(act.loadStat()),
                clearStat: () => dispatch(act.clearStat()),
                setStatSort: (section, field, reverseDirection = false) => {
                    dispatch(act.setStatSort(section, field, reverseDirection))
                },
                clearError: () => dispatch(act.clearError())
            });
        case 'GroupCreateModal':
            return dispatch => ({
                createGroup: (title, group) => dispatch(act.createGroup(title, group)),
                clearError: () => dispatch(act.clearError())
            });
        case 'RemoveGroupModal':
            return dispatch => ({
                clearError: () => dispatch(act.clearError()),
                removeGroup: group => dispatch(act.removeGroup(group))
            });
        case 'RenameGroupModal':
            return dispatch => ({
                clearError: () => dispatch(act.clearError()),
                rename: (groupId, currentTitle, nextTitle) => dispatch(act.renameGroup(groupId, currentTitle, nextTitle))
            });
        case 'RemoveCardModal':
            return dispatch => ({
                remove: card => dispatch(act.removeEquipmentCard(card)),
                clearError: () => dispatch(act.clearError())
            });
        case 'TypesModal':
            return dispatch => ({
                loadTypes: () => dispatch(act.loadEquipmentTypes()),
                clearLoadError: () => dispatch(act.clearLoadTypesError()),
                clearTypes: () => dispatch(act.clearEquipmentTypes()),
                clearError: () => dispatch(act.clearError()),
                update: (currentTypes, nextTypes) => dispatch(act.updateEquipmentTypes(currentTypes, nextTypes))
            });
        case 'CardModal':
            return dispatch => ({
                save: (currentCard, nextCard, currentFeatures, nextFeatures) => {
                    dispatch(act.saveEquipmentCard(currentCard, nextCard, currentFeatures, nextFeatures))
                },
                clearError: () => dispatch(act.clearError())
            })
        case 'EquipmentCard':
            return dispatch => ({
                setSelectedCard: card => dispatch(act.setSelectedCard(card))
            });
        case 'EquipmentBlock':
            return dispatch => ({
                clearSelectedCard: () => dispatch(act.clearSelectedCard())
            });
        default:
            return null
    }
}