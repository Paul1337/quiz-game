import { useAppSelector } from '../../app/store/store.model';

export const useAuth = () => {
    const isAuthed = useAppSelector(state => state.user.isAuthed);
    const roles = useAppSelector(state => state.user.userData?.roles);
    return {
        isAuthed,
        roles: roles ?? [],
    };
};
