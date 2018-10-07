<?php
	require_once("bd_api_pdo.php");
	class exportExcel  extends BD_API { 

		protected function  execStandardMethod() {
			$sql=$_REQUEST['SQL'];			
			$this->ExecSql($sql);
		}
		protected function devolverResultados($result) {
			$filename = $_REQUEST['nompdf']; // File Name
			// Download file
			header("Content-Disposition: attachment; filename=\"$filename\"");
			header("Content-Type: application/vnd.ms-excel");
			$flag = false;
			foreach ($result as $row) {
				if (!$flag) {
					// display field/column names as first row
					echo implode("\t", array_keys($row)) . "\r\n";
					$flag = true;
				}
				echo implode("\t", array_values($row)) . "\r\n";			
			}
		}
	}		
	// Initiiate Library
	
	$api = new exportExcel();
	$api->analiza_method();
?>