$(document).ready(function(){

//Cargar pacientes a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "../../slim/index.php/consultaPacienteAgendar",
            type: "GET",
            async: true,
            data: $("#form_reportes").serialize(),
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

//Boton ver registros-----------------------------------------------------------------------------------------

$("#btn_ver_citas").click(function(){
    if($('#paciente').val())
    citasPacientesFecha();                
});
//-----------------------------------------

$("#btn_eliminar_comentario").click(function(){
    borrar_comentario();      
});
$("#btn_guardar_comentario").click(function(){
    modificar_comentario();      
});



function citasPacientesFecha() {
      $.ajax({
                url: "../../slim/index.php/citasPaciente",
                type: "GET",
                async: true,
                data: $("#form_reportes").serialize(),
                dataType: "json",
                success: function(response){
                    $("#tabla_pacientes").empty().append("<thead><th>FECHA</th><th>HORA</th><th>DOCTOR</th><th>ESTADO</th></thead>");
                    
                    for (var i=0; i < response.length; i++) {
                        try{
                            var id_agenda = response[i].ID_AGENDA;
                            var fecha = response[i].FECHA;
                            var paciente = response[i].NOMBRE +" "+ response[i].APELLIDOS;
                            var estado =response[i].ESTADO;
                            var hora = parseInt(response[i].HORA_INICIO);
                            var id_motivo = response[i].ID_MOTIVO;
                            
                            switch(id_motivo){
                                case "1": motivo='EF6C00';
                                    break;
                                case "2": motivo='00695C';
                                    break;
                                case "3": motivo='C0CA33';
                                    break;
                                case "4": motivo='558B2F';
                                    break;
                                case "5": motivo='1565C0';
                                    break;
                                default: motivo='1DE9B6';    
                            }

                            if(hora>=12){
                                if(hora==12){
                                    hora_inicio=hora+":00 PM"
                                }else{
                                    hora_inicio=(hora-12)+':00 PM';
                                    //hora_inicio=hora_inicio+":00 PM";
                                }
                            }else{
                                hora_inicio=hora+":00 AM"
                            }
                            var doctor = response[i].NOMBRE_DOCTOR+" "+response[i].APELLIDOS_DOCTOR;
                            $("#titulo_reporte").text(paciente);
                                $("#tabla_pacientes").append("<tr class='equisde' style='background-color: #"+motivo+";' ><td><a href='"+id_agenda+"'></a>"+fecha+"</td><td>"+hora_inicio+"</td><td>"+doctor+"</td><td>"+estado+"</td></tr>"  );

                        }catch(e){

                        }
                    }                                
                
                    $('.equisde').click(hola);

                },
                error: function(error){
                    alert("No hay pacientes");

                }
            });
}


function hola(){
   var href = $(this).find("a").attr("href");
        if(href) {
           comentario(href);
    }
}




});

//---------------------------------------------------------------------------------------------------------------------------------

function borrar_comentario() {
   $.ajax({
                  url: "../../slim/index.php/deleteComentario",
                  type: "GET",
                  async: true,
                  data: "id_agenda="+$("#id_txt_comentario").val() ,
                  dataType: "json",
                  success: function(response){
                    $("#comentarios").text('');
                    $("#comentarios").val('');
                  },
                  error: function(error){
                  }
              });
}

function modificar_comentario() {
   $.ajax({
                  url: "../../slim/index.php/insertComentario",
                  type: "GET",
                  async: true,
                  data: "id_agenda="+$("#id_txt_comentario").val()+"&&comentario="+$("#comentarios").val() ,
                  dataType: "json",
                  success: function(response){

                  },
                  error: function(error){
                  }
              });
}

function comentario(id){  
  $.ajax({
                  url: "../../slim/index.php/selectComentario",
                  type: "GET",
                  async: true,
                  data: "id_agenda="+id ,
                  dataType: "json",
                  success: function(response){
                    $("#comentarios").val(response[0].COMENTARIO);
                    $("#id_txt_comentario").val(id);
                    if(response[0].COMENTARIO.length<1){
                      $("#btn_guardar_comentario").attr('data-target','#modal_insertar_comentario');
                    }else{
                      $("#btn_guardar_comentario").attr('data-target','#modal_modificar_confirmar');
                    }
                  },
                  error: function(error){
                  }
              });
}

