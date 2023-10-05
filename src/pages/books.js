import React, {useState, useEffect, useMemo, useRef} from 'react';
import BookForm from './book-form';

import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

import { API_URL } from "../utils/consts/api";
import http from "../utils/config/http";
import { format, isValid } from 'date-fns'

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

import "react-datepicker/dist/react-datepicker.css";
import { MenuItem, Button, Box} from '@mui/material';
import Swal from 'sweetalert2'

const Books = (props) => {

  const [data, setData] = useState([]);  
  const tableInstanceRef = useRef(null);
  const [currentBook, setCurrentBook] = useState({});    
  const [recallBooks, setRecallBooks] = useState([]);    

  const [dateRange, setDateRange] = useState(["", ""]);  
  const [rowSelection, setRowSelection] = useState({});
  const [rowCount, setRowCount] = useState(0);
  
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [anySelected, setAnySelected] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

   const [currentDate, setCurrentDate] = useState("");
   const [calendarVisible, setCalendarVisible] = useState(false);
  const [rangeDate, setRangeDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const [openModal, setOpenModal] = useState(false);

  useMemo(() => {    
    // const from = new Date('2020-01-02T00:00:00.000Z');
    // const to = new Date();
    // setDateRange([from, to]);    
      
    // http.post(`${API_URL}/logout`).then((result) => {
    //   console.log(result);    
    // }).catch((err) =>
    //   console.log(err)
    // ).finally(() =>
    //   console.log()
    // )

    
  }, []);
  
  useEffect(() => {
    let any=true;
    Object.keys(rowSelection).forEach(key => {       
      any=false;
    });  
    setAnySelected(any);
  }, [rowSelection]);
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        muiTableHeadCellProps: { },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        id: 'title',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'author',
        header: 'Autor',
        id: 'author',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'genre',
        header: 'Género',
        id: 'genre',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'publication_date',
        header: 'publicación',
        id: 'publication_date',
        enableColumnFilter: false,
        Cell: ({ cell }) => <span>{isValid(new Date(cell.getValue()))?format(new Date(cell.getValue()),"yyyy-MM-dd"):""}</span>,
      }
    ],
    [],
  );

  useEffect(() => {              
    let rangeDates=(dateRange[0] && dateRange[1])?[format(rangeDate[0].startDate,"yyyy-MM-dd HH:MM:SS"),format(rangeDate[0].endDate,"yyyy-MM-dd HH:MM:SS")]:["",""];        
    let data={
      id: "",
      title: "",
      author: "",
      genre: "",
      start_date: rangeDates[0],        
      end_date: rangeDates[1],        
      sorting: {},
      ...pagination,
    }         
    
    if(sorting && sorting[0]){
      data.sorting=sorting[0];
    }

    columnFilters.map((it)=>{
      data[it.id]=it.value;
    });     
    
    data.globalFilter=globalFilter?globalFilter:"";            
    
    console.log(data);      
    http.post(`${API_URL}/books/search`,data).then((result) => {        
      setData(result.data.data);           
      setRowCount(result.data.count);            
    }).catch((err) =>
      console.log(err)
    ).finally(() =>
      console.log()
    )    
  }, [
    dateRange,
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,

    recallBooks
  ]);


  const create= () => {    
    setCurrentBook({
      title: "",
      author: "",
      genre: "",
      amount: "",
      publication_date: "",
      isbn: "",
      publisher: "",
      pages: "",
      synopsis: ""
    });
    setOpenModal(true);    
  }
  const editBook= (book) => {
    console.log('editBook', book); 
    setCurrentBook(book.original);
    setOpenModal(true);
    document.querySelector(".MuiBackdrop-root").click();
  }
  
  const deleteAll= () => {
    let data1={
      books:[]
    }
    Object.keys(rowSelection).forEach(key => {  
      data1.books.push(data[key].id);
    });  
    Swal.fire({
      title: "¿Esta seguro de eliminar "+data1.books.length+" Libros?",
      text: "Una vez eliminados no se podra volver a visualizar.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        http.post(`${API_URL}/books/deleteAll`,data1).then((result) => {
          console.log(result);              
          if(result.data){
              Swal.fire('Se han eliminado '+data1.books.length+' Libros!', '', 'success');
              setRecallBooks(!recallBooks);
              setRowSelection({});
            }else{
              Swal.fire('Ha ocurrido un error, intenta nuevamente!', '', 'error')
            }        
        }).catch((err) =>
          console.log(err)
        ).finally(() =>
          console.log()
        )
      }
    })
  }  

  const deleteBook= (book) => {
    console.log('deleteBook', book);  
    document.querySelector(".MuiBackdrop-root").click();  
    Swal.fire({
      title: "¿Esta seguro de eliminar este Libro?",
      text: "Una vez eliminado no se podra volver a ver este Libro.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        http.delete(`${API_URL}/books/${book.original.id}`).then((result) => {          
          if(result.status==200){
            Swal.fire('El Libro ha sido eliminado!', '', 'success');
            setRecallBooks(!recallBooks);
          }else{
            Swal.fire('Ha ocurrido un error, intenta nuevamente!', '', 'error')
          }
        }).catch((err) =>
          console.log(err)
        ).finally(() =>
          console.log()
        )
      }
    });
  }

  const closeModal = () => {
    setOpenModal(false);
  }
  const saveModal = (book) => {
    setOpenModal(false);
    if(book.id){
      http.put(`${API_URL}/books/${book.id}`, book).then((result) => {          
        if(result.status==200){
          Swal.fire('El Libro ha sido Actualizado!', '', 'success');
          setRecallBooks(!recallBooks);
        }else{
          Swal.fire('Ha ocurrido un error, intenta nuevamente!', '', 'error')
        }
      }).catch((err) =>
        console.log(err)
      ).finally(() =>
        console.log()
      )
    }else{
      http.post(`${API_URL}/books`, book).then((result) => {          
        if(result.status==200){
          Swal.fire('El Libro ha sido creado!', '', 'success');
          setRecallBooks(!recallBooks);
        }else{
          Swal.fire('Ha ocurrido un error, intenta nuevamente!', '', 'error')
        }
      }).catch((err) =>
        console.log(err)
      ).finally(() =>
        console.log()
      )
    }
  } 
  
  const handleSelectDate = (date) => {    
    setRangeDate([date.selection]); 
    if(date.selection.startDate!=date.selection.endDate){
      setDateRange([date.selection.startDate, date.selection.endDate]); 
      setCurrentDate(format(new Date(date.selection.startDate),"dd-MMM-yyyy") +" / " + format(new Date(date.selection.endDate),"dd-MMM-yyyy")); 
    }               
  }
  
  return (
    <>
      <article className="books">
        <header>
          <h1>Libros</h1>
          <section>
            <label>Seleccione las fechas de publicación: </label>
            <article>              
              <input value={currentDate} onFocus={()=>{setCalendarVisible(true)}} />
              {dateRange[0]!="" && dateRange[1]!="" && <figure onClick={()=>{setDateRange(["",""]); setCurrentDate("")}}>Eliminar filtro</figure>}
              {calendarVisible && 
                <aside>  
                  <figure onClick={()=>{setCalendarVisible(false)}}>x</figure>
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleSelectDate}
                    moveRangeOnFirstSelection={false}
                    ranges={rangeDate}
                  /> 
                </aside>                
              }           
            </article>
          </section>
          <article>
            {false && <button className="btn btn1" onClick={create}>Crear Libro</button>}
          </article>
        </header>        
          <section>
            <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnOrdering
            enableRowSelection={true}  
            onRowSelectionChange={setRowSelection}         
            
            enablePagination={true}
            manualFiltering
            manualPagination
            manualSorting
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setGlobalFilter}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            rowCount={rowCount}
            state={
              {
                showColumnFilters: true,
                rowSelection,
                columnFilters,
                globalFilter,                
                pagination,                                
                sorting,
              }
            }    
            
                    
            enableGlobalFilter= {false}
            muiTableBodyRowProps={({ row }) => ({
              onClick: row.getToggleSelectedHandler(),
              sx: { cursor: 'pointer' },
            })}
                 
            enableRowActions={true}
            positionActionsColumn={'last'}
            renderRowActionMenuItems={({ row }) => [
              <MenuItem key="editar" onClick={() => editBook(row)}>
                Editar
              </MenuItem>,
              <MenuItem key="delete" onClick={() => deleteBook(row)}>
                Eliminar
              </MenuItem>,
            ]}

            renderTopToolbarCustomActions={({ table }) => (
              <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                <Button
                  color="primary"
                  onClick={create}
                  variant="contained"
                >
                  Crear Libro
                </Button>
                <Button
                  color="error"
                  disabled={anySelected}
                  onClick={deleteAll}
                  variant="contained"
                >
                  Eliminar Libros seleccionados
                </Button>
              </Box>
            )}
            localization={MRT_Localization_ES}
            />            
          </section>      
      </article>

      {!!openModal && (
          <BookForm closeModal={closeModal} book={currentBook} save={saveModal} />
      )}

    </>
);
}

export default Books;
