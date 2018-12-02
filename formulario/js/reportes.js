$(document).ready(function(){

//Cargar dentistas a formulario-----------------------------------------------------------------------------------------
$.ajax({
            url: "../../slim/index.php/consultaDentistaAgendar",
            type: "GET",
            async: true,
            data: $("#form_reportes").serialize(),
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

//Boton ver registros-----------------------------------------------------------------------------------------

$("#btn_ver_reportes").click(function(){

        switch($("#ver_reporte").val()){
            case '1': pacientes_atendidos();
                break;
            case '5': citas_estados_tipo();
                break;
            case '6': reporte_por_fecha();
                break;
            case '7': reporte_por_estado();
                break;
        }


});







function pacientes_atendidos() {
    $("#titulo_reporte").text('Reporte de pacientes atendidos');
      $.ajax({
                url: "../../slim/index.php/pacientesAtendidos",
                type: "GET",
                async: true,
                data: $("#form_reportes").serialize(),
                dataType: "json",
                success: function(response){
                    $("#tabla_reportes").empty();
                    $("#tabla_at").empty().append("<thead><tr><th>PACIENTES ATENDIDOS</th></tr></thead>");
                    $("#tabla_cancel").empty().append("<thead><tr>><th>PACIENTES CANCELADOS</th></tr></thead>");
                    var t1=0,t2=0;
                    for (var i=0; i < response.length; i++) {
                        try{
                            var id_agenda = response[i].ID_AGENDA;
                            var fecha = response[i].FECHA;
                            var paciente = response[i].NOMBRE +" "+ response[i].APELLIDOS;
                            var estado =response[i].ID_ESTADO;
                            if(estado==1){
                                $("#tabla_at").append("<tr><td>" + fecha + "<br>"+paciente+"</td></tr>"  );
                                t1++;
                            }else
                                if(estado==2){
                                    $("#tabla_cancel").append("<tr><td>" + fecha + "<br>"+paciente+"</td></tr>"  );
                                    t2++;
                                }
                        }catch(e){
                            alert("No hay pacietes");
                        }
                    }

                    if(t1>t2)
                            for (var i = 0; i < (t1-t2); i++) {
                                $("#tabla_cancel").append("<tr><td><br><br></td></tr>"  );
                            }
                    else
                        if (t2>t1)
                            for (var i = 0; i < (t2-t1); i++) {
                                $("#tabla_at").append("<tr><td><br><br></td></tr>"  );
                            }

                },
                error: function(error){
                    alert("No hay pacientes");

                }
            });
}
function citas_estados_tipo() {
    $("#titulo_reporte").text('Reporte de citas, estados y tipo de atención');
      $.ajax({
                url: "../../slim/index.php/citasEstadosTipo",
                type: "GET",
                async: true,
                data: $("#form_reportes").serialize(),
                dataType: "json",
                success: function(response){
                    $("#tabla_reportes").empty().append("<thead><th>Paciente</th><th>Estado</th><th>Tipo de consulta</th><th>Fecha</th></thead>");
                    $("#tabla_at").empty();
                    $("#tabla_cancel").empty();
                    var t1=0,t2=0;
                    for (var i=0; i < response.length; i++) {
                        try{
                            var id_agenda = response[i].ID_AGENDA;
                            var fecha = response[i].FECHA;
                            var paciente = response[i].NOMBRE +" "+ response[i].APELLIDOS;
                            var estado =response[i].ESTADO;
                            var motivo =response[i].MOTIVO;
                                $("#tabla_reportes").append("<tr><td>"+paciente+"</td><td>"+estado+"</td><td>"+motivo+"</td><td>"+fecha+"</td></tr>"  );

                        }catch(e){
                            alert("No hay pacietes");
                        }
                    }


                },
                error: function(error){
                    alert("No hay pacientes");

                }
            });
}

function reporte_por_fecha() {
    $("#titulo_reporte").text('Reporte por fecha');
      $.ajax({
                url: "../../slim/index.php/citasPorFecha",
                type: "GET",
                async: true,
                data: $("#form_reportes").serialize(),
                dataType: "json",
                success: function(response){
                    $("#tabla_reportes").empty().append("<thead><th>Fecha</th><th>Paciente</th><th>Estado</th><th>Tipo de consulta</th></thead>");
                    $("#tabla_at").empty();
                    $("#tabla_cancel").empty();
                    var t1=0,t2=0;
                    for (var i=0; i < response.length; i++) {
                        try{
                            var id_agenda = response[i].ID_AGENDA;
                            var fecha = response[i].FECHA;
                            var paciente = response[i].NOMBRE +" "+ response[i].APELLIDOS;
                            var estado =response[i].ESTADO;
                            var motivo =response[i].MOTIVO;
                                $("#tabla_reportes").append("<tr><td>"+fecha+"</td><td>"+paciente+"</td><td>"+estado+"</td><td>"+motivo+"</td></tr>"  );

                        }catch(e){
                            alert("No hay pacietes");
                        }
                    }


                },
                error: function(error){
                    alert("No hay pacientes");

                }
            });
}

function reporte_por_estado() {
    $("#titulo_reporte").text('Reporte por estado');
      $.ajax({
                url: "../../slim/index.php/citasPorEstado",
                type: "GET",
                async: true,
                data: $("#form_reportes").serialize(),
                dataType: "json",
                success: function(response){
                    $("#tabla_reportes").empty().append("<thead><th>Estado</th><th>Paciente</th><th>Tipo de consulta</th><th>Fecha</th></thead>");
                    $("#tabla_at").empty();
                    $("#tabla_cancel").empty();
                    var t1=0,t2=0;
                    for (var i=0; i < response.length; i++) {
                        try{
                            var id_agenda = response[i].ID_AGENDA;
                            var fecha = response[i].FECHA;
                            var paciente = response[i].NOMBRE +" "+ response[i].APELLIDOS;
                            var estado =response[i].ESTADO;
                            var motivo =response[i].MOTIVO;
                                $("#tabla_reportes").append("<tr><td>"+estado+"</td><td>"+paciente+"</td><td>"+motivo+"</td><td>"+fecha+"</td></tr>"  );

                        }catch(e){
                            alert("No hay pacietes");
                        }
                    }


                },
                error: function(error){
                    alert("No hay pacientes");

                }
            });
}






});


function reporteAgenda() {

    if ($("#dentista").val()) {
        var data={};
        data["ID_USUARIO"]=$("#dentista").val();
        $.ajax({
            url: 'http://localhost/slim/index.php/getReporteAgenda',
            type : 'POST',
            data: data,
            dataType : 'json',
            success: function(response) {

                insertarAgenda(response.result);
            },
            error: function() {
                console.log("No se ha podido obtener la información de usuarios");
            }
        });
    }else{
        alert("Selecciona un dentista")
    }

}

function insertarAgenda(data) {
    $("#tabla_reportes").empty().append("<thead><tr><th>FECHA</th><th>HORA</th><th>PACIENTE</th><th>ESPECIALIDAD</th><th>MOTIVO DE ATENCIÓN</th><th>ESTADO</th></tr></thead><tbody>");
    $("#tabla_at").empty();
    $("#tabla_cancel").empty();
    $("#titulo").empty().append("Reporte de agenda");
    if (data) {
        for (var i = 0; i < data.length; i++) {
            $("#tabla_reportes").append("<tr><td>"+data[i].fecha+"</td><td>"+data[i].hora+"</td><td>"+data[i].nombre_paciente+" "+data[i].apellidos_paciente+"</td><td>"+data[i].especialidad+"</td><td>"+data[i].motivo_de_atencion+"</td><td>"+data[i].estado_de_cita+"</td></tr>");
        }
    } else {

    }
    $("#tabla_reportes").append("</tbody>");
}

function reporteCita() {

    if ($("#dentista").val()) {
        var data={};
        data["ID_USUARIO"]=$("#dentista").val();
        $.ajax({
            url: 'http://localhost/slim/index.php/getReporteCitas',
            type : 'POST',
            data: data,
            dataType : 'json',
            success: function(response) {

                insertarCita(response.result);
            },
            error: function() {
                console.log("No se ha podido obtener la información de usuarios");
            }
        });
    }else{
        alert("Selecciona un dentista")
    }

}

function insertarCita(data) {
    $("#tabla_reportes").empty().append("<thead><tr><th>FECHA</th><th>HORA</th><th>PACIENTE</th><th>COMENTARIOS</th><th>MOTIVO DE ATENCIÓN</th><th>ESTADO</th></tr></thead><tbody>");
    $("#tabla_at").empty();
    $("#tabla_cancel").empty();
    $("#titulo").empty().append("Reporte de Citas");
    if (data) {
        for (var i = 0; i < data.length; i++) {
            $("#tabla_reportes").append("<tr><td>"+data[i].fecha+"</td><td>"+data[i].hora+"</td><td>"+data[i].nombre_paciente+" "+data[i].apellidos_paciente+"</td><td>"+data[i].comentarios+"</td><td>"+data[i].motivo_de_atencion+"</td><td>"+data[i].estado_de_cita+"</td></tr>");
        }
    } else {

    }
    $("#tabla_reportes").append("</tbody>");
}


function reporteCitasCanceladas() {

    if ($("#dentista").val()) {
        var data={};
        data["ID_USUARIO"]=$("#dentista").val();
        $.ajax({
            url: 'http://localhost/slim/index.php/getReporteCitascanceladas',
            type : 'POST',
            data: data,
            dataType : 'json',
            success: function(response) {

                insertarCitasCanceladas(response.result);
            },
            error: function() {
                console.log("No se ha podido obtener la información de usuarios");
            }
        });
    }else{
        alert("Selecciona un dentista")
    }

}

function insertarCitasCanceladas(data) {
    $("#tabla_reportes").empty().append("<thead><tr><th>Paciente</th><th>Estado</th><th>Tipo de consulta</th><th>Fecha</th></tr></thead><tbody>");
    $("#tabla_at").empty();
    $("#tabla_cancel").empty();
    $("#titulo").empty().append("Reporte de citas antendidas y canceladas");
    if (data) {
        for (var i = 0; i < data.length; i++) {
            $("#tabla_reportes").append("<tr><td>"+data[i].nombre_paciente+" "+data[i].apellidos_paciente+"</td><td>"+data[i].estado_de_cita+"</td><td>"+data[i].motivo_de_atencion+"</td><td>"+data[i].fecha+"</td></tr>");
        }
    } else {

    }
    $("#tabla_reportes").append("</tbody>");
}
