<?php
class PDF3 extends FPDF{
                function Header()
                {
                    $this->SetFont('Arial','B',15   );
                    $this->Cell(0,0,'Cita',0,0,'C');
                    $this->Ln(10);
                    
                }
                function Footer()
                {
                    $this->SetY(-10);
                    $this->SetFont('Arial','I',8);
                    $this->Cell(0,0,utf8_decode('Página '.$this->PageNo()."/{nb}"),0,0,'C');
                    
                }
                function Body($array)
                {
                    $this->SetFont('Times','',20);

                    $this->Image('servicios/pdf/icon.png',null,null,-800);
                    for($i=0;$i<count($array);$i++ ){ 
                    $this->Ln(5);
                    $this->Cell(30,7,"ID Cita: ".utf8_decode($array[$i]["ID_AGENDA"]),0,1); 
                    $this->Ln(20);
                    $this->Cell(0,0,"Fecha: ".utf8_decode($array[$i]["FECHA"]),0,1);
                    $this->Ln(10);
                    $this->Cell(0,0,"Paciente: ".utf8_decode($array[$i]["NOMBRE"]." ".$array[$i]["APELLIDOS"]),0,1);
                    $this->Ln(10);                    
                    $this->Cell(0,0,"Dentista: ".utf8_decode($array[$i]["NOMBRE_DENTISTA"]." ".$array[$i]["APELLIDOS_DENTISTA"]),0,1);
                    $this->Ln(10);
                    $this->Cell(0,0,"Hora de inicio: ".utf8_decode($array[$i]["HORA_INICIO"]).":00",0,1);
                    $this->Ln(10);
                    $this->Cell(0,0,"Hora de fin: ".utf8_decode($array[$i]["HORA_FIN"]).":00",0,1);
                    $this->Ln(10);
                    $this->Cell(0,0,"Estado: ".utf8_decode($array[$i]["DESCRIPCION_E"]),0,1);
                    $this->Ln(10);
                    $this->Cell(0,0,"Motivo: ".utf8_decode($array[$i]["DESCRIPCION_M"]),0,1);
                    $this->Ln(10);
                    
                    if($i%2 != 0)
                        $this->AddPage(); 
                    }  

                    //ancho celdas, interlineado, texto, borde, orientación L, C, R o J, true o false con fondo
                }
            
}

class imprimirAgendaSemanal
{

  public function generarPDF()
  {
            $pdf = new PDF3();
            $pdf->AliasNbPages();
            $pdf->AddPage();

            

            $conn = $GLOBALS['conn'];
            $res = $conn -> query("select ID_AGENDA,FECHA,HORA_INICIO,HORA_FIN,p.NOMBRE as NOMBRE,p.APELLIDOS as APELLIDOS,e.DESCRIPCION as DESCRIPCION_E,m.DESCRIPCION as DESCRIPCION_M, u.NOMBRE as NOMBRE_DENTISTA, u.APELLIDOS as APELLIDOS_DENTISTA from 
                                agenda a inner join tabla_pacientes p on a.ID_PACIENTE = p.ID_PACIENTE 
                                inner join catalogo_motivo_atencion m on a.ID_MOTIVO_ATENCION = m.ID_MOTIVO_ATENCION
                                inner join catalogo_estado_de_cita e on a.ID_ESTADO_CITA = e.ID_ESTADO_CITA 
                                inner join usuario u on u.ID_USUARIO = a.ID_USUARIO_DOCTOR
                                WHERE 
                                ID_USUARIO_DOCTOR =".$_GET['dentista']." AND FECHA between '".$_GET['primer_dia']."' AND '".$_GET['ultimo_dia']."';");

            //select * from agenda where FECHA between ('2018-11-04' AND '2018-11-10')
            $array = array();
            $i=0;
            while ($registro = $res->fetch_array()) {
                $array[$i]["ID_AGENDA"] = utf8_decode($registro["ID_AGENDA"]);
                $array[$i]["FECHA"] = utf8_decode($registro["FECHA"]);
                $array[$i]["HORA_INICIO"] = utf8_decode($registro["HORA_INICIO"]);
                $array[$i]["HORA_FIN"] = utf8_decode($registro["HORA_FIN"]);
                $array[$i]["NOMBRE"] = utf8_decode($registro["NOMBRE"]);
                $array[$i]["APELLIDOS"] = utf8_decode($registro["APELLIDOS"]);
                $array[$i]["DESCRIPCION_E"] = utf8_decode($registro["DESCRIPCION_E"]);
                $array[$i]["DESCRIPCION_M"] = utf8_decode($registro["DESCRIPCION_M"]);
                $array[$i]["NOMBRE_DENTISTA"] = utf8_decode($registro["NOMBRE_DENTISTA"]);
                $array[$i]["APELLIDOS_DENTISTA"] = utf8_decode($registro["APELLIDOS_DENTISTA"]);


                $i++;
            }



            $pdf->Body($array);






            $ruta_pdf = "servicios/pdf/generados/agendaSemanal.pdf";
            //I ver, D descargar y F guardar en archivo local
            $pdf->Output($ruta_pdf,'F');
            if( file_exists($ruta_pdf) )
            {
                $response = $ruta_pdf;
            }else
                $response = false; 
            echo json_encode($response);


  }
}




?>
