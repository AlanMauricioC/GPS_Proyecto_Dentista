<?php
require 'DAO/citasDAO.php';

class servicios {
   
    public function getUsuarios($request, $response, $args) {
        $data="hola mundo";

        return json_encode($data);

    }    

     public function ejemploPost($request, $response, $args) {
        
        $post = $request->getParsedBody();
       
		$data["respuesta"] = "Texto enviado por el cliente -> ".$post["cliente"];

        return json_encode($data);
  

    }

 public function consultaAgenda($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->search();

    }    
    
    public function insertAgenda($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->insert();
    }


}

?>