function NavItem(props) {
  return (
    <li className="nav-item">
      <a
        className={props.active ? 'nav-link active' : 'nav-link'}
        aria-current="page"
        href={props.href}
      >
        {props.title}
      </a>
    </li>
  );
}

export default NavItem;
