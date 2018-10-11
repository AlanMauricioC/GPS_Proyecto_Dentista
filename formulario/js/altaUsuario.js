$(document).ready(function(){

	$("#aceptar").click(function(argument) {
        var faltas = 0;
		//validar que el campo nombre no esté vacío
		if($("#name").val() == ""){
        	$("#etname").css('color', 'red');
        	$("#etname").css('font-size', 'larger');
            faltas += 1;
    	}
    	else{
        	$("#etname").css('color', 'gray');
        	$("#etname").css('font-size', 'smaller');
    	}
    	//validar que el campo apellidos no esté vacío
		if($("#apellidos").val() == ""){
        	$("#etapellidos").css('color', 'red');
        	$("#etapellidos").css('font-size', 'larger');
            faltas += 1;
    	}
    	else{
        	$("#etapellidos").css('color', 'gray');
        	$("#etapellidos").css('font-size', 'smaller');
    	}
    	//validar que el campo usuario no esté vacío
		if($("#usuario").val() == ""){
        	$("#etusuario").css('color', 'red');
        	$("#etusuario").css('font-size', 'larger');
            faltas += 1;
    	}
    	else{
        	$("#etusuario").css('color', 'gray');
        	$("#etusuario").css('font-size', 'smaller');
    	}
    	//validar que el campo clave no esté vacío
		if($("#clave").val() == ""){
        	$("#etclave").css('color', 'red');
        	$("#etclave").css('font-size', 'larger');
            faltas += 1;
    	}
    	else{
        	$("#etclave").css('color', 'gray');
        	$("#etclave").css('font-size', 'smaller');
    	}
    	
    	//validar el RFC
    	var regex = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
    	if(regex.test($("#rfc").val())){
        	$("#etrfc").css('color', 'red');
        	$("#etrfc").css('font-size', 'larger');
            faltas += 1;
    	}else{
        	$("#etrfc").css('color', 'gray');
        	$("#etrfc").css('font-size', 'smaller');
        }

		//valida que el campo phone sea un número y no esté vacío
		if(isNaN($("#phone").val())){
        	$("#etphone").css('color', 'red');
        	$("#etphone").css('font-size', 'larger');
            faltas += 1;
    	}else{
         	$("#etphone").css('color', 'gray');
        	$("#etphone").css('font-size', 'smaller');
    	}
    	//valida que el campo phone sea un número y no esté vacío
		if(isNaN($("#cel").val()) || $("#cel").val() == ""){
        	$("#etcel").css('color', 'red');
        	$("#etcel").css('font-size', 'larger');
            faltas += 1;
    	}else{
         	$("#etcel").css('color', 'gray');
        	$("#etcel").css('font-size', 'smaller');
    	}
        if(faltas == 0){
            $.ajax({
                url: "url.php",
                method: "POST",
                async: false,
                data: {funcion: "insert"},
                dataType: "json",
                success: function(respuesta) {
                //Accion 1
                }
            });
        }
    	return false;
	})
})