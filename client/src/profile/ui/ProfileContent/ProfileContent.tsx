import { useAppSelector } from '../../../app/store/store.model';

export const ProfileContent = () => {
    const profileData = useAppSelector(state => state.user.profileData);
    if (!profileData) return <>No profile data</>;
    const { points, firstName, lastName, stat } = profileData;

    return (
        <div className='bg-second-bg p-2 m-2'>
            <div className='text-xl text-main'>
                <p>
                    {firstName} {lastName}
                </p>
                <p className='mt-2 text-green-700'>
                    Баллы: <span className='font-medium'>{points}</span>
                </p>
                <hr />
                <p className='mt-2 text-black'>
                    Всего сыграно игр: <span className='font-medium'>{stat.gamesPlayed}</span>
                </p>
                <p className='mt-2 text-black'>
                    Дано правильных ответов:{' '}
                    <span className='font-medium'>
                        {stat.correctAsnwers} из {stat.answersPlayed}
                    </span>
                </p>
            </div>
        </div>
    );
};
