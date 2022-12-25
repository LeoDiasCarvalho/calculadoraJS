const visorAntesOperacao = document.querySelector("[acOperacao]");
const visorDepoisOperacao = document.querySelector("[dcOperacao]");
const btnLimpar = document.querySelector("[limpar]");
const btnCorrigir = document.querySelector("[corrigir]");
const btnOperacao = document.querySelectorAll("[operacao]");
const btnNumeros = document.querySelectorAll("[numero]");
const btnPorcento = document.querySelector("[porcentagem]");
const btnIgual = document.querySelector("[igual]");

class Calculadora {
    constructor(antesOperacao, depoisOperacao){
        this.visorAntesOperacao = antesOperacao;
        this.visorDepoisOperacao = depoisOperacao;
    }

    limpar(){
        this.acOperacao = "";
        this.dcOperacao = "";
        this.operacao = undefined;
    }

    atualizarDisplay(){
        this.visorAntesOperacao.innerText = this.acOperacao;
        this.visorDepoisOperacao.innerText = this.dcOperacao;
    }

}

const calculadora = new Calculadora(visorAntesOperacao, visorDepoisOperacao);

btnLimpar.addEventListener("click", () => {
    calculadora.limpar();
    calculadora.atualizarDisplay();
});







