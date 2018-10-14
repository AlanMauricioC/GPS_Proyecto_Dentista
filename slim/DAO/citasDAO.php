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

    public function consultaHorario() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_horario_dentista where ID_USUARIO =".$_GET["dentista"].";");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["HORA_INICIO"] = $registro["HORA_INICIO"];
            $array[$i]["HORA_TERMINO"] = $registro["HORA_TERMINO"];
            $array[$i]["DESCANSO"] = $registro["DESCANSO"];
            $array[$i]["INICIO_DESCANSO"] = $registro["INICIO_DESCANSO"];
            $array[$i]["TERMINO_DESCANSO"] = $registro["TERMINO_DESCANSO"];

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


    public function search() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from agenda");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["FECHA"] = utf8_decode($registro["FECHA"]);
            $array[$i]["ID_USUARIO"] = utf8_decode($registro["ID_USUARIO"]);
            $array[$i]["HORA_INICIO"] = utf8_decode($registro["HORA_INICIO"]);
            $array[$i]["HORA_FIN"] = utf8_decode($registro["HORA_FIN"]);
            $array[$i]["ID_PACIENTE"] = utf8_decode($registro["ID_PACIENTE"]);
            $array[$i]["ID_USUARIO_DOCTOR"] = utf8_decode($registro["ID_USUARIO_DOCTOR"]);
            $array[$i]["ID_ESTADO_CITA"] = utf8_decode($registro["ID_ESTADO_CITA"]);
            $array[$i]["ID_ESPECIALIDAD"] = utf8_decode($registro["ID_ESPECIALIDAD"]);
            $array[$i]["ID_MOTIVO_ATENCION"] = utf8_decode($registro["ID_MOTIVO_ATENCION"]);
            $array[$i]["ID_AGENDA"] = utf8_decode($registro["ID_AGENDA"]);
    
            $i++;
        }


        return json_encode($array);

    }


    public function insert() {
        $conn = $GLOBALS['conn'];
///        echo $_GET["fecha_cita"];
        $id_usr=12;
        $_GET["estado"]=1;
        
        $sql = "insert into agenda (FECHA,ID_USUARIO,HORA_INICIO,HORA_FIN,ID_PACIENTE,ID_USUARIO_DOCTOR,ID_ESTADO_CITA,ID_ESPECIALIDAD,ID_MOTIVO_ATENCION) values ('".$_GET["fecha_cita"]."',".$id_usr.",".$_GET["hora_ini"].",".$_GET["hora_fin"].",".$_GET["paciente"].",".$_GET["dentista"].",".$_GET["estado"].",".$_GET["especialidad"].",".$_GET["comentarios"].")";
      //  $sql2 = "insert into agenda values (1241,10,11,'Jafet','Juan Pérez',12,2,23,3,2018-1-1);";

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