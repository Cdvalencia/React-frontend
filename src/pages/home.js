import React, { useMemo } from 'react';

import http from "../utils/config/http";
import { API_URL } from "../utils/consts/api";
import namor from 'namor'
import Swal from 'sweetalert2'

const Home = (props) => {

  useMemo(() => {    
  }, []);
    
  const createBooks = () => {
    function getRamdomDateInBetween(start, end) {
        start = Date.parse(start);
        end = Date.parse(end);

        return new Date(Math.floor(Math.random() * (end - start + 1) + start));
    }
    for (let index = 0; index < 40; index++) {   
      let book={
        "title": namor.generate({ words: 4}),
        "author": namor.generate({ words: 2}),
        "genre": namor.generate({ words: 1}),
        "amount": Math.floor(Math.random() * 100),
        "publication_date": getRamdomDateInBetween('2020-01-01', '2023-01-30'),
        "isbn": Math.floor(Math.random() * 100),
        "publisher": namor.generate({ words: 1}),
        "pages": Math.floor(Math.random() * 500),
        "synopsis": namor.generate({ words: 4}),        
      }   
      http.post(`${API_URL}/books`,book).then((result) => {
        console.log(result); 
      }).catch((err) =>
      console.log(err)
      ).finally(() =>
      console.log()
      )
    }
    Swal.fire('Se han creado 40 Libros!', '', 'success');        
  }



  return (
    <>
      <article className="home">
        <header>
          <h1>Home</h1>          
        </header>
        <section>        
          <div>
            <button className="btn btn1" onClick={createBooks}>Crear 40 libros del 2000 a 2023</button>
          </div>                    
        </section>        
      </article>

    </>
);
}

export default Home;