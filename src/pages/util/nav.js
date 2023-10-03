import React, {useState, useEffect, useMemo, useRef} from 'react';
import { Route, Link, Routes, Redirect, withRouter, useLocation, useNavigate} from 'react-router-dom';

const Nav = (props) => {

  // const dispatch = useDispatch();
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
    <nav>
      <ul>        
        <li className={(path=="/home")?"active":""}>
          <Link to={"/home"}>
            Home
          </Link>
        </li>
        <li className={(path=="/usuarios")?"active":""}>
          <Link to={"/usuarios"}>
            Usuarios
          </Link>
        </li>
        <li className={(path=="/posts")?"active":""}>
          <Link to={"/posts"}>
            Posts
          </Link>
        </li>
      </ul>
    </nav>
);
}

export default Nav;
