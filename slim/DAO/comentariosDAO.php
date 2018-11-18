<?php



class Comentario {

    public function insert() {
        $conn = $GLOBALS['conn'];
        $sql = "update agenda set COMENTARIO = '".$_GET["comentario"]."' WHERE ID_AGENDA = '".$_GET["id_agenda"]."' ";

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

    public function select() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select COMENTARIO from agenda WHERE ID_AGENDA = '".$_GET["id_agenda"]."' ");

        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["COMENTARIO"] = utf8_decode($registro["COMENTARIO"]);
            $i++;
        }

        return json_encode($array);

    }

    

    
  



}

?>