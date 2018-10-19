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

    public function modificarUsuario($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->modificarUsuario();
    }

    public function insertUsuarios($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->insertar();
    }

    public function consultaUsuario($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->consultaUsuario();
    }

    public function eliminarUsuario($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->eliminarUsuario();
    }

    public function consultaTipoUsuarios($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->consulta_tipo_usuario();
    }

    public function consultaSucursales($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->consulta_catalogo_sucursales();
    }

    public function consultaPerfiles($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->consulta_catalogo_perfiles();
    }

    public function consultaUsuarios($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->search();
    }    


//Jafet <-- 
public function consultaAgenda($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->search();

    }    
    public function consultaDentistaAgendar($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->consultaDentista();
    }   
    public function consultaEstadoAgendar($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->consultaEstado();
    }   

    public function consultaHorarioAgendar($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->consultaHorario();
    }    

    public function consultaPacienteAgendar($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->consultaPaciente();
    }    
    public function consultaEspecialidadAgendar($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->consultaEspecialidad();
    }   

    public function consultaMotivoAtencionAgendar($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->consultaMotivoAtencion();
    }
    
    public function insertAgenda($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->insert();
    }    

    public function updateAgenda($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->update();
    }   

    public function deleteAgenda($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->delete();
    }
// -->




    
}


?>