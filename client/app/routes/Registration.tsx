import RegisterForm from '~/components/RegisterForm';
import TopBar from './TopBar'
import { useNavigate } from 'react-router';

function Register() {
  
  const activateCreate = true;
  const showCreateBtn = false;
  const showReturnButton = true;
  const navigateBackFromAbout = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-100 rounded-lg shadow">   
        <TopBar activateCreate={activateCreate} showCreateBtn={showCreateBtn} showReturnBtn={showReturnButton} useNav={navigateBackFromAbout} />
        <main>
          <div className='px-4 grid gap-3 grid-cols-1 lg:grid-cols-12'>
            <div className="col-span-12">
              <RegisterForm/>
            </div>
          </div>
        </main>
      </div>    
    </>
   
  )
}

export default Register