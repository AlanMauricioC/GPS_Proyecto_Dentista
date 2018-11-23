<?php

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
       
        return $usuarios->insert();
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
    
    public function consultaPermisos($request, $response, $args) {
        
        $usuarios = new Usuarios();
       
        return $usuarios->consultaPermisosP();
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
    
    public function citaRepetida($request, $response, $args) {
        
        $agenda=new Agenda();

        return $agenda->citaRepetida();
    }    

    public function imprimirCita($request, $response, $args) {
        
        $cita=new imprimirCita();

        return $cita->generarPDF();
    }

    public function imprimirAgendaMensual($request, $response, $args) {
        
        $agenda=new imprimirAgendaMensual();

        return $agenda->generarPDF();
    }    

    public function imprimirAgendaSemanal($request, $response, $args) {
        
        $agenda=new imprimirAgendaSemanal();

        return $agenda->generarPDF();
    }
    
    public function imprimirAgendaDiaria($request, $response, $args) {
        
        $agenda=new imprimirAgendaDiaria();

        return $agenda->generarPDF();
    }
    
    public function insertComentario($request, $response, $args) {
        
        $comentario=new Comentario();

        return $comentario->insert();
    }

    public function selectComentario($request, $response, $args) {
        
        $comentario=new Comentario();

        return $comentario->select();
    }
    
    public function deleteComentario($request, $response, $args) {
        
        $comentario=new Comentario();

        return $comentario->delete();
    }  

   public function pacientesAtendidos($request, $response, $args) {
        
        $reporte=new Reporte();

        return $reporte->pacientesAtendidos();
    }
// -->




    
}


?>