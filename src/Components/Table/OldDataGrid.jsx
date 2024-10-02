import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import '../../App.css';

DataTable.use(DT);

const DataGrid = () => {
    const [tableData, setTableData] = useState([]);
    const [columnKeys, setColumnKeys] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const responseData = await response.json();
            setTableData(responseData);

            if (responseData.length > 0) {
                const generatedColumns = Object.keys(responseData[0]).map((key) => {
                    let customTitle;
                    switch (key) {
                        case 'userId':
                            customTitle = 'User ID';
                            break;
                        case 'id':
                            customTitle = 'ID';
                            break;
                        case 'title':
                            customTitle = 'Title';
                            break;
                        case 'body':
                            customTitle = 'Body';
                            break;
                        default:
                            customTitle = key;
                    }
                    return { data: key, title: customTitle };
                });
                setColumnKeys(generatedColumns);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const fallbackColumns = [
        { data: 'userId', title: 'UserId' },
        { data: 'id', title: 'ID' },
        { data: 'title', title: 'Name' },
        { data: 'body', title: 'Body' },
    ];

    return (
        <div className='flex items-center justify-center m-10 '>
            <DataTable
                data={tableData}
                columns={columnKeys.length > 0 ? columnKeys : fallbackColumns}
                className="display"
                responsive={true}
            />
        </div>
    );
};

export default DataGrid;