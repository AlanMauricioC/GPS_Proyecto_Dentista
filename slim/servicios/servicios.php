<?php

class servicios {
   
    public function ejemploGet($request, $response, $args) {

        //$get = $request->getQueryParams();
        
        $data["respuesta"] = "Soy el servicio web ejemploGet";

        return json_encode($data);

    }    

    public function ejemploConsulta($request, $response, $args) {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from agenda");

        return json_encode($res);

    }

     public function ejemploPost($request, $response, $args) {
        
        $post = $request->getParsedBody();
       
		$data["respuesta"] = "Texto enviado por el cliente -> ".$post["cliente"];

        return json_encode($data);
  

    }
}

?>