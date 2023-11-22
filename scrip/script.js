
const jogadadoDoJogo = document.querySelectorAll('[data-jogov]');
const mostrarResultado = document.querySelector("[data-texto]");
const mostrarResultado1 = document.querySelector("[data-texto1]")
const mostrarVencedor = document.querySelector(".vencedor");
const jogarDnv = document.querySelector("[data-jogarDnv]");
const atual = document.querySelector(".atual")
const mostrarVez = document.querySelector(".mostrarVez")

let eVezDoCirculo = false;

const combinacoesDeVitoria = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function começarJogo() {
  mostrarVez.style.display = "flex"
  atual.innerHTML = eVezDoCirculo == true? "x" : "bola";
  jogadadoDoJogo.forEach(quadrado => {
    quadrado.addEventListener("click", clickar, { once: true });
  });
}

function restartar() {
  jogadadoDoJogo.forEach(jogada => {
    jogada.classList.remove("x", "bola");
    jogada.innerHTML = ""
    começarJogo()
  });

  eVezDoCirculo = false;
  mostrarResultado.classList.add("final");
  mostrarVencedor.classList.remove("bola", "x");
  mostrarVencedor.innerHTML = "";
}

const checarPorVitoria = (jogadorAtual) => {
  return combinacoesDeVitoria.some(comb => {
    return comb.every(index => {
      return jogadadoDoJogo[index].classList.contains(jogadorAtual);
    });
  });
};

const checarEmpate = () => {
  return Array.from(jogadadoDoJogo).every(quadrado => {
    return quadrado.classList.contains("x") || quadrado.classList.contains("bola");
  });
};


function o() {
  if (!this.classList.contains("x")) {
    this.innerHTML = "O";
    this.classList.add("bola");

  }
}

function x() {
  if (!this.classList.contains("bola")) {
    this.innerHTML = "X";
    this.classList.add("x");

  }
}


const trocaTurno = () => {
  eVezDoCirculo = !eVezDoCirculo;

  if (eVezDoCirculo) {
    return o;
  } else {
    return x;
  }
}

function clickar() {
  const vezAtual = trocaTurno();
  vezAtual.call(this);
  atual.innerHTML = eVezDoCirculo == true? "x" : "bola";
  const jogadorAtual = eVezDoCirculo ? "bola" : "x";
  const vencedor = checarPorVitoria(jogadorAtual);
  const empate = checarEmpate();

  if (vencedor) {
    mostrarVez.style.display = "none"
    console.log("Vencedor: ", jogadorAtual);
    jogadadoDoJogo.forEach(quadrado =>{
      quadrado.removeEventListener("click", clickar)
    })
    mostrarResultado.classList.remove("final");
    mostrarVencedor.classList.add(jogadorAtual);
    mostrarVencedor.innerHTML = jogadorAtual;
    atual.innerHTML= "bola"
  } else if (empate) {
    mostrarVez.style.display = "none"
    console.log("Empate");
    mostrarResultado.classList.remove("final");
    mostrarResultado1.innerHTML = "Deu velha";
    atual.innerHTML= "bola"
  }
  
}

jogarDnv.addEventListener("click", restartar);
começarJogo()

