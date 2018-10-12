<?php

class Agenda {
    

    public function search() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from agenda");
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["FECHA"] = $registro["FECHA"];
            $array[$i]["ID_USUARIO"] = $registro["ID_USUARIO"];
            $array[$i]["HORA_INICIO"] = utf8_encode(($registro["HORA_INICIO"]));
            $array[$i]["HORA_FIN"] = utf8_encode(($registro["HORA_FIN"]));
            $array[$i]["ID_PACIENTE"] = utf8_encode(($registro["ID_PACIENTE"]));
            $array[$i]["ID_USUARIO_DOCTOR"] = utf8_encode(($registro["ID_USUARIO_DOCTOR"]));
            $array[$i]["ID_ESTADO_CITA"] = utf8_encode(($registro["ID_ESTADO_CITA"]));
            $array[$i]["ID_ESPECIALIDAD"] = utf8_encode(($registro["ID_ESPECIALIDAD"]));
            $array[$i]["ID_MOTIVO_ATENCION"] = utf8_encode(($registro["ID_MOTIVO_ATENCION"]));
            $array[$i]["ID_AGENDA"] = utf8_encode(($registro["ID_AGENDA"]));
    
            $i++;
        }


        return json_encode($array);

    }
    public function insert() {
        $conn = $GLOBALS['conn'];
       // echo $_GET["fecha_cita"];
        $id_usr=12;
        $_GET["estado"]=1;
        
        $sql = "insert into agenda (FECHA,ID_USUARIO,HORA_INICIO,HORA_FIN,ID_PACIENTE,ID_USUARIO_DOCTOR,ID_ESTADO_CITA,ID_ESPECIALIDAD,ID_MOTIVO_ATENCION) values (".$_GET["fecha_cita"].",".$id_usr.",".$_GET["hora_ini"].",".$_GET["hora_fin"].",".$_GET["paciente"].",".$_GET["doctor"].",".$_GET["estado"].",".$_GET["especialidad"].",".$_GET["comentarios"].")";
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