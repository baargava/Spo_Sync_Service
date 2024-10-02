import DataTables from "datatables.net-dt";
import { useEffect, useRef } from "react";

export function ReactDataTables(props) {
    const tableRef = useRef(null);

    useEffect(() => {
        // Initialize DataTables with the ref to the table and passed props
        const dt = new DataTables(tableRef.current, {
            ...props, // Spread any props passed to this component into DataTables options
        });

        // Cleanup function to destroy the DataTable when the component unmounts
        return () => {
            dt.destroy();
        };
    }, [props]); // Effect will re-run if props change

    return <table ref={tableRef}></table>;
}

export default ReactDataTables;
