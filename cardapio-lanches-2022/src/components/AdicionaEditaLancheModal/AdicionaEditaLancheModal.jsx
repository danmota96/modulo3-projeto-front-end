import Modal from "components/Modal/Modal";
import "./AdicionaEditaLancheModal.css";
import { useState, useEffect } from "react";
import { LancheService } from "services/LancheService";



function AdicionaEditaLancheModal({closeModal, onCreateLanche}) {
    const form = {
        local: "",
        localizacao: "",
        nome: "",
        descricao: "",
        preco: "",
        foto: "",
    };

    const [state, setState] = useState(form);

    /* manipular o state à medida que ocorrer algum evento dentro do elemento (input) */
    const handleChange = (e, name) => {
        setState({ ...state, [name]: e.target.value, });
    }

    /* controle do botão, habilitando o botão apenas se os dados forem preenchidos (mudar o state para falso -- habilitar)*/
    const [canDisable, setCanDisable] = useState(true);

    const canDisableSendButton = () => {
    const response = !Boolean(
        state.local.length
        && state.localizacao.length
        && state.nome.length
        && state.descricao.length
        && state.preco.length
    );

    setCanDisable(response);
    };

    useEffect(() => {
        canDisableSendButton();
    })
    
/* criar uma novo lanche pelo botão cadastrar */
    const createLanche = async () => {
        const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split('\\').pop();
    
        const { local, localizacao, nome, descricao, preco, foto } = state;

        const lanche = {
            local,
            localizacao,
            nome,
            descricao,
            preco,
            foto: `assets/images/${renomeiaCaminhoFoto(foto)}`
        }
    /* atualizar a página mostrando o novo id cadastrado e renderizado */
        const response = await LancheService.create(lanche);
        onCreateLanche(response);
        closeModal();
    }

    return (
        <Modal closeModal={closeModal}>
            <div className="AdicionaLancheModal">
                <form autoComplete="off">
                    <h2> Adicionar ao Cardápio </h2>
                    <div>
                        <label className="AdicionaLancheModal__text" htmlFor="local"> Local: </label>
                        <input
                            id="local"
                            placeholder="Nome de lanchonete"
                            type="text"
                            value={state.local}
                            onChange={(e) => handleChange(e, "local")} />
                    </div>
                    <div>
                        <label className="AdicionaLancheModal__text" htmlFor="localizacao"> Localização: </label>
                        <input
                            id="localizacao"
                            placeholder="Local da lanchonete"
                            type="text"
                            value={state.localizacao}
                            onChange={(e) => handleChange(e, "localizacao")} />
                    </div>
                    <div>
                        <label className="AdicionaLancheModal__text" htmlFor="nome"> Nome: </label>
                        <input
                            id="local"
                            placeholder="Nome do lanche"
                            type="text"
                            value={state.nome}
                            onChange={(e) => handleChange(e, "nome")} />
                    </div>
                    <div>
                        <label className="AdicionaLancheModal__text" htmlFor="descricao"> Descricao: </label>
                        <input
                            id="descricao"
                            placeholder="Detalhe o produto"
                            type="text"
                            value={state.descricao}
                            onChange={(e) => handleChange(e, "descricao")} />
                    </div>
                    <div>
                        <label className="AdicionaLancheModal__text" htmlFor="preco"> Preco: </label>
                        <input
                            id="preco"
                            placeholder="35,00"
                            type="text"
                            value={state.preco}
                            onChange={(e) => handleChange(e, "preco")} />
                    </div>              
                    <div>
                        <label className="AdicionaLancheModal__text  AdicionaLancheModal__foto-label" htmlFor="foto" >
                            {!state.foto.length ? "Selecionar Imagem" : state.foto}
                        </label>
                        <input
                            className=" AdicionaLancheModal__foto"
                            id="foto"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            value={state.foto}
                            onChange={(e) => handleChange(e, "foto")} />
                    </div>

                    <button
                        className="AdicionaLancheModal__enviar"
                        type="button"
                        disabled={canDisable}
                        onClick={createLanche}>
                        Enviar
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default AdicionaEditaLancheModal;