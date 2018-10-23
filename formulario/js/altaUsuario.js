$(document).ready(function(){

    $.ajax({
        
            url: "https://www.kimberly-clark-logistica.com/slim/index.php/consultaPerfiles",
            type: "GET",
            async: true,
            data: null,
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var desc = response[i].DESCRIPCION;
                    $("#perfil").append($("<option></option>").attr("value",response[i].ID_PERFIL).text(desc));
                }
            },
            error: function(error){
                alert("no hay perfiles")
            }
        });

    $.ajax({
            url: "https://www.kimberly-clark-logistica.com/slim/index.php/consultaSucursales",
            type: "GET",
            async: true,
            data: null,
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var desc = response[i].DESCRIPCION;
                    $("#sucursal").append($("<option></option>").attr("value",response[i].ID_SUCURSAL).text(desc));
                }
            },
            error: function(error){
                alert("no hay sucursales agregadas")
            }
        });

    $.ajax({
            url: "https://www.kimberly-clark-logistica.com/slim/index.php/consultaTipoUsuarios",
            type: "GET",
            async: true,
            data: null,
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var desc = response[i].DESCRIPCION+ "( "+ response[i].ADMIN_O_CLINICO + " )";
                    $("#sel1").append($("<option></option>").attr("value",response[i].ID_TIPODEUSUARIO).text(desc));
                }
            },
            error: function(error){
                alert("no hay tipos de usuario agregados")
            }
        });
        
            $.ajax({
            url: "https://www.kimberly-clark-logistica.com/slim/index.php/consultaPermisos",
            type: "GET",
            async: true,
            data: null,
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var desc = response[i].DESCRIPCION+ "( "+ response[i].PERFIL + " )";
                    $("#permisos").append($("<option></option>").attr("value",response[i].ID_PERFILPERMISOS).text(desc));
                }
            },
            error: function(error){
                alert("no hay permisos agregados")
            }
        });

	$("#aceptar").click(function(argument) {
        $("#estado").change();

        var faltas = 0;
        $.ajax({
            url: "https://www.kimberly-clark-logistica.com/slim/index.php/consultaUsuario",
            type: "POST",
            async: true,
            data: $("#formulario").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    if(response[i].ID_USUARIO === null){
                        $("#etusuario").css('color', 'red');
                        $("#etusuario").css('font-size', 'larger');
                        faltas += 1;
                    }
                }
                if(faltas > 0){
                    alert(faltas)
                }
            },
            error: function(error){
                
            }
        });

        
		//validar que el campo nombre no esté vacío
		if($("#name").val() === ""){
        	$("#etname").css('color', 'red');
        	$("#etname").css('font-size', 'larger');
            faltas += 1;
    	}
    	else{
        	$("#etname").css('color', 'gray');
        	$("#etname").css('font-size', 'smaller');
    	}
    	//validar que el campo apellidos no esté vacío
		if($("#apellidos").val() === ""){
        	$("#etapellidos").css('color', 'red');
        	$("#etapellidos").css('font-size', 'larger');
            faltas += 1;
    	}
    	else{
        	$("#etapellidos").css('color', 'gray');
        	$("#etapellidos").css('font-size', 'smaller');
    	}
    	//validar que el campo usuario no esté vacío
		if($(isNaN($("#usuario").val()) || "#usuario").val() === ""){
        	$("#etusuario").css('color', 'red');
        	$("#etusuario").css('font-size', 'larger');
            faltas += 1;
    	}
    	else{
        	$("#etusuario").css('color', 'gray');
        	$("#etusuario").css('font-size', 'smaller');
    	}
    	//validar que el campo clave no esté vacío
		if($("#clave").val() === ""){
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
		if(isNaN($("#cel").val()) || $("#cel").val() === ""){
        	$("#etcel").css('color', 'red');
        	$("#etcel").css('font-size', 'larger');
            faltas += 1;
    	}else{
         	$("#etcel").css('color', 'gray');
        	$("#etcel").css('font-size', 'smaller');
    	}
        //Insertar datos en tabla
        if(faltas === 0){
            $.ajax({
                url: "https://www.kimberly-clark-logistica.com/slim/index.php/insertUsuarios",
                method: "POST",
                async: true,
                data: $("#formulario").serialize(),
                dataType: "json",
                success: function(respuesta) {
                //Accion 1
                alert("Se ha insertado correctamente el nuevo usuario");
                }
            });
            alert("Se ha insertado correctamente el nuevo usuario");
        }
    	return false;
	})
})
