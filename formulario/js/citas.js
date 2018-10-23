$(document).ready(function(){

//Dia de la semana-----------------------------------------------------------------------------------------
$("#fecha_cita" ).change(function() {
    var fecha = new Date($(this).val());
    var dia = fecha.getDay();
    switch (dia){
        case 0 : $("#dia_semana_agendar").val("LU");
            break;
        case 1 : $("#dia_semana_agendar").val("MA");
            break;
        case 2 : $("#dia_semana_agendar").val("MI");
            break;
        case 3 : $("#dia_semana_agendar").val("JU");
            break;
        case 4 : $("#dia_semana_agendar").val("VI");
            break;
        case 5 : $("#dia_semana_agendar").val("SA");
            break;
        case 6 : $("#dia_semana_agendar").val("DO");
            break;

    }

$.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/consultaHorarioAgendar",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){
                    //limpia horarios anteriores
                     $("#hora_ini").empty().append($("<option></option>").text("Selecciona una opción"));
                     $("#hora_fin").empty().append($("<option></option>").text("Selecciona una opción"));

                    var inicio = parseInt(response[0].HORA_INICIO);
                    var fin = parseInt(response[0].HORA_TERMINO);

                    for (var i = inicio; i < fin; i++) {
                        $("#hora_ini").append($("<option></option>").attr("value",i).text(i+":00"));
                    }

                    for (var i = inicio+1 ; i <= fin; i++) {
                        $("#hora_fin").append($("<option></option>").attr("value",i).text(i+":00"));
                    }               

            },
            error: function(error){
                alert("Seleccione un dentista");
            }
        });


});
    


//Cargar dentistas a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/consultaDentistaAgendar",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var dentista = response[i].NOMBRE + " " + response[i].APELLIDOS;
                    $("#dentista").append($("<option></option>").attr("value",response[i].ID_USUARIO).text(dentista));
                }
            },
            error: function(error){
                alert("no hay dentistas registrados");
            }
        });
//Cargar estado a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/consultaEstadoAgendar",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    $("#estado").append($("<option></option>").attr("value",response[i].ID_ESTADO_CITA).text(response[i].DESCRIPCION));
                }
            },
            error: function(error){
                alert("no hay dentistas registrados");
            }
        });

//Cargar horarios a formulario -----------------------------------------------------------------------------------------
$("#dentista" ).change(function() {
$.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/consultaHorarioAgendar",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){
                    //limpia horarios anteriores
                     $("#hora_ini").empty().append($("<option></option>").text("Selecciona una opción"));
                     $("#hora_fin").empty().append($("<option></option>").text("Selecciona una opción"));

                    var inicio = parseInt(response[0].HORA_INICIO);
                    var fin = parseInt(response[0].HORA_TERMINO);

                    for (var i = inicio; i < fin; i++) {
                        $("#hora_ini").append($("<option></option>").attr("value",i).text(i+":00"));
                    }

                    for (var i = inicio+1 ; i <= fin; i++) {
                        $("#hora_fin").append($("<option></option>").attr("value",i).text(i+":00"));
                    }               

            },
            error: function(error){
                alert("Seleccione una fecha");
            }
        }); 

});

//Cargar pacientes a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/consultaPacienteAgendar",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    var paciente = response[i].NOMBRE + " " + response[i].APELLIDOS;
                    $("#paciente").append($("<option></option>").attr("value",response[i].ID_PACIENTE).text(paciente));
                }
            },
            error: function(error){
                alert("no hay pacientes registrados");
            }
        });

//Cargar especialidades a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/consultaEspecialidadAgendar",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){

                for (var i = 0; i < response.length; i++) {
                    $("#especialidad").append($("<option></option>").attr("value",response[i].ID_ESPECIALIDAD).text(response[i].DESCRIPCION));
                }
            },
            error: function(error){
                alert("no hay pacientes registrados");
            }
        });
//Cargar motivo atencion a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/consultaMotivoAtencionAgendar",
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
                alert("no hay pacientes registrados");
            }
        });


//Boton agendar cita-----------------------------------------------------------------------------------------

$("#btn_agendar_cita").click(function(){
valida_fecha();
valida_hr_ini();
valida_hr_fin();
valida_paciente();
valida_dentista();
valida_estado();
valida_especialidad();
valida_motivo();
/*

   
     $.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/consultaAgenda",
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
$.ajax({
            url: "www.kimberly-clark-logistica.com/slim/index.php/insertAgenda",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){
             if(response.respuesta)
                alert("Nueva cita registrada");
            else
                alert("La cita ya se encuentra registrada");

            },
            error: function(error){
                alert("La cita ya se encuentra registrada");

            }
        });
}

});






var valida_hr_ini= function(){
    if($("#hora_ini").val()=="Selecciona una opción"){
        $("#hora_ini").css({"border-color":"red"});
        $("#span_ini").fadeIn();
        return false;
    }else{
        $("#hora_ini").css({"border-color":"green"});
        $("#span_ini").fadeOut();
        return true;
    }

}
var valida_hr_fin= function(){
    if($("#hora_fin").val()=="Selecciona una opción"){
        $("#hora_fin").css({"border-color":"red"});
        $("#span_fin").fadeIn();
        return false;
    }else{
        $("#hora_fin").css({"border-color":"green"});
        $("#span_fin").fadeOut();
        return true;
    }

}

var valida_fecha = function(){

    if($("#fecha_cita").val()==""){
        $("#fecha_cita").css({"border-color":"red"});
        $("#span_fecha").fadeIn();
        return false;
    }
    else{
        $("#fecha_cita").css({"border-color":"green"});
        $("#span_fecha").fadeOut();
        return true;
    }   
};

var valida_paciente = function(){

    if($("#paciente").val()=="Selecciona una opción"){
        $("#paciente").css({"border-color":"red"});
        $("#span_paciente").fadeIn();
        return false;
    }
    else{
        $("#paciente").css({"border-color":"green"});
        $("#span_paciente").fadeOut();
        return true;
    }   
};

var valida_dentista = function(){
    if($("#dentista").val()=="Selecciona una opción"){
        $("#dentista").css({"border-color":"red"});
        $("#span_dentista").fadeIn();
        return false;
    }else{
        $("#dentista").css({"border-color":"green"});
        $("#span_dentista").fadeOut();
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
    if($("#especialidad").val()=="Selecciona una opción"){
        $("#especialidad").css({"border-color":"red"});
        $("#span_esp").fadeIn();
        return false;
    }else{
        $("#especialidad").css({"border-color":"green"});
        $("#span_esp").fadeOut();
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



