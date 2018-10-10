<?php
require 'DAO/usuariosDAO.php';
class userController {
   
    public function getUsuarios($request, $response, $args) {
        $usuarios=new Usuarios();
        return $usuarios->search();

        return json_encode($data);

    }    

     public function ejemploPost($request, $response, $args) {
        
        $post = $request->getParsedBody();
       
		$data["respuesta"] = "Texto enviado por el cliente -> ".$post["cliente"];

        return json_encode($data);
  

    }
}

?>