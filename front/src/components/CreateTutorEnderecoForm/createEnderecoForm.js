import React, { useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./createEnderecoForm.module.css";
import { number } from 'prop-types';

function CreateEnderecoForm({ enderecoFormData, handleEnderecoChange, errors, laiChecked, handleCheckboxChange }) {
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");

  const handleCEPChange = async (event) => {
    const cep = event.target.value;
    handleEnderecoChange(event); // Chama a função handleEnderecoChange para atualizar o estado com o valor do CEP

    if (isNaN(cep[8]) === false) { // Verifica se o CEP foi completamente preenchido
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { localidade, uf, logradouro, bairro } = response.data;

        setCidade(localidade);
        setEstado(uf);
        setRua(logradouro);
        setBairro(bairro);

        // Atualiza o estado com os dados obtidos da API - cidade, estado, rua e bairro

        handleEnderecoChange({
          target: {
            name: "cidade",
            value: localidade
          }
        });

        handleEnderecoChange({
          target: {
            name: "estado",
            value: uf
          }
        });

        handleEnderecoChange({
          target: {
            name: "rua",
            value: logradouro
          }
        });

        handleEnderecoChange({
          target: {
            name: "bairro",
            value: bairro
          }
        });
        handleEnderecoChange({
          target: {
            name: "cep",
            value: cep
          }
        });
        console.log(response.data.cep)
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  return (
    <div className={styles.boxcadastrotutor}>
      <div className={styles.titulo}>Endereço</div>
      
     
      <div className="mb-3">
        <div className="row">
          <div className="col">
            {renderInput("CEP", "cep", enderecoFormData.cep, handleCEPChange, "Digite o cep", errors.cep, "text", "99999-999")}
            {renderInput("Rua", "rua", rua, handleEnderecoChange, "", errors.rua)}
            {renderInput("Cidade", "cidade", cidade, handleEnderecoChange, "", errors.cidade)}
            
          </div>
          <div className="col">
            {renderInput("Número", "numero", enderecoFormData.numero, handleEnderecoChange, "Digite o número do endereço", errors.numero)}
            {renderInput("Bairro", "bairro", bairro, handleEnderecoChange, "", errors.bairro)}
            {renderInput("Estado", "estado", estado, handleEnderecoChange, "", errors.estado)}
          </div>
        </div>
        <div className={`${styles.informacaoLAI} ${errors.lai ? 'is-invalid' : ''}`}>
          <p>
            A <a href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm" target="_blank" rel="noopener noreferrer">Lei nº 12.527/2011</a>, conhecida como Lei de Acesso à Informação - LAI, regulamenta o direito fundamental, previsto na Constituição, de qualquer pessoa física ou jurídica solicitar e receber informações públicas produzidas ou custodiadas pelos órgãos e entidades públicos. A LAI também garante o direito de acesso às informações produzidas ou custodiadas pelas entidades privadas sem fins lucrativos que recebam recurso público para a realização de ações de interesse público.
          </p>
          <label>
            <input
              type="checkbox"
              className={`form-check-input ${styles.checkbox}`}
              checked={laiChecked}
              onChange={handleCheckboxChange}
            />
            Eu compreendo e aceito as condições da LAI.
          </label>
        </div>
        {errors.lai && <p className="invalid-feedback" style={{ display: "block" }}>{errors.lai}</p>}
      </div>
    </div>
  );
}

function renderInput(label, name, value, onChange, placeholder, error, type = "text", mask) {
  const InputComponent = mask ? InputMask : 'input';
  const inputProps = mask ? { mask } : {};

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label} <span className={styles.obrigatorio}>*</span></label>
      <InputComponent
        type={type}
        className={`form-control ${styles.input} ${error ? 'is-invalid' : ''}`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {error && <div className={`invalid-feedback ${styles.error_message}`}>{error}</div>}
    </div>
  );
}

export default CreateEnderecoForm;
