$(document).ready(function(){
//Cargar dentistas a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "../../slim/index.php/consultaDentistaAgendar",
            type: "GET",
            async: true,
            data: $("#form_buscar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var dentista = response[i].NOMBRE + " " + response[i].APELLIDOS;
                    $("#dentista").append($("<option></option>").attr("value",response[i].ID_USUARIO).text(dentista));
                }
            },
            error: function(error){
                alert("no hay dentistas registrados")
            }
        });
//Cargar estado a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "../../slim/index.php/consultaEstadoAgendar",
            type: "GET",
            async: true,
            data: $("#form_buscar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    $("#estado").append($("<option></option>").attr("value",response[i].ID_ESTADO_CITA).text(response[i].DESCRIPCION));
                }
            },
            error: function(error){
                alert("no hay dentistas registrados")
            }
        });


//Cargar horarios a formulario -----------------------------------------------------------------------------------------
$( "#dentista" ).change(function() {
$.ajax({
            url: "../../slim/index.php/consultaHorarioAgendar",
            type: "GET",
            async: true,
            data: $("#form_buscar_citas").serialize(),
            dataType: "json",
            success: function(response){
                    //limpia horarios anteriores
                     $("#hora_ini_b").empty().append($("<option></option>").text("Selecciona una opción"));
                     $("#hora_fin_b").empty().append($("<option></option>").text("Selecciona una opción"));

                    var inicio = parseInt(response[0].HORA_INICIO);
                    var fin = parseInt(response[0].HORA_TERMINO);

                    for (var i = inicio; i < fin; i++) {
                        $("#hora_ini_b").append($("<option></option>").attr("value",i).text(i+":00"));
                    }

                    for (var i = inicio+1 ; i <= fin; i++) {
                        $("#hora_fin_b").append($("<option></option>").attr("value",i).text(i+":00"));
                    }               

            },
            error: function(error){
                alert("Seleccione. un dentista")
            }
        }); 

});

//Cargar pacientes a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "../../slim/index.php/consultaPacienteAgendar",
            type: "GET",
            async: true,
            data: $("#form_buscar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var paciente = response[i].NOMBRE + " " + response[i].APELLIDOS;
                    $("#paciente_b").append($("<option></option>").attr("value",response[i].ID_PACIENTE).text(paciente));
                }
            },
            error: function(error){
                alert("no hay pacientes registrados")
            }
        });

//Cargar especialidades a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "../../slim/index.php/consultaEspecialidadAgendar",
            type: "GET",
            async: true,
            data: $("#form_buscar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    $("#especialidad_b").append($("<option></option>").attr("value",response[i].ID_ESPECIALIDAD).text(response[i].DESCRIPCION));
                }
            },
            error: function(error){
                alert("no hay pacientes registrados")
            }
        });
//Cargar motivo atencion a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "../../slim/index.php/consultaMotivoAtencionAgendar",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    $("#motivo").append($("<option></option>").attr("value",response[i].ID_MOTIVO_ATENCION).text(response[i].DESCRIPCION));
                }
            },
            error: function(error){
                alert("no hay pacientes registrados")
            }
        });

//Boton buscar cita-----------------------------------------------------------------------------------------
$("#btn_buscar_cita").click(function(){

valida_fecha();
valida_hr_ini();
valida_hr_fin();
valida_paciente();
valida_dentista();
valida_estado();
valida_especialidad();
valida_motivo();   


   /*  $.ajax({
            url: "../../slim/index.php/consultaAgenda",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){
              alert("todo bien");

            },
            error: function(error){
                alert("rashos");
            }
        });*/
//alert("jeje");


if(valida_fecha() && valida_hr_ini() && valida_hr_fin() && valida_paciente() && valida_dentista() && valida_estado() && valida_especialidad() && valida_motivo()){
    

 if($("#btn_buscar_cita").text()=="Buscar"){
    $.ajax({
                url: "../../slim/index.php/consultaAgenda",
                type: "GET",
                async: true,
                data: $("#form_buscar_citas").serialize(),
                dataType: "json",
                success: function(response){
                    try{
                        var id_agenda = response[0].ID_AGENDA;
                        var fecha = response[0].FECHA;
                        var hora = response[0].HORA_INICIO + ":00 - " + response[0].HORA_FIN + ":00";
                        var paciente = response[0].NOMBRE +" "+ response[0].APELLIDOS;
                        var estado = response[0].DESCRIPCION_E;
                        var motivo = response[0].DESCRIPCION_M;


                        $("#tabla").empty().append("<thead><tr><th>Fecha</th><th>Hora</th><th>Paciente</th><th>Estado</th><th>Motivo</th></tr></thead>");
                        $("#tabla").append("<tbody><tr><td><input type='hidden' id='chk1' name='chk1' value='"+id_agenda+"'>" + fecha + "</td><td>" + hora + "</td><td>" + paciente + "</td><td>" + estado + "</td><td>" + motivo + "</td></tr></tbody>"  );
                        $("#idAgenda").val(id_agenda);
                        $('#btn_modificar_cita').removeAttr("disabled");
                        $('#btn_imprimir_cita').removeAttr("disabled");
                        $('#btn_eliminar_cita').removeAttr("disabled");
                    }catch(e){
                        alert("No se encontró ningnún registro");
                        $("#tabla").empty().append("<thead><tr><th>Fecha</th><th>Hora</th><th>Paciente</th><th>Estado</th><th>Motivo</th></tr></thead>");
                        $("#btn_modificar_cita").attr("disabled", true);
                        $("#btn_imprimir_cita").attr("disabled", true);
                        $("#btn_eliminar_cita").attr("disabled", true);

                    }


                              },
                error: function(error){
                    $("#tabla").empty().append("<thead><tr><th>Fecha</th><th>Hora</th><th>Paciente</th><th>Estado</th><th>Motivo</th></tr></thead>");
                }
            });
    }else{
        
   $.ajax({
            url: "../../slim/index.php/updateAgenda",
            type: "GET",
            async: true,
            data: $("#form_buscar_citas").serialize(),
            dataType: "json",
            success: function(response){
              alert("todo bien");
            },
            error: function(error){
            }
        });



    }




}

});


//Boton modificar cita-----------------------------------------------------------------------------------------
$("#btn_modificar_cita").click(function(){
    $("#titulo_pag").text("MODIFICAR CITA");
    $("#btn_buscar_cita").text("Aceptar");
     $("#tabla").hide();
     $("#btn_modificar_cita").hide();
     $("#btn_imprimir_cita").hide();
     $("#btn_eliminar_cita").hide();
     $("html, body").animate({ scrollTop: 0 }, "slow");


});


//Boton eliminar cita-----------------------------------------------------------------------------------------
$("#btn_confirm_delete").click(function(){


    $.ajax({
                url: "../../slim/index.php/deleteAgenda",
                type: "GET",
                async: true,
                data: "chk1=" + $("#chk1").val(),
                dataType: "json",
                success: function(response){
                    $("#tabla").empty().append("<thead><tr><th>Fecha</th><th>Hora</th><th>Paciente</th><th>Estado</th><th>Motivo</th></tr></thead>");
                    $("#btn_modificar_cita").attr("disabled", true);
                    $("#btn_imprimir_cita").attr("disabled", true);
                    $("#btn_eliminar_cita").attr("disabled", true);                   
                },
                error: function(error){
                    $("#tabla").empty().append("<thead><tr><th>Fecha</th><th>Hora</th><th>Paciente</th><th>Estado</th><th>Motivo</th></tr></thead>");
                    $("#btn_modificar_cita").attr("disabled", true);
                    $("#btn_imprimir_cita").attr("disabled", true);
                    $("#btn_eliminar_cita").attr("disabled", true); 
                }
            });




});




var valida_hr_ini= function(){
    if($("#hora_ini_b").val()=="Selecciona una opción"){
        $("#hora_ini_b").css({"border-color":"red"});
        $("#span_ini_b").fadeIn();
        return false;
    }else{
        $("#hora_ini_b").css({"border-color":"green"});
        $("#span_ini_b").fadeOut();
        return true;
    }

}
var valida_hr_fin= function(){
    if($("#hora_fin_b").val()=="Selecciona una opción"){
        $("#hora_fin_b").css({"border-color":"red"});
        $("#span_fin_b").fadeIn();
        return false;
    }else{
        $("#hora_fin_b").css({"border-color":"green"});
        $("#span_fin_b").fadeOut();
        return true;
    }

}

var valida_fecha = function(){

    if($("#fecha_cita_b").val()==""){
        $("#fecha_cita_b").css({"border-color":"red"});
        $("#span_fecha_b").fadeIn();
        return false
    }
    else{
        $("#fecha_cita_b").css({"border-color":"green"});
        $("#span_fecha_b").fadeOut();
        return true;
    }   
};

var valida_paciente = function(){

    if($("#paciente_b").val()=="Selecciona una opción"){
        $("#paciente_b").css({"border-color":"red"});
        $("#span_paciente_b").fadeIn();
        return false;
    }
    else{
        $("#paciente_b").css({"border-color":"green"});
        $("#span_paciente_b").fadeOut();
        return true;
    }   
};

var valida_dentista = function(){
    if($("#dentista").val()=="Selecciona una opción"){
        $("#dentista").css({"border-color":"red"});
        $("#span_doctor_b").fadeIn();
        return false;
    }else{
        $("#dentista").css({"border-color":"green"});
        $("#span_doctor_b").fadeOut();
        return true;
    }

}

var valida_estado = function(){
    if($("#estado").val()=="Selecciona una opción"){
        $("#estado").css({"border-color":"red"});
        $("#span_estado").fadeIn();
        return false;
    }else{
        $("#estado").css({"border-color":"green"});
        $("#span_estado").fadeOut();
        return true;
    }

}

var valida_especialidad= function(){
    if($("#especialidad_b").val()=="Selecciona una opción"){
        $("#especialidad_b").css({"border-color":"red"});
        $("#span_esp_b").fadeIn();
        return false;
    }else{
        $("#especialidad_b").css({"border-color":"green"});
        $("#span_esp_b").fadeOut();
        return true;
    }

}
var valida_motivo= function(){
    if($("#motivo").val()=="Selecciona una opción"){
        $("#motivo").css({"border-color":"red"});
        $("#span_coment").fadeIn();
        return false;
    }else{
        $("#motivo").css({"border-color":"green"});
        $("#span_coment").fadeOut();
        return true;
    }

}



});



