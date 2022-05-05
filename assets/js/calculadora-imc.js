let form = document.getElementById("meu-formulario");
const localResultado = document.getElementById("local-resultado");
const resultadoContainer = document.getElementById("resultado-container");
const botaoNovoCalculo = document.getElementById("novo-calculo");
const alturaInput = document.getElementById("altura");
const pesoInput = document.getElementById("peso");
const menssagemErrorAltura = document.getElementById("menssagem-error-altura");
const menssagemErrorPeso = document.getElementById("menssagem-error-peso");

alturaInput.addEventListener("keyup", () => {
  alturaInput.value = maskAltura(alturaInput.value);
  eValidaAltura(alturaInput.value) ? removeErrorAltura() : lancarErrorAltura();
});

pesoInput.addEventListener("keyup", () => {
  pesoInput.value = maskPeso(pesoInput.value);
  eValidoPeso(pesoInput.value) ? removeErrorPeso() : lancarErrorPeso();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const altura = Number(form.elements.altura.value.replace(",", "."));
  const peso = Number(form.elements.peso.value.replace(",", "."));

  if (!validaFormulario(altura, peso)) {
    return false;
  }

  const imc = calulaImc(altura, peso);

  const resultado = classificaImc(imc);

  localResultado.innerText = resultado;

  resultadoContainer.style.display = "block";
  form.style.display = "none";
});

botaoNovoCalculo.addEventListener("click", () => {
  form.elements.altura.value = "";
  form.elements.peso.value = "";
  novoCalculo();
});

function validaFormulario(altura, peso) {
  if (!eValidaAltura(altura)) {
    lancarErrorAltura();
    return false;
  }

  if (!eValidoPeso(peso)) {
    lancarErrorPeso();
    return false;
  }

  return true;
}

function eValidaAltura(altura) {
  if (altura < 0 || altura === 0) return false;
  return true;
}

function lancarErrorAltura() {
  menssagemErrorAltura.style.display = "block";
}

function removeErrorAltura() {
  menssagemErrorAltura.style.display = "none";
}

function eValidoPeso(peso) {
  if (peso < 0 || peso === 0) return false;
  return true;
}

function lancarErrorPeso() {
  menssagemErrorPeso.style.display = "block";
}

function removeErrorPeso() {
  menssagemErrorPeso.style.display = "none";
}

function calulaImc(altura, peso) {
  return peso / (altura * altura);
}

function classificaImc(resultado) {
  let textoResultado = "";

  if (resultado < 18.5) {
    textoResultado = "Peso baixo";
  } else if (resultado >= 18.5 && resultado <= 24.9) {
    textoResultado = "Peso normal";
  } else if (resultado >= 25 && resultado <= 29.9) {
    textoResultado = "Sobrepeso";
  } else if (resultado >= 30 && resultado <= 34.9) {
    textoResultado = "Obesidade Grau I";
  } else if (resultado >= 35 && resultado <= 39.9) {
    textoResultado = "Obesidade Severa Grau II";
  } else if (resultado >= 40) {
    textoResultado = "Obesidade Mórbida Grau III";
  } else {
    textoResultado = "Error na calculadora";
  }

  return textoResultado;
}

function novoCalculo() {
  resultadoContainer.style.display = "none";
  form.style.display = "block";
}

function maskPeso(value) {
  var v = value,
    integer = v.split(",")[0];

  v = v.replace(/\D/, "");
  v = v.replace(/^[0]+/, "");

  if (v.length <= 3 || !integer) {
    if (v.length === 1) v = "0,00" + v;
    if (v.length === 2) v = "0,0" + v;
    if (v.length === 3) v = "0," + v;
  } else {
    v = v.replace(/^(\d{1,})(\d{3})$/, "$1,$2");
  }

  return v;
}

function maskAltura(value) {
  var v = value,
    integer = v.split(",")[0];

  v = v.replace(/\D/, "");
  v = v.replace(/^[0]+/, "");

  if (v.length <= 2 || !integer) {
    if (v.length === 1) v = "0,0" + v;
    if (v.length === 2) v = "0," + v;
  } else {
    v = v.replace(/^(\d{1,})(\d{2})$/, "$1,$2");
  }

  return v;
}

function inicializa() {
  novoCalculo();
  removeErrorAltura();
  removeErrorPeso();
}

inicializa();
