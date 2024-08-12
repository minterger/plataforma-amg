const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const desplegarSection = (id) => {
  const section = document.querySelector(id);
  section.classList.toggle("hidden");
  section.classList.toggle("flex");
};

const button_trafico = document.querySelector("#button_trafico");
const button_empresa = document.querySelector("#button_empresa");

button_trafico.addEventListener("click", () => {
  desplegarSection("#trafico");
});

button_empresa.addEventListener("click", () => {
  desplegarSection("#empresa");
});

button_unidad.addEventListener("click", () => {
  desplegarSection("#unidad");
});

button_contratacion.addEventListener("click", () => {
  desplegarSection("#contratacion");
});

// obtener datos de los inputs
const inputs = document.querySelectorAll("input");
const datos = {};

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    datos[event.target.name] = event.target.value;
  });
});
