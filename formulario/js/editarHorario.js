$(document).ready(function(){

	init();
})
function init(){
		var data={};
		data["ID_USUARIO"]=localStorage.getItem("IDDoctor");
		$.ajax({
			url: 'https://www.kimberly-clark-logistica.com/slim/index.php/getHorarios',
			type : 'POST',
			data: data,
			dataType : 'json',
			success: function(response) {
				$("#dentista").text(response.Nombre.data[0][2]+" "+response.Nombre.data[0][3]+" ID:"+data["ID_USUARIO"]);
				insertarDatos(response);
			},
			error: function() {
				console.log("No se ha podido obtener la información de usuarios");
			}
		});
}


function insertarDatos(response) {
	//$("#usuarios").empty();

	response=response["data"];
	var dia=[null,null,null,null,null,null,null]
	for (var j = 0; j < response.length; j++) {
		switch (response[j].DIA) {
			case "LU":
				response[j].DIA="Lunes";
				dia[0]=response[j];
				break;
			case "MA":
				response[j].DIA="Martes";
				dia[1]=response[j];
				break;
			case "MI":
				response[j].DIA="Miercoles"
				dia[2]=response[j];
				break;
			case "JU":
				response[j].DIA="Jueves";
				dia[3]=response[j];
				break;
			case "VI":
				response[j].DIA="Viernes";
				dia[4]=response[j];
				break;
			case "SA":
				response[j].DIA="Sabado";
				dia[5]=response[j];
				break;
			case "DO":
				response[j].DIA="Domingo"
				dia[6]=response[j];
				break;
			default:

		}

	}
	for (var i = 0; i < dia.length; i++) {
		if (dia[i]) {
			ordenarDias(dia,i);
		}
	}
	$.getScript( "https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js", function() {});
}

function ordenarDias(response,i) {

		$("#usuarios").append(
			"<tr>"+
			"<td>"+response[i].DIA+"</td>"+
			"<td>"+horas("HORA_INICIO"+response[i].DIA)+"</td>"+
			"<td>"+horas("HORA_TERMINO"+response[i].DIA)+"</td>"+
			"<td><input type='checkbox' data-toggle='toggle' data-onstyle='info' data-on='SI' data-off='NO' id='DESCANSO"+response[i].DIA+"'  "+(( response[i].DESCANSO==1 ) ? 'checked' : '')+"></td>"+
			"<td>"+horas("INICIO_DESCANSO"+response[i].DIA)+"</td>"+
			"<td>"+horas("TERMINO_DESCANSO"+response[i].DIA)+"</td>"+
			"<td>"+boxAtencion("BOX_ATENCION"+response[i].DIA)+"</td>"+
			"<td><button class='edit btn btn-success'  id='edit"+response[i].DIA+"'>ACEPTAR</button></td>"+
		"</tr>");

		$("#HORA_INICIO"+response[i].DIA).val(response[i].HORA_INICIO+":00");
		$("#HORA_TERMINO"+response[i].DIA).val(response[i].HORA_TERMINO+":00");
		$("#INICIO_DESCANSO"+response[i].DIA).val(response[i].INICIO_DESCANSO+":00");
		$("#TERMINO_DESCANSO"+response[i].DIA).val(response[i].TERMINO_DESCANSO+":00");
		$("#BOX_ATENCION"+response[i].DIA).val(response[i].BOX_ATENCION);
		$("#edit"+response[i].DIA).click(actualizar);

}

function boxAtencion(id) {
	var box="<div class='wrap-input100 validate-input' data-validate='Se requiere atencion'>"+
		 "<select class='form-control' id='"+id+"'>"+
				"<option>1</option>"+
				"<option>2</option>"+
				"<option>3</option>"+
				"<option>4</option>"+
				"<option>5</option>"+
		"</select>"+
		"<span class='focus-input100'></span>"+
	"</div>"
	return box;
}

function horas(id) {

	var horas=	"<div class='wrap-input100 validate-input' data-validate='Se requiere hora' style='border-bottom: 0px'>"+
		"<span class='label-input100' id='SPANhoraInicio'></span>"+
		"<div class='row'>"+
		 "<div class='col'>"+
			 "<select class='form-control'  id='"+id+"'>"+
						"<option>1:00</option>"+
						"<option>2:00</option>"+
						"<option>3:00</option>"+
						"<option>4:00</option>"+
						"<option>5:00</option>"+
						"<option>6:00</option>"+
						"<option>7:00</option>"+
						"<option>8:00</option>"+
						"<option>9:00</option>"+
						"<option>10:00</option>"+
						"<option>11:00</option>"+
						"<option>12:00</option>"+
						"<option>13:00</option>"+
						"<option>14:00</option>"+
						"<option>15:00</option>"+
						"<option>16:00</option>"+
						"<option>17:00</option>"+
						"<option>18:00</option>"+
						"<option>19:00</option>"+
						"<option>20:00</option>"+
						"<option>21:00</option>"+
						"<option>22:00</option>"+
						"<option>23:00</option>"+
						"<option>24:00</option>"+
				"</select>"+
		 "</div>"+
	 "</div>"+
	"</div>";
	return horas;
}

function actualizar() {
	var dia=($(this).attr('id')).substr(4);
	var data={};
	data["ID_USUARIO"]=localStorage.getItem("IDDoctor");
	data["HORA_INICIO"]=($("#HORA_INICIO"+dia).val()).substr(0,$("#HORA_INICIO"+dia).val().indexOf(':'));
	data["HORA_TERMINO"]=($("#HORA_TERMINO"+dia).val()).substr(0,$("#HORA_TERMINO"+dia).val().indexOf(':'));
	data["INICIO_DESCANSO"]=($("#INICIO_DESCANSO"+dia).val()).substr(0,$("#INICIO_DESCANSO"+dia).val().indexOf(':'));
	data["TERMINO_DESCANSO"]=($("#TERMINO_DESCANSO"+dia).val()).substr(0,$("#TERMINO_DESCANSO"+dia).val().indexOf(':'));
	data["BOX_ATENCION"]=$("#BOX_ATENCION"+dia).val();
	data["DESCANSO"]=$("#DESCANSO"+dia).prop('checked')? 1: 0;
	data["DIA"]=dia.substr(0,2).toUpperCase();
	$.ajax({
		url: 'https://www.kimberly-clark-logistica.com/slim/index.php/updateHorarios',
		type : 'POST',
		data: data,
		dataType : 'json',
		success: function(response) {

		},
		error: function() {
			console.log("No se ha podido obtener la información de usuarios");
		}
	});
}
