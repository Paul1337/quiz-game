import { useAppSelector } from '../../app/store/store.model';

export const useAuth = () => {
    const isAuthed = useAppSelector(state => state.user.isAuthed);
    return isAuthed;
};
