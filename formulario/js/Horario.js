$(document).ready(function(){

	init();
	$("#modalEliminar").click(eliminar);
	$("#modalHabilitar").click(habilitar);
	$("#btnBusqueda").click(buscar);

})


function buscar() {
	var data={};
	data["usuario"] =$("#dentista").val();
	$.ajax({
		url: 'https://www.kimberly-clark-logistica.com/slim/index.php/searchHorarios',
		type : 'POST',
		data: data,
		dataType : 'json',
		success: function(response) {
			insertarDatos(response);
		},
		error: function() {
			$("#usuarios").empty();
			console.log("No se ha podido obtener la información de usuarios");
		}
	});
}

function init(){

		$.ajax({
			url: 'https://www.kimberly-clark-logistica.com/slim/index.php/getHorarios',
			type : 'GET',
			data: null,
			dataType : 'json',
			success: function(response) {
				insertarDatos(response);
			},
			error: function() {
				console.log("No se ha podido obtener la información de usuarios");
			}
		});
}


function insertarDatos(response) {

		$("#usuarios").empty();
		response=response["result"];
		var dias=["","","","","","",""]
		for (var i = 0; i < response.length; i++) {
			for (var j = 0; j < response[i].dias.length; j++) {
				switch (response[i].dias[j]) {
					case "LU":
						dias[0]=" Lunes ";
						break;
					case "MA":
						dias[1]=" Martes ";
						break;
					case "MI":
						dias[2]=" Miercoles ";
						break;
					case "JU":
						dias[3]=" Jueves ";
						break;
					case "VI":
						dias[4]=" Viernes ";
						break;
					case "SA":
						dias[5]=" Sabado ";
						break;
					case "DO":
						dias[6]=" Domingo ";
						break;
					default:

				}
			}

			$("#usuarios").append(
				"<tr>"+
				"<td>"+response[i].nombre+" "+response[i].apellidos+"</td>"+
				"<td><input type=\"checkbox\"/ value=\""+response[i].ID+"\" class='checkDentista' "+(( response[i].estado==1 ) ? 'checked' : '')+">"+
				"<td>"+dias[0]+dias[1]+dias[2]+dias[3]+dias[4]+dias[5]+dias[6]+"</td>"+
				"<td><button class='print'  id='print"+response[i].ID+"'><img class='img-thumbnail' height='42'  width='42' src='images/src/print.png'   /></button>"+
				"<button class='view'  id='view"+response[i].ID+"'><img class='img-thumbnail' height='42'  width='42' src='images/src/view.png'  /></button>"+
				"<button class='edit'  id='edit"+response[i].ID+"'><img class='img-thumbnail' height='42'  width='42' src='images/src/edit.png'  /></button>"+
				"<button class='delete'  id='delete"+response[i].ID+"'><img class='img-thumbnail' height='42'  width='42' src='images/src/delete.png'  /></button>"+
				"</td>"+
			"</tr>");
			dias=["","","","","","",""];

		}
		$(".view").click(viewHorario);
		$(".edit").click(editHorario);
		$(".delete").click(deletemodal);
		$(".checkDentista").change(habilitarmodal);
}

var id="";
var estado="";
function habilitarmodal() {
	$('#habilitar-modal').modal('show');
	id=$(this).val();
	estado=$(this).prop('checked')
}

function habilitar() {
	var data= {};
	data["ID"]=id;
	data["estado"]=estado;
	$.ajax({
		url: 'https://www.kimberly-clark-logistica.com/slim/index.php/deshabilitarDentista',
		type : 'POST',
		data: data,
		dataType : 'json',
		success: function(response) {
			alert("dentista modificado");
			$('#habilitar-modal').modal('hide');
		},
		error: function() {
			console.log("No se ha podido obtener la información de usuarios");
		}
	});
}

function deletemodal(){
	$('#delete-modal').modal('show');
	id=$(this).attr('id').substring(6);

}


function eliminar(){
	var data= {};
	data["ID"]=id;
	$.ajax({
		url: 'https://www.kimberly-clark-logistica.com/slim/index.php/deleteHorarios',
		type : 'POST',
		data: data,
		dataType : 'json',
		success: function(response) {
			alert("Horario eliminado");
			$('#habilitar-modal').modal('hide');
		},
		error: function() {
			console.log("No se ha podido obtener la información de usuarios");
		}
	});
}


function viewHorario() {
	id=$(this).attr('id').substring(4);
	localStorage.setItem("IDDoctor",id);
	window.location.replace("consultarHorario.html");

}
function editHorario() {
	id=$(this).attr('id').substring(4);
	localStorage.setItem("IDDoctor",id);
	window.location.replace("editarHorario.html");

}
