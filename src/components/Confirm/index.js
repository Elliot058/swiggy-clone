import ConfirmDialog from './ConfirmDialog';
import { createConfirmation } from 'react-confirm';
import { useUser } from '../../store/UserContext';

const confirm = createConfirmation(ConfirmDialog);

/**
 *
 * @param title {string}
 * @param message {string}
 * @param okLabel {string}
 * @param options {{}}
 * @returns {*}
 * @constructor
 */
const Confirm = (title, message, okLabel, options = {}) =>
    confirm({ ...options, title, confirmation: message, okLabel });

/**
 *
 * @param root {string=}
 * @returns {function(title:string=, message:string=, okLabel:string=, options:{cancelLabel:string}=): Promise<T>}
 */
export const useConfirm = (root = undefined) => {
    const [user] = useUser();
    const { institute = null } =
        user?.institutes?.find((each) => each.institute && each.institute._id === user.currentInstitute) || {};

    const color = institute?.colorCode?.primary;
    return (
        title = 'Are you sure?',
        message,
        okLabel = 'Yea, Sure',
        options = { cancelLabel: 'Cancel', primary: color },
    ) => confirm({ ...options, title, confirmation: message, okLabel });
};

export default Confirm;
