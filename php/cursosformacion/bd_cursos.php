<?php
	require_once("../lib/bd_api_pdo.php");
	
	class bd_cursos extends BD_API {
		public function analiza_method() {
			if (($this->key=='0') && ($this->method=="GET") && ($this->table!="cursoformacion")) { // lo hemos llamado con otro metodo
				$func=$this->table; // nombre de la funcion a la que llamo de esta clase,  en table guardo el nombre del metodo
				$this->$func();
			} else {
				$this->table="cursoformacion";
			    $this->execStandardMethod();
			}	
		}
		
		private function findCursoFormacionFilter() {
				$curso=( isset($_REQUEST['curso'])?'%'.$_REQUEST['curso'].'%':NULL);
				$id=( isset($_REQUEST['id'])?$_REQUEST['id']:NULL);
				$ejercicio=( isset($_REQUEST['anyo'])?$_REQUEST['anyo']:NULL);
				$fdesde=( isset($_REQUEST['fdesde'])?$_REQUEST['fdesde']:NULL);
				$fhasta=( isset($_REQUEST['fhasta'])?$_REQUEST['fhasta']:NULL);

				$sql = "select * from cursoformacion cursosformacion where  " .
				    " id is not null " .
					($curso != NULL ? " AND (nombre like :curso)  " : "") .
					($id != NULL ? " AND (id = :id)  " : "") .
					($ejercicio != NULL ? " AND (anyoPlanFormacion = :ejercicio)  " : "") .
					($fdesde != NULL ? " AND (FechaInicio >= :fdesde)  " : "") .
					($fhasta != NULL ? " AND (FechaFin <= :fhasta)  " : "") 
					;
	
				$sql .= " ORDER BY nombre"; 
 
				$stmt = ($this->link)->prepare($sql);
				if (strpos($sql, ':curso') !== false) $stmt->bindParam(':curso',  $curso);
				if (strpos($sql, ':id') !== false) $stmt->bindParam(':id',  $id);
				if (strpos($sql, ':ejercicio') !== false) $stmt->bindParam(':ejercicio',  $ejercicio);
				if (strpos($sql, ':fdesde') !== false) $stmt->bindParam(':fdesde',  $fdesde);
				if (strpos($sql, ':fhasta') !== false) $stmt->bindParam(':fhasta',  $fhasta);
				 
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
	}
	
	// Initiiate Library
	
	$api = new bd_cursos();
	$api->analiza_method();
?>