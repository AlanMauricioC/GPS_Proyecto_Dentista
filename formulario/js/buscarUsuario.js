$(document).ready(function(){
	var cont = 0;
	//oculta botones innecesarios
	$("#cancelar").hide();
	$("#aceptar").hide();
	//llena los datos de la tabla con los usuarios existentes
	$.ajax({
            url: "../../slim/index.php/consultaUsuario",
            type: "GET",
            async: true,
            data: $("#formulario").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var row = createRow({
    					tipo: response[i].ID_TIPODEUSUARIO,
    					nombre: response.NOMBRE,
    					apellidos: response.APELLIDOS,
    					perfil: response[i].ID_PERFIL,
    					estado:response[i].ESTADO,
    					rfc: response[i].RFC
  					});
  					$('table tbody').append(row);
                }
            },
            error: function(error){
                alert("no hay datos de usuario agregados")
                var row = createRow({
    					tipo: "response[i].ID_TIPODEUSUARIO",
    					nombre: "response.NOMBRE",
    					apellidos: "response.APELLIDOS",
    					perfil: "response[i].ID_PERFIL",
    					estado:"response[i].ESTADO",
    					rfc: "response[i].RFC"
  					});
  					$('table tbody').append(row);
  					var row = createRow({
    					tipo: "response[i].ID_TIPODEUSUARIO2",
    					nombre: "response.NOMBRE",
    					apellidos: "response.APELLIDOS",
    					perfil: "response[i].ID_PERFIL",
    					estado:"response[i].ESTADO",
    					rfc: "response[i].RFC"
  					});
  					$('table tbody').append(row);
            }
        });

	 

	//función para crear filas
	function createRow(data) {
  		cont +=1;
  		return (
    		`<tr id="fila1"><td><input type="checkbox" value="`+cont+`"  name="usu[]"> </td>` +
      		`<td>${data.tipo}</td>` +
      		`<td>${data.nombre}</td>` +
      		`<td>${data.apellidos}</td>` +
      		`<td>${data.perfil}</td>` +
      		`<td>${data.estado}</td>` +
      		`<td>${data.rfc}</td>` +
    		`</tr>`
  		);
	}

	

	//función para eliminar usuario
	$("#eliminar").click(function(argument){
		if (confirm('¿Seguro que desea eliminar al usuario?')) {
		$.ajax({
            url: "../../slim/index.php/eliminarUsuario",
            type: "GET",
            async: true,
            data: $("#formulario").serialize(),
            dataType: "json",
            success: function(response){

            },
            error: function(error){
                alert("No se eliminó usuario")
            }
        });
        } else {
			alert('No se eliminó usuario');
		}
	});

	$("#modificar").click(function(argument){

		//introduce el formulario
		$("#modif").append("<div class=\"row\"><h1 class=\" col titulo\" >MODIFICAR USUARIO</h1></div><form class=\"contact100-form validate-form\" name=\"formulario2\" id=\"formulario2\"><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere tipo de usuario\"><span class=\"label-input100\" id=\"etsell\">Tipo de usuario:</span> <select class=\"form-control\" id=\"sel1\" name=\"sel1\"> <option>Informes</option> <option>Administración</option><option>Dirección</option><option>Recursos Humanos</option></select>	<span class=\"focus-input100\"></span></div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere nombre\"><span class=\"label-input100\" id=\"etname\">Nombre:</span><input class=\"input100\" type=\"textv\" name=\"name\" id=\"name\">	<span class=\"focus-input100\"></span></div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requieren apellidos\"><span class=\"label-input100\" id=\"etapellidos\">Apellidos:</span><input class=\"input100\" type=\"text\" name=\"apellidos\" id=\"apellidos\"><span class=\"focus-input100\"></span></div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere usuario\"><span class=\"label-input100\" id=\"etusuario\">Usuario:</span><input class=\"input100\" type=\"text\" name=\"usuario2\" id=\"usuario2\"><span class=\"focus-input100\"></span>	</div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere clave\"><span class=\"label-input100\" id=\"etclave\">Clave:</span><input class=\"input100\" type=\"text\" name=\"clave\" id=\"clave\"><span class=\"focus-input100\"></span></div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere perfil\"><span class=\"label-input100\" id=\"etperfil\">Perfil:</span> <select class=\"form-control\" name=\"perfil\" id=\"perfil\"></select><span class=\"focus-input100\"></span></div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere sucursal\"><span class=\"label-input100\" id=\"etsucursal\">Sucursal:</span> <select class=\"form-control\" name=\"sucursal\" id=\"sucursal\"></select><span class=\"focus-input100\"></span></div><div class=\"validate-input\"><span class=\"label-input100\" id=\"etdentista\">Dentista:</span><input type=\"checkbox\" name=\"esdentista\" id=\"esdentista\" data-toggle=\"toggle\" data-onstyle=\"info\" data-on=\"Sí\" data-off=\"No\">	<span class=\"focus-input100\"></span></div><br><div class=\"validate-input\"><span class=\"label-input100\" id=\"etestado\">Estado:</span>	<input type=\"checkbox\" name=\"estado\" id=\"estado\" data-toggle=\"toggle\" data-onstyle=\"info\" data-on=\"Sí\" data-off=\"No\">	</div><br/><br/><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere RFC\"><span class=\"label-input100\" id=\"etrfc\">RFC:</span><input class=\"input100\" type=\"text\" name=\"rfc\" id=\"rfc\"><span class=\"focus-input100\"></span></div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere teléfono\"><span class=\"label-input100\" id=\"etphone\">Teléfono:</span><input class=\"input100\" type=\"text\" name=\"phone\" id=\"phone\">\<span class=\"focus-input100\"></span></div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requiere número de celular\"><span class=\"label-input100\" id=\"etcel\">Celular:</span><input class=\"input100\" type=\"text\" name=\"cel\" id=\"cel\"><span class=\"focus-input100\"></span></div><div class=\"wrap-input100 validate-input\" data-validate=\"Se requieren permisos\"><span class=\"label-input100\" id=\"etpermiso\">Permisos:</span><select class=\"form-control\" name=\"permisos\" id=\"permisos\"></select><span class=\"focus-input100\"></span></div></div></form>");
		//muestra botones
		$("#cancelar").show();
		$("#aceptar").show();
		//LLENAR LOS SELECT
		$.ajax({
            url: "../../slim/index.php/consultaPerfiles",
            type: "GET",
            async: true,
            data: $("#formulario").serialize(),
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
            url: "../../slim/index.php/consultaSucursales",
            type: "GET",
            async: true,
            data: $("#formulario").serialize(),
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
            url: "../../slim/index.php/consultaTipoUsuarios",
            type: "GET",
            async: true,
            data: $("#formulario").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var desc = response[i].DESCRIPCION+ "( "+ response[i] + " )";
                    $("#sucursal").append($("<option></option>").attr("value",response[i].ID_TIPODEUSUARIO).text(desc));
                }
            },
            error: function(error){
                alert("no hay tipos de usuario agregados")
            }
        });
		// llena los campos con el usuario que se busca
		$.ajax({
            url: "../../slim/index.php/consultaUsuario",
            type: "GET",
            async: true,
            data: $("#formulario").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                	$("#name").val(response[i].NOMBRE);
                    $("#apellidos").val(response[i].APELLIDOS);
                    $("#sel1").val(response[i].ID_TIPODEUSUARIO);
                    $("#perfil").val(response[i].ID_PERFIL);
                    $("#sucursal").val(response[i].SUCURSAL);
                    $("#permisos").val(response[i].ID_PERMISOS);
                    $("#rfc").val(response[i].RFC);
                    $("#usuario2").val(response[i].USUARIO);
                    $("#clave").val(response[i].CLAVE);
                    $("#phone").val(response[i].TELEFONO);
                    $("#cel").val(response[i].CELULAR);
                    if(response[i].ESTADO == true){
                    	$("#estado").prop("checked", true);
                    }
                    if (response[i].ES_DENTISTA == true) {
                    	$("#esdentista").prop("checked", true);	
                    }
            	}
            },
            error: function(error){
                alert("no se encontró usuario con ese nombre")
            }
        });


	});

	$("#aceptar").click(function(argument){
		if (confirm('¿Seguro que desea modificar al usuario?')) {
		//guarda los cambios 
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
        //Insertar datos en tabla
        if(faltas == 0){
            $.ajax({
                url: "../../slim/index.php/modificarUsuario",
                method: "POST",
                async: true,
                data: $("#formulario2").serialize(),
                dataType: "json",
                success: function(respuesta) {
                //Accion 1
                }
            });
        }
    	} else {
			alert('No se guardaron cambios');
		}
    	return false;
	})


	$("#buscar").click(function(argument) {
		//borra las filas agregadas por default
		for(var i = 0 ; i < cont ; i++){
			$("#fila1").remove();	
		}
		
		//busca al usuario
		$.ajax({
            url: "../../slim/index.php/consultaUsuario",
            type: "GET",
            async: true,
            data: $("#formulario").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var row = createRow({
    					tipo: response[i].ID_TIPODEUSUARIO,
    					nombre: response.NOMBRE,
    					apellidos: response.APELLIDOS,
    					perfil: response[i].ID_PERFIL,
    					estado:response[i].ESTADO,
    					rfc: response[i].RFC
  					});
  					$('table tbody').append(row);
                }
            },
            error: function(error){
                alert("no se encontró usuario con ese nombre")
            }
        });
		

        return false;

	});
	//recarga la página
	$("#cancelar").click(function(argument){
		location.reload(true);
	})


});