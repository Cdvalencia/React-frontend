import React, {useState, useEffect, useMemo, useRef} from 'react';
import { MaterialReactTable } from 'material-react-table';

import http from "../utils/config/http";
import { DateTime } from "luxon";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Usuarios = (props) => {

  const [data, setData] = useState([]);
  const tableInstanceRef = useRef(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;  
  const [rowSelection, setRowSelection] = useState({});

  useMemo(() => {
    console.log(DateTime.now().toLocaleString());    
    setDateRange([new Date(DateTime.now().plus({days: -1}).toISODate()), new Date(DateTime.now().plus({days: 2}).toISODate())]);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        muiTableHeadCellProps: { },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        id: 'name',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'email',
        header: 'Email',
        id: 'email',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'username',
        header: 'User Name',
        id: 'username',
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

      http.get('https://jsonplaceholder.typicode.com/users').then((result) => {
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
      <article class="usuarios">
        <header>
          <h1>Usuarios</h1>
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
            />
          </section>
      }
      </article>

    </>
);
}

export default Usuarios;
