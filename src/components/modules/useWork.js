import React, { useState, useEffect } from 'react';

const formatWorkInfoLine = (work) => {
    var dimensionsString = undefined;
    if (work.width && work.height && work.depth) dimensionsString = `${work.width}" × ${work.height} × ${work.depth}"`;
    else if (work.width && work.height) dimensionsString = `${work.width}" × ${work.height}"`;

    var details = [work.title, work.year, work.medium, dimensionsString];
    details = details.filter((element) => { return element !== undefined })
    var detailsLine = [];

    for (var i = 0; i < details.length; i++) {
        if (i === 0) {
            detailsLine.push(<div><i>{details[i]}</i></div>)
        } else {
            detailsLine.push(<span>{details[i]}</span>)
            if (i !== details.length - 1) {
                detailsLine.push(<span>{' · '} </span>)
            }
        }

    }
    return (
        <div className="workText" style={{ textAlign: 'center' }}>
            {detailsLine.map((i) => { return i; })}
        </div>
    )
}

const useSingleWorkFromModule = (module, base) => {
    if (!module.moduleWorks) return undefined;
    const workID = module.moduleWorks.length > 0 ? module.moduleWorks[0] : undefined;
    const [work] = useWork(workID, base);
    return [work];
}

const useAllWorksFromModule = (module, base) => {
    if (!module.moduleWorks) return undefined;

    const [works, setWorks] = useState([]);

    useEffect(() => {
        const filterByFormula = "OR(" + module.moduleWorks.map(id => `RECORD_ID() = '${id}'`).join(",") + ")";
        base('Works').select({ filterByFormula }).eachPage((records) => {
            setWorks(works.concat(records.map(getValuesFromRecord)))
        }, (err) => { console.log(err) })

    }, [module])
    return [works];
}

const useWork = (recordId, base) => {
    const [work, setWork] = useState(undefined);

    useEffect(() => {
        base('Works').find(recordId, function (err, record) {
            if (err) { console.error(err); return; }
            setWork(getValuesFromRecord(record));
        });
    }, [recordId]);

    return [work];
}

const getValuesFromRecord = (record) => {
    const workImages = record.get('Work');
    return {
        url: workImages && workImages.length > 0 ? workImages[0].url : undefined,
        title: record.get('Title'),
        year: record.get('Year'),
        medium: record.get('Medium'),
        width: record.get('Width'),
        height: record.get('Height'),
        depth: record.get('Depth'),
        description: record.get('Description'),
        price: record.get('Price'),
        videourl: record.get('Video URL')
    }
}

export { useWork, useSingleWorkFromModule, useAllWorksFromModule, formatWorkInfoLine };

