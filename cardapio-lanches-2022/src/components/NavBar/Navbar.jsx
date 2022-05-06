import "./Navbar.css";
import sacola from "assets/icons/sacola.svg";
import logo from "assets/logo.svg";
import btn_add from "assets/icons/btn_add.png";

function Navbar({createLanche}) {
  return (
    <div className="Header">
      <div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="500px"
            alt="Logo LFAV"
            className="Logo__icone"
          />
          <span className="Logo__titulo"> Lanches Favoritos </span>
        </div>

        <div className="Header__opcoes Opcoes">
        <button type="button" className="Opcoes__lanche Lanche" onClick={() => createLanche() }>
                        <img src={btn_add} width="40px" className="Lanche__icone" alt="Adiconar Lanche" />
        </button>
          <div className="Opcoes__sacola Sacola">
            <img
              src={sacola}
              width="40px"
              className="Sacola__icone"
              alt="Sacola de compras"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;