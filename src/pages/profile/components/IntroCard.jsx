/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';

import UpdateCoverPic from './UpdateCoverPic';
import UpdateProfilePic from './UpdateProfilePic';
import { useProfile } from '../../../hooks/queries';
import EditIntro from './EditIntro';
import { Avatar } from '@mui/material';
import defaultCoverPic from '../../../assets/defaultCover.png';
import LoadingPage from '../../../components/loaders/LoadingPage';

const IntroCard = () => {
  const location = useLocation();
  const currentUser = location.pathname.split('/').pop();
  const { data: user, isLoading } = useProfile(currentUser);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <div className='col-span-9 bg-white rounded-lg w-full overflow-hidden border border-gray-200  shadow'>
        <div className=' relative'>
          <img
            src={user?.cover || defaultCoverPic}
            alt='cover'
            className='w-full object-cover max-h-[150px] sm:max-h-[200px]'
          />

          {user?.isMyAccount && (
            <UpdateCoverPic currentPic={user.cover || defaultCoverPic} />
          )}
        </div>
        <div className='flex justify-between'>
          <div className='px-5 pb-5 w-fit'>
            {user?.isMyAccount ? (
              <UpdateProfilePic
                currentProfile={{
                  avatar: user.image || '',
                  userName: user.username,
                }}
              />
            ) : (
              <div className='flex justify-start -mt-[60px]'>
                <Avatar
                  alt={user?.username}
                  src={user?.image || ''}
                  sx={{ width: 120, height: 120 }}
                  className='outline outline-white'
                />
              </div>
            )}

            <h1 className='font-semibold mt-3 text-2xl'>
              {user?.fullname || user?.username}
            </h1>
            <p className='mb-3'>{user?.title || ''}</p>
          </div>
          {user?.isMyAccount && <EditIntro user={user} />}
        </div>
      </div>
    </>
  );
};

export default IntroCard;
