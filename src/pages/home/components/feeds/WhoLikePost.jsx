import { Avatar } from '../../../../imports/import';
import { Link } from 'react-router-dom';

const WhoLikePost = ({ like, error }) => {
  if (error) {
    console.log(error);
    return null;
  }
  return (
    <Link
      to={`/in/${like?.author?.user?.username}`}
      className='flex items-center gap-3 px-6 py-1 cursor-pointer'
    >
      <Avatar
        alt={like?.author?.user?.username}
        src={like?.author?.image || ''}
        sx={{ width: 48, height: 48 }}
        className='outline outline-white'
      />
      <div className=' border-b flex-1 py-4 group'>
        <h1 className='text-sm font-semibold'>
          {like?.author?.fullname || like?.author?.user?.username}
        </h1>
        <h2 className='text-secondary text-xs group-hover:underline'>
          {like?.author?.title || ''}
        </h2>
      </div>
    </Link>
  );
};

export default WhoLikePost;
