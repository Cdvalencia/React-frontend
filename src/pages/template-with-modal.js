import React, {useState, useEffect, useMemo, useRef} from 'react';
import {Modal} from './util/modal';

import http from "../utils/config/http";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


const ModalContainer = (props) => {
  const [state, setState] = useState({});
  const [login, setLogin] = useState({
    correo:"",
    password:""
  });

  useMemo(() => {
    console.log(props);
  }, []);

  const save = (info) => {
    props.saveModal();
  }

  function changeInput(e){
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <Modal closeModal={props.closeModal} titleModal={props.titleModal} save={ ev => save() } >
        <>          
          <header>
            <h2>Example modal</h2>
            <div onClick={props.closeModal}>
              <figure>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6487 10L19.9397 0.401841C20.0787 0.242331 19.9618 0 19.7471 0H17.2266C17.0782 0 16.936 0.0644171 16.8381 0.174847L10 8.09202L3.16189 0.174847C3.06714 0.0644171 2.92501 0 2.7734 0H0.252932C0.038155 0 -0.078709 0.242331 0.0602641 0.401841L8.35127 10L0.0602641 19.5982C0.0291329 19.6337 0.00916097 19.6772 0.00271883 19.7234C-0.00372332 19.7697 0.00363488 19.8168 0.0239206 19.8591C0.0442063 19.9014 0.0765674 19.9372 0.117161 19.9621C0.157755 19.9871 0.204876 20.0003 0.252932 20H2.7734C2.92185 20 3.06398 19.9356 3.16189 19.8251L10 11.908L16.8381 19.8251C16.9329 19.9356 17.075 20 17.2266 20H19.7471C19.9618 20 20.0787 19.7577 19.9397 19.5982L11.6487 10Z"/>
                </svg>
              </figure>
            </div>
          </header>          
          <article className="modal-home">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

              Why do we use it?
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).             
            </p>            
          </article>
          <footer>  
            <button className="btn btn1" onClick={save}>Aceptar</button>                      
            <button className="btn btn2" onClick={props.closeModal}>Cancelar</button>                      
          </footer>
        </>
      </Modal>
    </>
  );
}


const Home = (props) => {

  const [data, setData] = useState({
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],});
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [openModal, setOpenModal] = useState(false);

    
  useMemo(() => {
    http.get('https://jsonplaceholder.typicode.com/posts',data).then((result) => {      
      let datasets=[];
      let labels=[];
      result.data.map((it)=>{
        datasets.push(it.Perdidas)
        labels.push(it.Linea)
      });

      let grapData={
        labels,
        datasets: [
          {
            label: 'top 20 peores Tramos/Cliente',
            data: datasets,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],}
      setData(grapData);
    }).catch((err) =>
      console.log(err)
    ).finally(() =>
      console.log()
    )
    
  }, []);
    
  const closeModal = () => {
    setOpenModal(false);
  }
  const saveModal = () => {
    setOpenModal(false);
  }

  const loading = () => {
    document.getElementById("loading").style.display = 'flex';
    setTimeout(()=>{
      document.getElementById("loading").style.display = 'none';
    },5000);    
  }

  useEffect(() => {
    console.log(dateRange);
    if(dateRange[0] && dateRange[1]){
      let data = {
        "fechainicial": dateRange[0],
        "fechafinal": dateRange[1]
      };      
    }else{
      // setData([]);
    }
  }, [dateRange]);


  return (
    <>
      <article class="home">
        <header>
          <h1>Home</h1>          
        </header>
        <section>        
          <div>
            <button className="btn btn1" onClick={()=>{setOpenModal(true)}}>Open modal</button>
          </div>
          <div>
            <button className="btn btn1" onClick={loading}>Open Loading</button>
          </div>
          <div>
            <label>Seleccione las fechas de busqueda: </label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
          </div>
          {
            data && data.datasets && data.datasets.length>0 &&
              <div>
                <article>
                  <Radar data={data} />
                </article>
              </div>
          }
        </section>
        {!!openModal && (
            <ModalContainer closeModal={closeModal} titleModal="Login" loginInfo={openModal} saveModal={saveModal} />
        )}
      </article>

    </>
);
}

export default Home;
