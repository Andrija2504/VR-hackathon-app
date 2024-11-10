import React, {StrictMode, useEffect, useState} from 'react' 
import { createRoot } from 'react-dom/client' 
import './index.css' 
import App from './App.tsx' 
 
 
// const WebXrContextProvider: React.FC = () => { 
//     const [isWebXrSupported, setIsWebXrSupported] = useState(false); 
// 
//     useEffect(() => { 
//         const checkWebXrSupport = async () => { 
//             if (navigator.xr && await navigator.xr.isSessionSupported('immersive-vr')) { 
//                 setIsWebXrSupported(true); 
//             } 
//         }; 
//         checkWebXrSupport(); 
//     }, []); 
// 
//     return <App isWebXrSupported={isWebXrSupported} />; 
// }; 
 
const WebXrContextProvider: React.FC = () => { 
    const [isWebXrSupported, setIsWebXrSupported] = useState(false); 
    // const [isVrReady, setIsVrReady] = useState(false); 
 
    useEffect(() => { 
        const checkWebXrSupport = async () => { 
 
            const nav = window.devicePixelRatio; 
            const isMeta = nav === 1; 
            if (isMeta) { 
                setIsWebXrSupported(true); 
            } 
             
            if(navigator.xr){ 
                console.log(true) 
            } else 
                console.log(false) 
             
            // if (navigator.xr) { 
            //     try { 
            //         // Log available session types 
            //         const isVrSupported = await navigator.xr.isSessionSupported('immersive-vr'); 
            //         const isArSupported = await navigator.xr.isSessionSupported('immersive-ar'); 
            //         // const nav = await navigator.userAgent.indexOf('Meta Quest Pro') 
            //         // const isArSupported = nav != -1; 
            //         // const nav = window.devicePixelRatio; 
            //         // const isArSupported = nav === 1; 
            // 
            //         console.log('VR Supported:', isVrSupported); 
            //         console.log('AR Supported:', isArSupported); 
            //         // console.log('Meta Quest Pro:', nav); 
            // 
            //         // If either VR or AR is supported, set the flag accordingly  
            //         if (isVrSupported || isArSupported) { 
            //         // if (isArSupported) { 
            //             setIsWebXrSupported(true); 
            //             // setIsVrReady(isVrSupported); 
            //         } 
            //     } catch (error) { 
            //         console.error('Error checking XR support:', error); 
            //     } 
            // } 
        }; 
 
        checkWebXrSupport(); 
    }, []); 
 
    return (         
        <div> 
            <div style={{ textAlign: 'center', padding: '20px', fontSize: '20px', fontWeight: 'bold' }}> 
                {navigator.xr ? "navigator.xr is true" : "navigator.xr is not true"} 
            </div> 
            <App isWebXrSupported={isWebXrSupported}/> 
        </div> 
    ) 
 
}; 
 
 
createRoot(document.getElementById('root')!).render( 
  <StrictMode> 
      <WebXrContextProvider /> 
  </StrictMode> 
)
