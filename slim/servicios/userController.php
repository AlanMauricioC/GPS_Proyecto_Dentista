<?php
require 'DAO/usuariosDAO.php';
class userController {
   
    public function getUsuarios($request, $response, $args) {
        $usuarios=new Usuarios();
        return $usuarios->search();
    }    

     public function insertUsuarios($request, $response, $args) {
        
        $post = $request->getParsedBody();       
        $usuarios=new Usuarios();
        return $usuarios->insert($post["ID_USUARIO"],$post["ID_TIPODEUSUARIO"],$post["NOMBRE"],$post["APELLIDOS"],
            $post["USUARIO"],$post["CLAVE"],$post["ID_PERFIL"],$post["SUCURSAL"],$post["ES_DENTISTA"],$post["ESTADO"],
            $post["RFC"],$post["NUM_CEL"],$post["NUM_TEL"],$post["ID_PERMISOS"]);

    }
}

?>