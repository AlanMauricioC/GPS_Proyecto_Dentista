
$(document).ready(function(){

	init();



  //validación
	$("#aceptar").click(validar)



})
function init(){

		$.ajax({
			url: 'https://localhost/slim/index.php/consultaDentistaAgendar',
			type : 'GET',
			data: null,
			dataType : 'json',
			success: function(response) {
				for (var i = 0; i < response.length; i++) {
					$("#usuario").append("<option value="+response[i].ID_USUARIO+"> "+response[i].NOMBRE+" "+response[i].APELLIDOS+" ID: "+response[i].ID_USUARIO+"</option>")
				}
			},
			error: function() {
				console.log("No se ha podido obtener la información de usuarios");
			}
		});
}

function validar(){
	var envia=true;
	localStorage.setItem("IDUsuario",1);//se tiene que poner en la página anterior
	var descansoFin=$("#descansoFin").val();
	var descansoInicio=$("#descansoInicio").val();
	var horaInicio=$("#horaInicio").val();
	var horaFin=$("#horaFin").val();
	alert(descansoInicio+"<"+descansoFin);

	horaFin=horaFin.substr(0, horaFin.indexOf(':'));
	horaInicio=horaInicio.substr(0, horaInicio.indexOf(':'));
	descansoFin=descansoFin.substr(0, descansoFin.indexOf(':'));
	descansoInicio=descansoInicio.substr(0, descansoInicio.indexOf(':'));
	var x;
	x=$("#horaInicioT").prop('checked')? 0 : 12;
	horaInicio=parseInt(horaInicio)+x;
	x=$("#horaFinT").prop('checked')? 0 : 12;
	horaFin=parseInt(horaFin)+x;
	x=$("#descansoFinT").prop('checked')? 0 : 12;
	descansoFin=parseInt(descansoFin)+x;
	x=$("#descansoInicioT").prop('checked')? 0 : 12;
	descansoInicio=parseInt(descansoInicio)+x;

	if (horaInicio<horaFin) {
		$("#SPANhoraInicio").css('color', 'gray');
		$("#SPANhoraInicio").css('font-size', 'smaller');
		$("#SPANhoraFin").css('color', 'gray');
		$("#SPANhoraFin").css('font-size', 'smaller');
	}else {
		$("#SPANhoraInicio").css('color', 'red');
		$("#SPANhoraInicio").css('font-size', 'larger');
		$("#SPANhoraFin").css('color', 'red');
		$("#SPANhoraFin").css('font-size', 'larger');
		envia=false;
	}
	if (descansoInicio<descansoFin||!$("#descanso").prop('checked')) {
		$("#SPANdescansoInicio").css('color', 'gray');
		$("#SPANdescansoInicio").css('font-size', 'smaller');
		$("#SPANdescansoFin").css('color', 'gray');
		$("#SPANdescansoFin").css('font-size', 'smaller');
	}else {
		$("#SPANdescansoInicio").css('color', 'red');
		$("#SPANdescansoInicio").css('font-size', 'larger');
		$("#SPANdescansoFin").css('color', 'red');
		$("#SPANdescansoFin").css('font-size', 'larger');
		envia=false;
	}
	if (envia) {
		var data= {};
		data ["IDUsuario"]=$("#usuario").val();
		data ["horaInicio"]=horaInicio;
		data ["horaFin"]=horaFin;
		data ["descansoInicio"]=descansoInicio;
		data ["descansoFin"]=descansoFin;
		data ["descanso"]=$("#descanso").prop('checked');
		data ["atiende"]=$("#atiende").prop('checked');
		data ["BOX_ATENCION"]=$("#BOX_ATENCION").val();
		data ["sillon"]=$("#sillon").val();
		data ["LU"]=$("#LU").prop('checked');
		data ["MA"]=$("#MA").prop('checked');
		data ["MI"]=$("#MI").prop('checked');
		data ["JU"]=$("#JU").prop('checked');
		data ["VI"]=$("#VI").prop('checked');
		data ["SA"]=$("#SA").prop('checked');
		data ["DO"]=$("#DO").prop('checked');
		enviar(data);

	}
	return false;
}

function enviar(data) {
	$.ajax({
		url: 'https://localhost/slim/index.php/insertHorarios',
		type : 'POST',
		data: data,
		dataType : 'json',
		success: function(response) {
			console.log(response);
			var diasErroneos="";
			for (var i = 0; i < response.length; i++) {
				if (response[i].status=="error") {
					switch (response[i].dia) {
						case "LU":
							diasErroneos+=" Lunes ";
							break;
						case "MA":
							diasErroneos+=" Martes ";
							break;
						case "MI":
							diasErroneos+=" Miercoles ";
							break;
						case "JU":
							diasErroneos+=" Jueves ";
							break;
						case "VI":
							diasErroneos+=" Viernes ";
							break;
						case "SA":
							diasErroneos+=" Sabado ";
							break;
						case "DO":
							diasErroneos+=" Domingo ";
							break;
						default:

					}
				}
			}

			if (diasErroneos) {
				alert("Los siguientes días ya fueron dados de alta anteriormente="+diasErroneos);
			}else{
				alert("Se insertaron correctamente los días");
			}
			location.reload();
		},
		error: function() {
			alert("Error al dar de alta el horario");
			console.log("No se ha podido enviar la información");
		}
	});
}
