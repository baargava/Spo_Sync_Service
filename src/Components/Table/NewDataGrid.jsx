import React, { useEffect, useState } from 'react';
import '../../App.css';
import ReactDataTables from './CustomTable';
import apiServices from '../../Config/Apiconfig';

const DataGrid = () => {
    const [tableData, setTableData] = useState([]);
    const [columnKeys, setColumnKeys] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(`${apiServices.comments}`);
            const responseData = await response.json();
            setTableData(responseData);

            if (responseData.length > 0) {
                const firstItem = responseData[0];
                const allowedKeys = ['id', 'postId', 'body'];
                const generatedColumns = [];

                // Filter the data based on allowed keys
                const filteredData = responseData.map(item => {
                    const filteredItem = {};
                    allowedKeys.forEach(key => {
                        if (key in item) {
                            filteredItem[key] = item[key];
                        }
                    });
                    return filteredItem;
                });

                // Set the filtered data to tableData

                // Generate columns based on allowed keys
                allowedKeys.forEach(key => {
                    if (key in firstItem) {
                        const customTitle = key.toUpperCase();
                        generatedColumns.push({ data: key, title: customTitle });
                    }
                });

                setColumnKeys(generatedColumns); // Set the generated columns
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Define fallback columns
    const fallbackColumns = [
        { data: 'userId', title: 'UserId' },
        { data: 'id', title: 'ID' },
        { data: 'title', title: 'Name' },
        { data: 'body', title: 'Body' },
    ];

    return (
        <div className='flex items-center justify-center m-10'>
            <ReactDataTables
                data={tableData} // Use tableData directly
                columns={columnKeys.length > 0 ? columnKeys : fallbackColumns}
                className="display"
                select={true}
                responsive={true}
            />
        </div>
    );
};

export default DataGrid;
