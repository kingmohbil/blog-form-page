import { Link } from 'react-router-dom';
function NavItem(props) {
  if (props.on_click !== undefined) {
    return (
      <li className="nav-item">
        <button
          className={props.active ? 'nav-link active' : 'nav-link'}
          aria-current="page"
          id="nav-btn"
          onClick={props.on_click}
        >
          {props.title}
        </button>
      </li>
    );
  } else
    return (
      <li className="nav-item">
        <Link
          className={props.active ? 'nav-link active' : 'nav-link'}
          aria-current="page"
          to={props.href}
        >
          {props.title}
        </Link>
      </li>
    );
}

export default NavItem;
