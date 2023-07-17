// React
import React from 'react';
import { useAllWorksFromModule, formatWorkInfoLine } from './useWork';

function GridModule({ module, base }) {
    const [works] = useAllWorksFromModule(module, base);


    return (
        <div className='pageModule gridModule'>
        <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%', gap: 50, justifyContent: "space-between" }}>
            {
                works.map((w) => (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img
                            alt="artwork"
                            className='workImage'
                            src={w.url}
                            style={{ width: '100%' }}
                        />
                        {module.showWorkTitlesWithinModule && formatWorkInfoLine(w)}
                    </div>)
                )
            }
        </div>
        {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
        {module.moduleText && <div class="workText">{module.moduleText}</div>}
    </div>
    );
}

export { GridModule }