$(document).ready(function(){

$("#btn_agendar_cita").click(function(){

valida_hr_ini();
valida_hr_fin();
valida_fecha();
valida_paciente();
valida_doctor();
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
            url: "../../slim/index.php/insertAgenda",
            type: "GET",
            async: true,
            data: $("#form_agendar_citas").serialize(),
            dataType: "json",
            success: function(response){
              alert("todo bien");

            },
            error: function(error){
                alert("rashos")
            }
        });


});






var valida_hr_ini= function(){
    if($("#hora_ini").val()=="Selecciona una opción"){
        $("#hora_ini").css({"border-color":"red"});
        $("#span_ini").fadeIn();
    }else{
        $("#hora_ini").css({"border-color":"green"});
        $("#span_ini").fadeOut();
    }

}
var valida_hr_fin= function(){
    if($("#hora_fin").val()=="Selecciona una opción"){
        $("#hora_fin").css({"border-color":"red"});
        $("#span_fin").fadeIn();
    }else{
        $("#hora_fin").css({"border-color":"green"});
        $("#span_fin").fadeOut();
    }

}

var valida_fecha = function(){

    if($("#fecha_cita").val()==""){
        $("#fecha_cita").css({"border-color":"red"});
        $("#span_fecha").fadeIn();
    }
    else{
        $("#fecha_cita").css({"border-color":"green"});
        $("#span_fecha").fadeOut();
    }   
};

var valida_paciente = function(){

    if($("#paciente").val()==""){
        $("#paciente").css({"border-color":"red"});
        $("#span_paciente").fadeIn();
    }
    else{
        $("#paciente").css({"border-color":"green"});
        $("#span_paciente").fadeOut();
    }   
};

var valida_doctor = function(){
    if($("#doctor").val()=="Selecciona una opción"){
        $("#doctor").css({"border-color":"red"});
        $("#span_doctor").fadeIn();
    }else{
        $("#doctor").css({"border-color":"green"});
        $("#span_doctor").fadeOut();
    }

}

var valida_especialidad= function(){
    if($("#especialidad").val()=="Selecciona una opción"){
        $("#especialidad").css({"border-color":"red"});
        $("#span_esp").fadeIn();
    }else{
        $("#especialidad").css({"border-color":"green"});
        $("#span_esp").fadeOut();
    }

}


});



