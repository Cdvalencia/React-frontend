import React, {useState, useEffect, useMemo, useRef} from 'react';
import { Route, Link, Routes, Redirect, withRouter, useLocation, useNavigate} from 'react-router-dom';
import { useUserContext } from "../../UserProvider";

const Nav = (props) => {
 
  const user = useUserContext();
  const [nav, setNav] = useState(props);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  useMemo(() => {
    // dispatch(getDesigns(1,2));
  }, []);

  useEffect(() => {
    setNav(props);
    // setEditorHtml(props.editor)
  },[props.name]);

  function changeInput(e){
    setNav({
      ...nav,
      [e.target.name]: e.target.value
    });
  }


  return (
    <>
    {
      user && 
      <nav>
        <h3>{user.name}</h3>
        <ul>        
          <li className={(path=="/home")?"active":""}>
            <Link to={"/home"}>
              Home
            </Link>
          </li>
          <li className={(path=="/libros")?"active":""}>
            <Link to={"/libros"}>
              Libros
            </Link>
          </li>        
            <li>
                <Link to={"/logout"}>
                  Cerrar Sesión
                </Link>
            </li>              
        </ul>
      </nav>
    }
  </>    
  )
}
export default Nav;
