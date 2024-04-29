import Board from '@/components/Board';
import LoginView from '@/components/views/LoginView';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import Boards from '@/components/Boards';
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <LoginView />
      </div>
    );
  }
  return (
    <div>
      <h1 className='text-4xl mb-4'>Your Boards</h1>
      <Boards />
      <div>
        <Link
          className='btn primary mt-4 inline-flex gap-2 justify-center items-center'
          href={'/new-board'}
        >
          Create New Board
          <FontAwesomeIcon className='h-5' icon={faArrowRight} />
        </Link>
      </div>{' '}
      {/* <Board /> */}
    </div>
  );
}
