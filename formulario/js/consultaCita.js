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


//Boton buscar cita-----------------------------------------------------------------------------------------
$("#btn_buscar_cita").click(function(){

valida_hr_ini();
valida_hr_fin();
valida_fecha();
valida_paciente();
valida_dentista();
valida_especialidad();
   



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


$.ajax({
            url: "../../slim/index.php/consultaAgenda",
            type: "GET",
            async: true,
            data: $("#form_buscar_citas").serialize(),
            dataType: "json",
            success: function(response){
              alert("todo bien"+response.length + response[0].FECHA);
              $("#tabla").td("jej");
            },
            error: function(error){
                alert("rashos")
            }
        });


});






var valida_hr_ini= function(){
    if($("#hora_ini_b").val()=="Selecciona una opción"){
        $("#hora_ini_b").css({"border-color":"red"});
        $("#span_ini_b").fadeIn();
    }else{
        $("#hora_ini_b").css({"border-color":"green"});
        $("#span_ini_b").fadeOut();
    }

}
var valida_hr_fin= function(){
    if($("#hora_fin_b").val()=="Selecciona una opción"){
        $("#hora_fin_b").css({"border-color":"red"});
        $("#span_fin_b").fadeIn();
    }else{
        $("#hora_fin_b").css({"border-color":"green"});
        $("#span_fin_b").fadeOut();
    }

}

var valida_fecha = function(){

    if($("#fecha_cita_b").val()==""){
        $("#fecha_cita_b").css({"border-color":"red"});
        $("#span_fecha_b").fadeIn();
    }
    else{
        $("#fecha_cita_b").css({"border-color":"green"});
        $("#span_fecha_b").fadeOut();
    }   
};

var valida_paciente = function(){

    if($("#paciente_b").val()=="Selecciona una opción"){
        $("#paciente_b").css({"border-color":"red"});
        $("#span_paciente_b").fadeIn();
    }
    else{
        $("#paciente_b").css({"border-color":"green"});
        $("#span_paciente_b").fadeOut();
    }   
};

var valida_dentista = function(){
    if($("#dentista").val()=="Selecciona una opción"){
        $("#dentista").css({"border-color":"red"});
        $("#span_doctor_b").fadeIn();
    }else{
        $("#dentista").css({"border-color":"green"});
        $("#span_doctor_b").fadeOut();
    }

}

var valida_especialidad= function(){
    if($("#especialidad_b").val()=="Selecciona una opción"){
        $("#especialidad_b").css({"border-color":"red"});
        $("#span_esp_b").fadeIn();
    }else{
        $("#especialidad_b").css({"border-color":"green"});
        $("#span_esp_b").fadeOut();
    }

}


});



