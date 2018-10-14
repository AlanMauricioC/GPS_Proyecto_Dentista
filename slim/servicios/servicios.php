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
//Jafet <-- 
public function consultaAgenda($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->search();

    }    
    public function consultaDentistaAgendar($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->consultaDentista();
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
    
    public function insertAgenda($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->insert();
    }
// -->




    
}


?>