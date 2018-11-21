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
            case '1': atend_cancel();
                break;  
        }
            

});







function atend_cancel() {
      $.ajax({
                url: "../../slim/index.php/pacientesAtendidos",
                type: "GET",
                async: true,
                data: $("#form_reportes").serialize(),
                dataType: "json",
                success: function(response){
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
                                t1++
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






});



