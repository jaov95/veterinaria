const tbMascotas = document.getElementById("tb-mascotas");
const buscarDuenio = document.getElementById("buscarDuenio");
const botonBuscarDuenio = document.getElementById("botonBuscarDuenio");
const listaDuenios = document.getElementById("listaDuenios");

var normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};
   
    for(var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );
   
    return function( str ) {
        var ret = [];
        for( var i = 0, j = str.length; i < j; i++ ) {
            var c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }      
        return ret.join( '' );
    }
   
  })();

let duenios = [
  {
    nombre: "José",
    primerApellido: "Osorio",
    segundoApellido: "Valdés",
    rut: "19.099.454-6",
  },
  {
    nombre: "Natalia",
    primerApellido: "Jiménez",
    segundoApellido: "Saldías",
    rut: "19.444.708-4",
  },
  {
    nombre: "Matías",
    primerApellido: "Jiménez",
    segundoApellido: "Saldías",
    rut: "20.704.569-8",
  },
];

let mascotas = [
  { tipo: "Gato", nombre: "Luna", duenio: "Jose Osorio Valdés" },
  { tipo: "Perro", nombre: "Luna", duenio: "Natalia Jiménes Saldías" },
  { tipo: "Perro", nombre: "Lisa", duenio: "Matías Jiménez Saldías" },
];


function listarMascotas() {
const htmlMascotas = mascotas.map(
    (mascota, indice) => `<tr>
        <th scope="row" class="m-0 hold-small">${++indice}</th>
        <th scope="row" class="d-none justify-content-around hold-small">
            <a href="#" class="pb-2 mr-2" title="Editar"><i class="fas fa-edit"></i></a>
            <a href="#" title="Eliminar"><i class="fas fa-trash-alt"></i></a>
        </th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.duenio}</td>
    </tr>`
    ).join("");
    tbMascotas.innerHTML = htmlMascotas;
}
listarMascotas();

const listarDueniosBusqueda = () => {
    const htmlBuscarDuenios = duenios.map((duenio) => `<a class="list-group-item list-group-item-action hc-pointer d-flex justify-content-between" data-toggle="list" role="tab">
      <span>${duenio.nombre} ${duenio.primerApellido}</span> <span>${duenio.rut}</span></a>`).join("");
    listaDuenios.innerHTML = htmlBuscarDuenios;
};
listarDueniosBusqueda();

const filtrarDuenio = () => {
  var texto = buscarDuenio.value.toLowerCase().replace(/\./g,"","").replace(/\-/g,"").toString();
  texto = normalize(texto);
  console.log(texto);
  listaDuenios.innerHTML = "";
  for (var duenio of duenios) {
    let nombre = duenio.nombre.toLowerCase();
    let apellido = duenio.primerApellido.toLowerCase();
    let segundoApellido = duenio.segundoApellido.toLowerCase();
    let nombreCompleto = `${nombre} ${apellido} ${segundoApellido}`;
    nombreCompleto = normalize(nombreCompleto);
    let rut = duenio.rut.replace(/\./g,"").replace("-","");
    if (nombreCompleto.includes(texto)||rut.includes(texto)||rut==texto) {
        console.log(rut);
        listaDuenios.innerHTML += `<a 
            class="list-group-item list-group-item-action hc-pointer d-flex justify-content-between" 
            data-toggle="list" 
            role="tab">
            <span>${duenio.nombre} ${duenio.primerApellido}</span> <span>${duenio.rut}</span></a>`
    }
  }
  if (listaDuenios.innerHTML==="") {
      listaDuenios.innerHTML = `<li class="list-group-item list-group-item-danger">No se encontró el dueño</li>`
  }
};
botonBuscarDuenio.addEventListener("click", filtrarDuenio);
buscarDuenio.addEventListener("keyup", filtrarDuenio);
$(document).ready(function () {
  $("#tb-mascotas tr").on("mouseenter", function () {
    $(this).children("th:first").addClass("d-none");
    $(this).children("th:nth-child(2)").removeClass("d-none");
    $(this).children("th:nth-child(2)").addClass("d-table-cell");
  });
  $("#tb-mascotas tr").on("mouseleave", function () {
    $(this).children("th:first").removeClass("d-none");
    $(this).children("th:nth-child(2)").removeClass("d-table-cell");
    $(this).children("th:nth-child(2)").addClass("d-none");
  });
  var backElement;
  $("#tb-mascotas tr").on("click", function () {
    if (backElement) {
      $(backElement).children("th:first").removeClass("d-none");
      $(backElement).children("th:nth-child(2)").removeClass("d-table-cell");
      $(backElement).children("th:nth-child(2)").addClass("d-none");
    }
    $(this).children("th:first").addClass("d-none");
    $(this).children("th:nth-child(2)").removeClass("d-none");
    $(this).children("th:nth-child(2)").addClass("d-table-cell");
    backElement = $(this);
  });
});
