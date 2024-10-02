import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt'; // DataTables CSS
import '../App.css'; // Custom styles

DataTable.use(DT); // Ensuring correct styles are used for DataTables

const DataGrid = () => {
    const [tableData, setTableData] = useState([]);
    const [columnKeys, setColumnKeys] = useState([]);

    // Fetch data from the API
    const getData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const responseData = await response.json();
            setTableData(responseData);

            // Generate column keys dynamically based on the first item in the data
            if (responseData.length > 0) {
                const generatedColumns = Object.keys(responseData[0]).map((key) => {
                    let customTitle;
                    switch (key) {
                        case 'userId':
                            customTitle = 'User ID';
                            break;
                        case 'id':
                            customTitle = 'Post ID';
                            break;
                        case 'title':
                            customTitle = 'Post Title';
                            break;
                        case 'body':
                            customTitle = 'Post Body';
                            break;
                        default:
                            customTitle = key; // Default to the key itself if no match
                    }
                    return { data: key, title: customTitle };
                });
                setColumnKeys(generatedColumns); // Set generated columns to state
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData(); // Fetch data on component mount
    }, []);

    // Fallback columns in case no data is available
    const fallbackColumns = [
        { data: 'userId', title: 'UserId' },
        { data: 'id', title: 'ID' },
        { data: 'title', title: 'Name' },
        { data: 'body', title: 'Body' },
    ];

    return (
        <div>
            <DataTable
                data={tableData} // Pass the fetched data
                columns={columnKeys.length > 0 ? columnKeys : fallbackColumns} // Use columnKeys if available, otherwise fallback
                className="display"
                responsive={true} // Make table responsive
            />
        </div>
    );
};

export default DataGrid;
