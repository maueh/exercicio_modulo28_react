import { useEffect, useState } from "react";
import InputNumber from "../InputNumber";
import styles from "./main.module.css";

import { classificacaoIMC } from "../../data/classificacaoIMC";

function Form({ title }) {
  const [imc, setIMC] = useState();
  const [altura, setAltura] = useState();
  const [peso, setPeso] = useState();

  function retornaIMC(meuImc) {
    const minhaClassificacao = classificacaoIMC.find(
      (intervalo) =>
        meuImc >= intervalo.limiteInferior && meuImc < intervalo.limiteSuperior
    );
    return minhaClassificacao
      ? minhaClassificacao.classificacao
      : `Não encontrada ${meuImc}`;
  }

  function exibirIMC() {
    return (
      <>
        {imc ? (
          <div className={styles.resultado}>
            <p className={styles.imc}>
              IMC:{" "}
              <span className={styles.valor}>
                {parseFloat(imc).toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>

            <p className={styles.classificacao}>
              Classificação:{" "}
              <span className={styles.valor}>
                {retornaIMC(parseFloat(imc))}
              </span>
            </p>
          </div>
        ) : (
          <p></p>
        )}
      </>
    );
  }

  function calculaIMC(altura, peso) {
    let novoImc = peso / altura ** 2.0;
    setIMC(novoImc);
  }

  function atualizarAltura(e) {
    setAltura(e.target.value);
  }

  function atualizarPeso(e) {
    setPeso(e.target.value);
  }

  useEffect(() => {
    console.log("Altura: ", altura);
  }, [altura]);

  useEffect(() => {
    console.log("Peso: ", peso);
  }, [peso]);

  useEffect(() => {
    calculaIMC(altura, peso);
    console.log("Chamada effect imc");
  }, [peso, altura]);

  useEffect(() => console.log("imc atualizado: ", imc), [imc]);

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <form></form>

      <InputNumber
        id="altura"
        min={0}
        max={3}
        step={0.01}
        handleChange={atualizarAltura}
        value={altura}
      >
        Altura (em metros)
      </InputNumber>
      <InputNumber
        id="peso"
        min={0}
        max={1000}
        step={0.1}
        handleChange={atualizarPeso}
        value={peso}
      >
        Peso (em kg)
      </InputNumber>

      {exibirIMC()}
    </div>
  );
}

export default Form;
