// React
import React, { useState, useEffect } from 'react';
import CarouselPricesModule from './modules/CarouselPricesModule';

function PriceListPage({ page, base }) {

    const [saleCatogories, setSaleCatogories] = useState([]);

    useEffect(() => {
        base(page.pageTitle)
            .select({ view: 'Grid view' })
            .firstPage(function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                const _saleCatogories = [];
                records.forEach(function (record) {
                    _saleCatogories.push({
                        category: record.get('Category'),
                        works: record.get('Works'),
                    })
                });
                setSaleCatogories(_saleCatogories);
            });
    }, [page.pageTitle]);

    return (
        <div id={'page'}>
            <div id='scrollContent'>
                <div style={{ textAlign: 'center', marginBottom: 15 }}>
                    Price List
                </div>
                <div style={{ textAlign: 'center', marginBottom: 25 }}>
                    Contact me, srticknor@gmail.com, to purchase.
                </div>
                {saleCatogories.map((saleCategory, index) => {
                    return (
                        <>
                            <CarouselPricesModule module={{
                                carouselLabel: saleCategory.category,
                                moduleWorks: saleCategory.works,
                                showWorkTitlesWithinModule: true,
                                showPrices: true
                            }} base={base} />
                        </>)
                })}
            </div>
        </div>
    );
}

export default PriceListPage;