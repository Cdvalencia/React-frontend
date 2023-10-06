import React, {useState, useEffect, useMemo, useRef} from 'react';
import { Modal } from './util/modal';
import Swal from 'sweetalert2'
import { format, isValid} from 'date-fns'

import { Calendar } from 'react-date-range';

const BookForm = (props) => {

    // const dispatch = useDispatch();
    const [book, setBook] = useState(props.book);        
    const [validationBook, setValidationBook] = useState({});  
    const [title, setTitle] = useState((!(props.book.title))?"Crear libro":"Editando libro - "+props.book.title);   
    const [date, setDate] = useState(null);     
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
              

    useMemo(() => {      
        let validation={}
        Object.keys(props.book).forEach(key => validation[key] = {
            dirty: false,
            touched: false
        });        
        setValidationBook(validation); 
               
        setDate((props.book.publication_date=="")?"":new Date(props.book.publication_date)); 
        setBook({
            ...book,
            publication_date: (props.book.publication_date=="")?"": format(new Date(props.book.publication_date),"dd-MMM-yyyy")
        });
    }, []);
    
    
    const save = () => { 
        let valid=true;
        let validationBook2={};
        Object.keys(book).forEach(key => {
            if(book[key]==""){
                valid =false; 
                validationBook2[key]={
                    dirty: true,
                    touched: false
                }                                               
            }
        });                                  
        setValidationBook({
            ...validationBook,
            ...validationBook2
        });    
        valid=true;                
        if(valid){
            props.save(book);
        }else{
            Swal.fire('Todos los campos no están completos.', '', 'warning');
        }
    }  

  function changeInput(e){
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
    setValidationBook({
      ...validationBook,
      [e.target.name]: {
        dirty: true
      }
    });
  }
  function setDateHandle(date){
    setBook({
      ...book,
      publication_date: format(new Date(date),"dd-MMM-yyyy")
    });
    setValidationBook({
      ...validationBook,
      publication_date: {
        dirty: true
      }
    });
    setCalendarVisible(false);
  }
  return (
    <>
        <Modal closeModal={props.closeModal} titleModal={props.titleModal} save={ ev => save() }>
        <>          
            <header>              
            <h2>{title}</h2>
            <div onClick={props.closeModal}>
                <figure>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6487 10L19.9397 0.401841C20.0787 0.242331 19.9618 0 19.7471 0H17.2266C17.0782 0 16.936 0.0644171 16.8381 0.174847L10 8.09202L3.16189 0.174847C3.06714 0.0644171 2.92501 0 2.7734 0H0.252932C0.038155 0 -0.078709 0.242331 0.0602641 0.401841L8.35127 10L0.0602641 19.5982C0.0291329 19.6337 0.00916097 19.6772 0.00271883 19.7234C-0.00372332 19.7697 0.00363488 19.8168 0.0239206 19.8591C0.0442063 19.9014 0.0765674 19.9372 0.117161 19.9621C0.157755 19.9871 0.204876 20.0003 0.252932 20H2.7734C2.92185 20 3.06398 19.9356 3.16189 19.8251L10 11.908L16.8381 19.8251C16.9329 19.9356 17.075 20 17.2266 20H19.7471C19.9618 20 20.0787 19.7577 19.9397 19.5982L11.6487 10Z"/>
                </svg>
                </figure>
            </div>
            </header>          
            <article className="modal-book">
            <form action="">
                <div>                  
                    <div>
                        <label htmlFor="title">Titulo</label>
                        <input type="text" name="title" value={book.title} placeholder="Titulo" onChange={changeInput} />
                        {validationBook.title && validationBook.title.dirty && book.title=="" && <span>El Titulo es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="author">Autor</label>
                        <input type="text" name="author" value={book.author} placeholder="Autor" onChange={changeInput} />
                        {validationBook.author && validationBook.author.dirty && book.author=="" && <span>El Autor es requerido</span>}
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="genre">Género</label>
                        <input type="text" name="genre" value={book.genre} placeholder="Género" onChange={changeInput} />
                        {validationBook.genre && validationBook.genre.dirty && book.genre=="" && <span>El Género es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="amount">Cantidad</label>
                        <input type="text" name="amount" value={book.amount} placeholder="Cantidad" onChange={changeInput} />
                        {validationBook.amount && validationBook.amount.dirty && book.amount=="" && <span>La Cantidad es requerido</span>}
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="publication_date">Fecha de publicación</label>
                        <input type="text" name="publication_date" value={book.publication_date} placeholder="Fecha de publicación" onFocus={()=>{setCalendarVisible(true)}} />
                        {calendarVisible && 
                            <aside>                                  
                                <Calendar 
                                    onChange={item => setDateHandle(item)}
                                    date={date} 
                                />
                            </aside>                
                        }    
                        {validationBook.publication_date && validationBook.publication_date.dirty && book.publication_date=="" && <span>La Fecha de publicación es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="isbn">isbn</label>
                        <input type="text" name="isbn" value={book.isbn} placeholder="isbn" onChange={changeInput} />
                        {validationBook.isbn && validationBook.isbn.dirty && book.isbn=="" && <span>El isbn es requerido</span>}
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="publisher">Publicado</label>
                        <input type="text" name="publisher" value={book.publisher} placeholder="Publicado" onChange={changeInput} />
                        {validationBook.publisher && validationBook.publisher.dirty && book.publisher=="" && <span>Publicado es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="pages">Páginas</label>
                        <input type="text" name="pages" value={book.pages} placeholder="Páginas" onChange={changeInput} />
                        {validationBook.pages && validationBook.pages.dirty && book.pages=="" && <span>El número de Páginas es requerido</span>}
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="synopsis">Sinopsis</label>
                        <input type="text" name="synopsis" value={book.synopsis} placeholder="Sinopsis" onChange={changeInput} />
                        {validationBook.synopsis && validationBook.synopsis.dirty && book.synopsis=="" && <span>La Sinopsis es requerido</span>}
                    </div>
                    <div>
                        {book.id && <label htmlFor="id">id</label>}
                        {book.id && <input type="text" name="id" disabled value={book.id} placeholder="id" onChange={changeInput} />}
                    </div>
                </div>
            </form>  
            </article>
            <footer>  
            <button className="btn btn1" onClick={save}>Guardar</button>                      
            <button className="btn btn2" onClick={props.closeModal}>Cancelar</button>                      
            </footer>
        </>
        </Modal>
    </>    
);
}

export default BookForm;
