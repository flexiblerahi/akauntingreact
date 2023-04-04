import React from 'react';
import MUIDataTable from 'mui-datatables';

function Datatable(props) {
    return (
        <MUIDataTable
            title=""
            data={props.data}
            columns={props.columns}
            options={props.options}
        />
    )
}

export default Datatable