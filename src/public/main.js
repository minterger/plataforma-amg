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
      a.download = `Contrato de Flete - ${datos.chofer
        ?.trim()
        .toUpperCase()} - ${
        datos.crt || datos.remito || "N/A"
      } - ${datos.razon_social?.trim().toUpperCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
});

const desplegarSection = (id, e) => {
  const section = document.querySelector(id);
  ["visible", "invisible", "opacity-0", "max-h-screen", "max-h-0"].map(
    (className) => section.classList.toggle(className)
  );

  // tagName is a h2
  if (e.target.tagName === "H2") {
    e.target.querySelector("box-icon").classList.toggle("rotate-90");
    return;
  } else {
    e.target.classList.toggle("rotate-90");
  }
};

button_trafico.addEventListener("click", (e) => {
  desplegarSection("#trafico", e);
});

button_empresa.addEventListener("click", (e) => {
  desplegarSection("#empresa", e);
});

button_unidad.addEventListener("click", (e) => {
  desplegarSection("#unidad", e);
});

button_contratacion.addEventListener("click", (e) => {
  desplegarSection("#contratacion", e);
});

button_facturacion.addEventListener("click", (e) => {
  desplegarSection("#facturacion", e);
});

button_descripcion.addEventListener("click", (e) => {
  desplegarSection("#descripcion", e);
});

// desplegar todos los sections
const button_desplegar = document.querySelector("#desplegar");

// desplegar todos los sections y ver si estan desplegados o no antes de hacer click
button_desplegar.addEventListener("click", () => {
  // data-desplegado="false"

  if (button_desplegar.dataset.desplegado === "false") {
    const divsInvisible = document.querySelectorAll("div.invisible");
    divsInvisible.forEach((div) => {
      const h2 = div.previousElementSibling;
      h2.querySelector("box-icon").classList.toggle("rotate-90");
      ["invisible", "max-h-0", "opacity-0"].map((className) =>
        div.classList.remove(className)
      );
      ["visible", "max-h-screen"].map((className) =>
        div.classList.add(className)
      );

      button_desplegar.dataset.desplegado = "true";
    });
  } else {
    const divsVisible = document.querySelectorAll("div.visible");
    divsVisible.forEach((div) => {
      const h2 = div.previousElementSibling;
      h2.querySelector("box-icon").classList.toggle("rotate-90");
      ["visible", "max-h-screen"].map((className) =>
        div.classList.remove(className)
      );
      ["opacity-0", "max-h-0", "invisible"].map((className) =>
        div.classList.add(className)
      );

      button_desplegar.dataset.desplegado = "false";
    });
  }

  button_desplegar.textContent =
    button_desplegar.dataset.desplegado === "true"
      ? "Colapsar todos los campos"
      : "Desplegar todos los campos";
});

// obtener datos de los inputs
const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");

const datos = {};

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    datos[event.target.name] = event.target.value;
  });
});

textareas.forEach((textarea) => {
  textarea.addEventListener("input", (event) => {
    event.target.value = event.target.value.slice(0, 250);
    datos[event.target.name] = event.target.value;
  });
});
