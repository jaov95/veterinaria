const tbMascotas = document.getElementById("tb-mascotas");

let duenios = [
    {nombre: 'José',
     primerApellido: 'Osorio',
     segundoApellido: 'Valdés',
     rut: '19.099.454-6'
    },
    {nombre: 'Natalia',
     primerApellido: 'Jiménez',
     segundoApellido: 'Saldías',
     rut: '19.444.708-4'
    },
    {nombre: 'Matías',
     primerApellido: 'Jiménez',
     segundoApellido: 'Saldías',
     rut: '20.704.569-8'
    }
]

let mascotas = [
    {tipo:'Gato',
     nombre:'Luna',
     duenio:'Jose Osorio Valdés'
    },
    {tipo:'Perro',
     nombre:'Luna',
     duenio:'Natalia Jiménes Saldías'
    },
    {tipo:'Perro',
     nombre:'Lisa',
     duenio:'Matías Jiménez Saldías'
    }
];

function listarMascotas(){
    const htmlMascotas = mascotas.map((mascota, indice)=>`<tr>
        <th scope="row" class="m-0 hold-small">${++indice}</th>
        <th scope="row" class="d-none justify-content-around hold-small">
            <a href="#" class="pb-2 mr-2" title="Editar"><i class="fas fa-edit"></i></a>
            <a href="#" title="Eliminar"><i class="fas fa-trash-alt"></i></a>
        </th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.duenio}</td>
    </tr>`).join("");
    tbMascotas.innerHTML = htmlMascotas;
}

listarMascotas();

$(document).ready(function(){
    $('#tb-mascotas tr').on('mouseenter',function(){
        $(this).children('th:first').addClass('d-none');
        $(this).children('th:nth-child(2)').removeClass('d-none');
        $(this).children('th:nth-child(2)').addClass('d-table-cell');
    })
    $('#tb-mascotas tr').on('mouseleave',function(){
        $(this).children('th:first').removeClass('d-none');
        $(this).children('th:nth-child(2)').removeClass('d-table-cell');
        $(this).children('th:nth-child(2)').addClass('d-none');
    })
    var backElement;
    $('#tb-mascotas tr').on('click',function(){
        if(backElement){
            $(backElement).children('th:first').removeClass('d-none');
            $(backElement).children('th:nth-child(2)').removeClass('d-table-cell');
            $(backElement).children('th:nth-child(2)').addClass('d-none');
        }
        $(this).children('th:first').addClass('d-none');
        $(this).children('th:nth-child(2)').removeClass('d-none');
        $(this).children('th:nth-child(2)').addClass('d-table-cell');
        backElement = $(this);
    })
});