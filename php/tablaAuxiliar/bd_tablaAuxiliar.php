<?php
	require_once("../lib/bd_api_pdo.php");
	
	class bd_tablaAuxiliar extends BD_API {
		public function analiza_method() {
			if ((($this->method=="GET")||($this->method=="POST")) && ($this->table!="tablaauxiliar")) { // lo hemos llamado con otro metodo
				$func=$this->table; // nombre de la funcion a la que llamo de esta clase,  en table guardo el nombre del metodo
				$this->$func();
			} else {
				$this->table="tablaauxiliar";
			    $this->execStandardMethod();
			}	
		}
		
		private function findTablaAuxFilter() {
				$codTabla=( isset($_REQUEST['codTabla'])?$_REQUEST['codTabla']:NULL);
				$id=( isset($_REQUEST['id'])?$_REQUEST['id']:NULL);
				$codElemento=( isset($_REQUEST['codElemento'])?$_REQUEST['codElemento']:NULL);

				$sql = "select * from tablaauxiliar where  " .
				    " id is not null " .
					($codTabla != NULL ? " AND (codTabla = :codTabla)  " : "") .
					($id != NULL ? " AND (id = :id)  " : "") .
					($codElemento != NULL ? " AND (codElemento = :codElemento)  " : "") 
					;
	
				$sql .= " ORDER BY codElemento"; 
 
				$stmt = ($this->link)->prepare($sql);
				if (strpos($sql, ':codTabla') !== false) $stmt->bindParam(':codTabla',  $codTabla);
				if (strpos($sql, ':id') !== false) $stmt->bindParam(':id',  $id);
				if (strpos($sql, ':codElemento') !== false) $stmt->bindParam(':codElemento',  $codElemento);
				 
				try {
					if  ($stmt->execute()) {
						$result= $stmt->fetchAll(PDO::FETCH_ASSOC);
						$this->devolverResultados($result);
					}
				}
				catch ( PDOException $Exception)  {
					die( $Exception->getMessage( )  );
					
				}
		}
		
		private function guardarBD() {
				$sql = "insert into tablaauxiliar set codTabla=:codTabla, codElemento=:codElemento, valor1=:valor1"; 
				$stmt = ($this->link)->prepare($sql);
				$stmt->bindParam(':codTabla',  $_REQUEST['codTabla']);
				$stmt->bindParam(':codElemento',  $_REQUEST['codElemento']);
				$stmt->bindParam(':valor1',  $_REQUEST['valor1']);
				try {
					$stmt->execute() ;
				}
				catch ( PDOException $Exception)  {
					die( $Exception->getMessage( )  );
					
				}		
		}
	}
	
	// Initiiate Library
	
	$api = new bd_tablaAuxiliar();
	$api->analiza_method();
?>