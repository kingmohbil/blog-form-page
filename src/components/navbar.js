import NavElement from './navElement';
function Navbar(props) {
  const { elements } = props;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {elements.map((element, index) => (
              <NavElement
                title={element.title}
                href={element.href}
                active={element.active}
                on_click={element.on_click}
                key={index}
              />
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
