import React, {useState, useEffect, useMemo, useRef} from 'react';
import {Modal} from './util/modal';
import {Loading} from './util/loading';

import http from "../utils/config/http";

const Template = (props) => {

  // const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState(null);

  useMemo(() => {
    http.get('https://jsonplaceholder.typicode.com/posts').then((result) => {
      console.log(result);
      setTemplate(result.data[0]);
    }).catch((err) =>
      console.log(err)
    ).finally(() =>
      console.log()
    )
  }, []);


  function changeInput(e){
    setTemplate({
      ...template,
      [e.target.name]: e.target.value
    });
  }


  return (
    <section className="template">
      <h1>Template</h1>      
      <p>{template}</p>

    </section>
);
}

export default Template;
