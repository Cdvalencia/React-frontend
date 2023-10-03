import React, {useState, useEffect, useMemo, useRef} from 'react';
import { MaterialReactTable } from 'material-react-table';

import http from "../utils/config/http";
import { DateTime } from "luxon";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Posts = (props) => {

  const [data, setData] = useState([]);
  const tableInstanceRef = useRef(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;  
  const [rowSelection, setRowSelection] = useState({});

  useMemo(() => {
    console.log(DateTime.now().toLocaleString({year: "numeric",month: "2-digit",day: "2-digit"}));    
    setDateRange([new Date(DateTime.now().plus({days: -1}).toISODate({year: "numeric",month: "2-digit",day: "2-digit"})), new Date(DateTime.now().plus({days: 2}).toISODate({year: "numeric",month: "2-digit",day: "2-digit"}))]);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'userId',
        header: 'User ID',
        muiTableHeadCellProps: { },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        id: 'title',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'body',
        header: 'Body',
        id: 'body',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      }
    ],
    [],
  );

  useEffect(() => {
  }, [rowSelection]);


  useEffect(() => {
    console.log(dateRange);
    if(dateRange[0] && dateRange[1]){
      let data = {
        "fechainicial": new Date(dateRange[0]),
        "fechafinal": new Date(dateRange[1])
      };

      http.get('https://jsonplaceholder.typicode.com/posts').then((result) => {
        console.log(result);
        setData(result.data);
      }).catch((err) =>
        console.log(err)
      ).finally(() =>
        console.log()
      )
    }else{
      setData([]);
    }
  }, [dateRange]);


  return (
    <>
      <article class="posts">
        <header>
          <h1>Post</h1>
          <section>
            <label>Seleccione las fechas de busqueda: </label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              dateFormat="dd/MM/yyyy"
              isClearable={true}
            />
          </section>
        </header>
        {
          data && data.length>0 &&
          <section>
            <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnOrdering
            enableRowSelection
            enablePagination={true}
            onRowSelectionChange={setRowSelection}
            state={{ rowSelection }}
            tableInstanceRef={tableInstanceRef}

            manualPagination={false}

            enableRowActions                        
            positionActionsColumn="last"
            renderRowActionMenuItems={({ row, table }) => [
              <div key="edit" onClick={() => table.setEditingRow(row)}>
                Edit
              </div>,
              <div key="delete" onClick={() => console.info('Delete')}>
                Delete
              </div>,
            ]}

            // renderRowActions={({ row, table }) => (
            //   <div sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            //     <button
            //       color="primary"
            //       onClick={() =>
            //         window.open(
            //           `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`,
            //         )
            //       }
            //     >
            //       EmailIcon
            //     </button>
            //     <button
            //       color="secondary"
            //       onClick={() => {
            //         table.setEditingRow(row);
            //       }}
            //     >
            //       EditIcon
            //     </button>
            //     <button
            //       color="error"
            //       onClick={() => {
            //         data.splice(row.index, 1); //assuming simple data table
            //         setData([...data]);
            //       }}
            //     >
            //       DeleteIcon
            //     </button>
            //   </div>
            // )}
            
            />
          </section>
      }
      </article>

    </>
);
}

export default Posts;
