const btnNumeros = document.querySelectorAll("[numero]");
const btnOperacoes = document.querySelectorAll("[operacao]");
const btnIgual = document.querySelector("[igual]");
const btnCorrigir = document.querySelector("[corrigir]");
const btnLimpar = document.querySelector("[limpar]");
const visorCimaTexto = document.querySelector("[visorCima]");
const visorBaixoTexto = document.querySelector("[visorBaixo]");
const btnPorcento = document.querySelector("[porcentagem]");
const btnMaisMenos = document.querySelector("[maisMenos]");

class Calculadora {
  constructor(visorCimaTexto, visorBaixoTexto) {
    this.visorCimaTexto = visorCimaTexto;
    this.visorBaixoTexto = visorBaixoTexto;
    this.limpar();
  }

  formatarNumeroDisplay(numero) {
    const numeroTexto = numero.toString();

    const digitoInteiro = parseFloat(numeroTexto.split(".")[0]);
    const digitoDecimal = numeroTexto.split(".")[1];

    let displayInteiro;

    if (isNaN(digitoInteiro)) {
      displayInteiro = "";
    } else {
      displayInteiro = digitoInteiro.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (digitoDecimal != null) {
      return `${displayInteiro}.${digitoDecimal}`;
    } else {
      return displayInteiro;
    }
  }

  corrigir() {
    this.visorBaixo = this.visorBaixo.toString().slice(0, -1);
  }

  calcularPorcentagem(){
    let porcento;
    let resultado;
    
    const _visorCima = parseFloat(this.visorCima);
    const _visorBaixo = parseFloat(this.visorBaixo);

    if(isNaN(_visorCima) || isNaN(_visorBaixo) || this.operacao == undefined) return;

    porcento = _visorCima * (_visorBaixo / 100);

    switch (this.operacao) {
        case "+":
          resultado = _visorCima + porcento;
          break;
        case "-":
          resultado = _visorCima - porcento;
          break;
        case "/":
          resultado = (_visorCima / _visorBaixo) * 100;
          break;
        case "x":
          resultado = porcento;
          break;
        default:
          return;
      }

      this.visorBaixo = resultado;
      this.visorCima = "";
      this.operacao = undefined;

  }

  calcular() {
    let resultado;
    
    const _visorCima = parseFloat(this.visorCima);
    const _visorBaixo = parseFloat(this.visorBaixo);

    if (isNaN(_visorCima) || isNaN(_visorBaixo) || this.operacao == undefined) return;

    switch (this.operacao) {
      case "+":
        resultado = _visorCima + _visorBaixo;
        break;
      case "-":
        resultado = _visorCima - _visorBaixo;
        break;
      case "/":
        resultado = _visorCima / _visorBaixo;
        break;
      case "x":
        resultado = _visorCima * _visorBaixo;
        break;
      default:
        return;
    }

    this.visorBaixo = resultado;
    this.visorCima = "";
    this.operacao = undefined;
  }

  escolhaOperacao(operacao) {
    if (this.visorBaixo === "") return;

    if (this.visorCima !== "") {
      this.calcular();
    }

    this.operacao = operacao;

    this.visorCima = this.visorBaixo;
    this.visorBaixo = "";
  }

  mostrarNumero(numero) {
    if (this.visorBaixo.includes(".") && numero === ".") return;

    this.visorBaixo = `${this.visorBaixo}${numero.toString()}`;
  }

  limpar() {
    this.visorBaixo = "";
    this.visorCima = "";
    this.operacao = undefined;
  }

  atualizarDisplay() {
    this.visorCimaTexto.innerText = `${this.formatarNumeroDisplay(
      this.visorCima
    )} ${this.operacao || ""}`;
    this.visorBaixoTexto.innerText = this.formatarNumeroDisplay(
      this.visorBaixo
    );
  }

  trocarSinal(){
    this.visorBaixo = this.visorBaixo.charAt(0) === '-' 
    ? this.visorBaixo.slice(1) 
    : `-${this.visorBaixo}`

  }     
}

const calculadora = new Calculadora(
  visorCimaTexto,
  visorBaixoTexto
);

for (const btnNumero of btnNumeros) {
  btnNumero.addEventListener("click", () => {
    calculadora.mostrarNumero(btnNumero.innerText);
    calculadora.atualizarDisplay();
  });
}

for (const btnOperacao of btnOperacoes) {
  btnOperacao.addEventListener("click", () => {
    calculadora.escolhaOperacao(btnOperacao.innerText);
    calculadora.atualizarDisplay();
  });
}

btnLimpar.addEventListener("click", () => {
  calculadora.limpar();
  calculadora.atualizarDisplay();
});

btnIgual.addEventListener("click", () => {
  calculadora.calcular();
  calculadora.atualizarDisplay();
});

btnCorrigir.addEventListener("click", () => {
  calculadora.corrigir();
  calculadora.atualizarDisplay();
});

btnPorcento.addEventListener("click", () => {
    calculadora.calcularPorcentagem();
    calculadora.atualizarDisplay();
});

btnMaisMenos.addEventListener("click", () => {
  calculadora.trocarSinal();
  calculadora.atualizarDisplay();
});