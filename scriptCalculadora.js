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

    escolhaDaOperacao(operacao){
        if(this.dcOperacao === "") return;

        if(this.acOperacao !== ""){
            calculadora.calcular();
        }

        this.operacao = operacao;
        this.acOperacao = `${this.dcOperacao} ${this.operacao}`;
        this.dcOperacao = "";

    }

    mostrarNumero(numero){
        if(this.dcOperacao.includes(".") && numero === ".") return;

        this.dcOperacao = `${this.dcOperacao}${numero.toString()}`;
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

    corrigir(){
        this.dcOperacao = this.dcOperacao.toString().slice(0, -1);
    }

}

const calculadora = new Calculadora(visorAntesOperacao, visorDepoisOperacao);

btnLimpar.addEventListener("click", () => {
    calculadora.limpar();
    calculadora.atualizarDisplay();
});

btnCorrigir.addEventListener("click", () => {
    calculadora.corrigir();
    calculadora.atualizarDisplay();
});

for(const numero of btnNumeros){
    numero.addEventListener("click", () => {
        calculadora.mostrarNumero(numero.innerText);
        calculadora.atualizarDisplay();
    });
}

for(const operacao of btnOperacao){
    operacao.addEventListener("click", () => {
        calculadora.escolhaDaOperacao(operacao.innerText);
        calculadora.atualizarDisplay();
    
    })
}