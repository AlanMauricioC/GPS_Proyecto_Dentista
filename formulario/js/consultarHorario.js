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
	$("#usuarios").empty();

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
			"<td>"+response[i].HORA_INICIO+":00"+"</td>"+
			"<td>"+response[i].HORA_TERMINO+":00"+"</td>"+
			"<td><input type='checkbox' data-toggle='toggle' data-onstyle='info' data-on='SI' data-off='NO' id='descansoInicioT' disabled "+(( response[i].DESCANSO==1 ) ? 'checked' : '')+"></td>"+
			"<td>"+response[i].INICIO_DESCANSO+":00"+"</td>"+
			"<td>"+response[i].TERMINO_DESCANSO+":00"+"</td>"+
			"<td>"+response[i].BOX_ATENCION+"</td>"+

		"</tr>");
		dias=["","","","","","",""];
}
