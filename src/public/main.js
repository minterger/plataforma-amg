const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(datos);
  fetch("/viaje", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contrato de flete - ${datos.chofer} - ${
        datos.crt || datos.remito || "N/A"
      } - ${datos.razon_social}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
});

const desplegarSection = (id) => {
  const section = document.querySelector(id);
  ["visible", "invisible", "opacity-0", "max-h-screen", "max-h-0"].map(
    (className) => section.classList.toggle(className)
  );
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

button_facturacion.addEventListener("click", () => {
  desplegarSection("#facturacion");
});

// obtener datos de los inputs
const inputs = document.querySelectorAll("input");
const datos = {};

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    datos[event.target.name] = event.target.value;
  });
});
