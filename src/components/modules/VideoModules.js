// React
import React from 'react';
import { useSingleWorkFromModule, formatWorkInfoLine } from './useWork';

function VideoModule({ module, base }) {
    const [work] = useSingleWorkFromModule(module, base);

    if (!work) { return null }
    return (
        <div className='pageModule'>
            <div
                className='video' 
                style={{  position: "relative", width: "100%", height: 0, paddingBottom: "56.25%"}}
            >
                <iframe 
                    style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%' }}
                    src={`${work.videourl}?autoplay=1&mute=1`} 
                    frameborder="0" allow='autoplay' allowfullscreen>
                </iframe>
            </div>
            {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
            {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
            {module.moduleText && <div class="workText">{module.moduleText}</div>}
        </div>
    );
}

export { VideoModule }