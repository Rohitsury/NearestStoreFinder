import React, { useEffect, useState } from 'react';
import '../../css/SplashScreen.css';
import { AppAssets } from '../../constant/AppAssets';

function SplashScreen() {
    const [showLogo, setShowLogo] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShowLogo(true);
        }, 4000)
    })
    return (
        <div className='welcome'>
            {
                showLogo ?
                    <>
                        <span id="splash-overlay" className="splash"></span>
                        <span id="welcome"></span>
                    </> :
                    <div className='logo'>
                        <img className='logo-img' src={AppAssets.MedicalPlusIcon} alt="" />
                        <h1 className='logo-text'>Medical Store Finder</h1>
                    </div>
            }
        </div>
    );
}

export default React.memo(SplashScreen);
