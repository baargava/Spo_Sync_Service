import DataTables from "datatables.net-dt";
import { useEffect, useRef } from "react";

export function ReactDataTables(props) {
    const tableRef = useRef(null);

    useEffect(() => {
        // Ensure tableRef is valid before initializing DataTables
        if (!tableRef.current) {
            console.error("Table reference is not defined");
            return;
        }

        // Initialize DataTables with the ref to the table and passed props
        const dt = new DataTables(tableRef.current, {
            // Set default options if props are not defined
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            // Spread any props passed to this component into DataTables options
            ...props,
        });

        // Cleanup function to destroy the DataTable when the component unmounts
        return () => {
            dt.destroy();
        };
    }, [props]); // Effect will re-run if props change

    return <table ref={tableRef} className="display" style={{ width: "100%" }}></table>;
}

export default ReactDataTables;
