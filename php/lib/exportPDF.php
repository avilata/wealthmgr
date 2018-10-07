<?php
	require_once("bd_api_pdo.php");
	require('fpdf/fpdf.php');
	
	class exportPDF  extends BD_API { 

		protected function  execStandardMethod() {
			$sql=$_REQUEST['SQL'];			
			$this->ExecSql($sql);
		}
		protected function devolverResultados($result) {
			$filename = $_REQUEST['nompdf']; // File Name
			$pdf = new FPDF();
			$pdf->AddPage();
			$pdf->SetFont('Arial','B',8);		
			foreach(range(0, ($this->stmt)->columnCount() - 1) as $column_index)
			{
				$column_heading[] = ($this->stmt)->getColumnMeta($column_index);
				$len=$column_heading[$column_index]['len']*2;
				if ($len>50) $len=50;
				$pdf->Cell($len,12,$column_heading[$column_index]['name'],1);
			}			
				
					
			foreach($result as $row) {
				$pdf->SetFont('Arial','',8);	
				$pdf->Ln();
				$i=0;
				foreach($row as $column_index => $column_value) {
					$len=$column_heading[$i]['len']*2;
					if ($len>50) $len=50;
					$pdf->Cell($len,12,$column_value,1);
					$i=$i+1;
				}
			}
			
			$pdf->Output('D',$filename);
		}
	}		
	// Initiiate Library
	
	$api = new exportPDF();
	$api->analiza_method();
?>