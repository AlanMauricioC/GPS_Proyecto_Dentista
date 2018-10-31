<?php
require('fpdf181/fpdf.php');


class ImprimirHorario
{

  public function generarPDF($data)
  {
    $direccion='servicios/pdf/generados/horario'.$data['Nombre']["data"][0][0].'.pdf';
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial','B',16);
    $pdf->Ln();
    $pdf->Image('servicios/pdf/icon.png',null,null,-800);
    $pdf->Cell(40,10,utf8_decode("Horario de: ".$data['Nombre']["data"][0][2]).' '.utf8_decode($data['Nombre']["data"][0][3])); //nombre del dentista
      $pdf->Ln();
    $header = array("Dia","Inicio","Fin","¿Descanso?","Inicio","Fin","Box");
    $data=$data["data"];


    $pdf=$this->ImprovedTable($header,$data,$pdf);

    $pdf->Output($direccion,"F");
    return array('Status' =>"OK",'direccion' =>$direccion );
  }

  public function ImprovedTable($header, $data,$pdf)
  {
    // Column widths
    $w = array(25, 23, 23, 35,27, 27,25);
    // Header
    for($i=0;$i<count($header);$i++)
        $pdf->Cell($w[$i],7,utf8_decode($header[$i]),'LTR',0,'C');
        //$pdf->MultiCell($w[$i],6,utf8_decode($header[$i]),0,1,'L',0);
    $pdf->Ln();
    $pdf->Cell($w[0],7,utf8_decode(""),'LBR',0,'C');
    $pdf->Cell($w[1],7,utf8_decode("horario"),'LBR',0,'C');
    $pdf->Cell($w[2],7,utf8_decode("horario"),'LBR',0,'C');
    $pdf->Cell($w[3],7,utf8_decode(""),'LBR',0,'C');
    $pdf->Cell($w[4],7,utf8_decode("descanso"),'LBR',0,'C');
    $pdf->Cell($w[5],7,utf8_decode("descanso"),'LBR',0,'C');
    $pdf->Cell($w[6],7,utf8_decode("atención"),'LBR',0,'C');
    $pdf->Ln();
    // Data
    $pdf->SetFont('Arial','',14);
    $tmp=array();
    foreach($data as $row)
    {
      switch ($row["DIA"]) {
        case 'LU':
          $tmp[0]=$row;
          $tmp[0]["DIA"]="Lunes";
          break;
        case 'MA':
          $tmp[1]=$row;
          $tmp[1]["DIA"]="Martes";
          break;
        case 'MI':
          $tmp[2]=$row;
          $tmp[2]["DIA"]="Miercoles";
          break;
        case 'JU':
          $tmp[3]=$row;
          $tmp[3]["DIA"]="Jueves";
          break;
        case 'VI':
          $tmp[4]=$row;
          $tmp[4]["DIA"]="Viernes";
          break;
        case 'SA':
          $tmp[5]=$row;
          $tmp[5]["DIA"]="Sabado";
          break;
        case 'DO':
          $tmp[6]=$row;
          $tmp[6]["DIA"]="Domingo";
            break;
        default:
          $tmp[7]=$row;
          break;
      }

    }
    $data=$tmp;
    for($i=0;$i<count($data);$i++)
    {
        $pdf->Cell($w[0],6,$data[$i]["DIA"],'LR');
        $pdf->Cell($w[1],6,$data[$i]["HORA_INICIO"].":00",'LR');
        $pdf->Cell($w[2],6,$data[$i]["HORA_TERMINO"].":00",'LR');
        $pdf->Cell($w[3],6,($data[$i]["DESCANSO"]==1)?'si':'no',0,0,'C');
        $pdf->Cell($w[4],6,$data[$i]["INICIO_DESCANSO"].":00",'LR');
        $pdf->Cell($w[5],6,$data[$i]["TERMINO_DESCANSO"].":00",'LR');
        $pdf->Cell($w[6],6,$data[$i]["BOX_ATENCION"],'LR');
        $pdf->Ln();
    }

    // Closing line
    $pdf->Cell(array_sum($w),0,'','T');
    return $pdf;
  }

}




?>
