import './App.scss';
import { HomePage, ViewData } from './pages'
import { useState } from 'react'
import { useDeviceBreakPoint } from './hooks'

function App() {
  const [uid, setUID] = useState('')
  const [memberID, setMemberID] = useState('')
  const { isPhone, isTablet, isExtraSmall } = useDeviceBreakPoint()
  return (
    <div className="App">
      {
        !isPhone && !isTablet && !isExtraSmall ? //Nếu màn hình nhỏ quá thì show message
          uid == '' && memberID == '' ? //show homepage nếu chưa login hoặc chưa tra ttin nvien
            <HomePage setUID={setUID} setMemberID={setMemberID} />
            :
            <ViewData uid={uid} memberID={memberID} />
          : 
          <div className='notice'>Please open this app in a full-screen window on a PC as mobile devices are not supported.</div>
      }
    </div>
  );
}

export default App;
