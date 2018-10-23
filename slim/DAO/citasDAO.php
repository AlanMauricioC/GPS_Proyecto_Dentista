<?php



class Agenda {

     public function consultaDentista() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select ID_USUARIO,ID_TIPODEUSUARIO,NOMBRE,APELLIDOS,ES_DENTISTA from usuario");

        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_USUARIO"] = $registro["ID_USUARIO"];
            $array[$i]["ID_TIPODEUSUARIO"] = $registro["ID_TIPODEUSUARIO"];
            $array[$i]["NOMBRE"] = utf8_decode(($registro["NOMBRE"]));
            $array[$i]["APELLIDOS"] = utf8_decode($registro["APELLIDOS"]);
            $array[$i]["ES_DENTISTA"] = utf8_decode($registro["ES_DENTISTA"]);

            $i++;
        }


        return json_encode($array);

    }

    public function consultaEstado() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_estado_de_cita");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_ESTADO_CITA"] = $registro["ID_ESTADO_CITA"];
            $array[$i]["DESCRIPCION"] = $registro["DESCRIPCION"];
            $i++;
        }


        return json_encode($array);

    }

    public function consultaHorario() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_horario_dentista where ID_USUARIO =".$_GET["dentista"]." and DIA='".$_GET["dia_semana_agendar"]."';");
                
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["HORA_INICIO"] = $registro["HORA_INICIO"];
            $array[$i]["HORA_TERMINO"] = $registro["HORA_TERMINO"];
            $array[$i]["DESCANSO"] = $registro["DESCANSO"];
            $array[$i]["INICIO_DESCANSO"] = $registro["INICIO_DESCANSO"];
            $array[$i]["TERMINO_DESCANSO"] = $registro["TERMINO_DESCANSO"];
         //   $array[$i]["hora_ini_modificar"] = $hora_ini_modificar;
          //  $array[$i]["hora_fin_modificar"] = $hora_fin_modificar;

            $i++;
        }


        return json_encode($array);

    }


     public function consultaPaciente() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select ID_PACIENTE,NOMBRE,APELLIDOS from tabla_pacientes");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_PACIENTE"] = $registro["ID_PACIENTE"];
            $array[$i]["NOMBRE"] = utf8_decode(($registro["NOMBRE"]));
            $array[$i]["APELLIDOS"] = utf8_decode($registro["APELLIDOS"]);
            $i++;
        }


        return json_encode($array);

    }

     public function consultaEspecialidad() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_especialidades");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_ESPECIALIDAD"] = $registro["ID_ESPECIALIDAD"];
            $array[$i]["DESCRIPCION"] = utf8_decode(($registro["DESCRIPCION"]));
            $i++;
        }


        return json_encode($array);

    }    

    public function consultaMotivoAtencion() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_motivo_atencion");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_MOTIVO_ATENCION"] = $registro["ID_MOTIVO_ATENCION"];
            $array[$i]["DESCRIPCION"] = utf8_decode(($registro["DESCRIPCION"]));
            $i++;
        }


        return json_encode($array);

    }


    public function search() {

        $conn = $GLOBALS['conn'];

        $res = $conn -> query("select ID_AGENDA,FECHA,HORA_INICIO,HORA_FIN,NOMBRE,APELLIDOS,e.DESCRIPCION as DESCRIPCION_E,m.DESCRIPCION as DESCRIPCION_M from 
                                agenda a inner join tabla_pacientes p on a.ID_PACIENTE = p.ID_PACIENTE 
                                inner join catalogo_motivo_atencion m on a.ID_MOTIVO_ATENCION = m.ID_MOTIVO_ATENCION
                                inner join catalogo_estado_de_cita e on a.ID_ESTADO_CITA = e.ID_ESTADO_CITA WHERE 
                                FECHA = '".$_GET["fecha_cita_b"]."' AND 
                                HORA_INICIO = ".$_GET["hora_ini_b"]." AND
                                HORA_FIN = ".$_GET["hora_fin_b"]." AND 
                                a.ID_PACIENTE = ".$_GET["paciente_b"]." AND
                                a.ID_ESPECIALIDAD = ".$_GET["especialidad_b"]." AND
                                a.ID_MOTIVO_ATENCION = ".$_GET["motivo"]." AND
                                a.ID_ESTADO_CITA = ".$_GET["estado"]." ;");
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_AGENDA"] = utf8_decode($registro["ID_AGENDA"]);
            $array[$i]["FECHA"] = utf8_decode($registro["FECHA"]);
            $array[$i]["HORA_INICIO"] = utf8_decode($registro["HORA_INICIO"]);
            $array[$i]["HORA_FIN"] = utf8_decode($registro["HORA_FIN"]);
            $array[$i]["NOMBRE"] = utf8_decode($registro["NOMBRE"]);
            $array[$i]["APELLIDOS"] = utf8_decode($registro["APELLIDOS"]);
            $array[$i]["DESCRIPCION_E"] = utf8_decode($registro["DESCRIPCION_E"]);
            $array[$i]["DESCRIPCION_M"] = utf8_decode($registro["DESCRIPCION_M"]);


            $i++;
        }


        return json_encode($array);

    }


    public function insert() {
        $conn = $GLOBALS['conn'];
///        echo $_GET["fecha_cita"];
        $id_usr=12;
        
        $sql = "insert into agenda (FECHA,ID_USUARIO,HORA_INICIO,HORA_FIN,ID_PACIENTE,ID_USUARIO_DOCTOR,ID_ESTADO_CITA,ID_ESPECIALIDAD,ID_MOTIVO_ATENCION) values ('".$_GET["fecha_cita"]."',".$id_usr.",".$_GET["hora_ini"].",".$_GET["hora_fin"].",".$_GET["paciente"].",".$_GET["dentista"].",".$_GET["estado"].",".$_GET["especialidad"].",".$_GET["motivo"].")";

	try{
	     if(mysqli_query($conn,$sql))
	     $response["respuesta"] = true;
	 else{
        echo mysqli_error($conn);
        $response["respuesta"] = false;

        }
 

	}catch(PDOException $e){
		echo $e->getMessage();
            $response["respuesta"] = false;

	}
            return json_encode($response);

    }

    
    public function update() {
        $conn = $GLOBALS['conn'];
///        echo $_GET["fecha_cita"];
        $id_usr=12;
        
        $sql = "update agenda set FECHA = '".$_GET["fecha_cita_b"]."', HORA_INICIO = ".$_GET["hora_ini_b"].", HORA_FIN=".$_GET["hora_fin_b"].", ID_PACIENTE =".$_GET["paciente_b"].", ID_ESTADO_CITA = ".$_GET["estado"].", ID_ESPECIALIDAD =".$_GET["especialidad_b"].", ID_USUARIO_DOCTOR =".$_GET["dentista"].", ID_MOTIVO_ATENCION =".$_GET["motivo"]." WHERE ID_AGENDA = ".$_GET["idAgenda"]." ;";

    try{
         if(mysqli_query($conn,$sql))
         echo "bien";
     else
        echo mysqli_error($conn);

    }catch(PDOException $e){
        echo $e->getMessage();
    }

    }

    public function delete() {
        $conn = $GLOBALS['conn'];
        $id_usr=12;
        $sql = "delete from agenda where ID_AGENDA = ".$_GET["chk1"]." ;";

    try{
         if(mysqli_query($conn,$sql))
         echo "bien";
     else
        echo mysqli_error($conn);

    }catch(PDOException $e){
        echo $e->getMessage();
    }

    }





}

?>