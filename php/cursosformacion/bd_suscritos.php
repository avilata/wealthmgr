<?php
//JV. API para hacer consultas especificas que no se puedan hacer con el API generica lib/bd_api.php
// la URL debe tener el formato:  path/bd_suscritos.php/{operacion}/  , ejem: php/lib/bd_suscritos.php/findSuscritosFilter/

	require_once("../lib/bd_api_pdo.php");
 
	class bd_suscritos extends BD_API {
	
		public function analiza_method() {
			if (($this->key=='0') && ($this->method=="GET") && ($this->table!="suscripcioncurso")) { // lo hemos llamado con otro metodo
				$func=$this->table; // nombre de la funcion a la que llamo de esta clase
				$this->$func();
			} else {
				$this->table="suscripcioncurso";
			    $this->execStandardMethod();
			}	
		}
		
		private function findSuscritosFilter() {
				$idCurso=$_REQUEST['idCurso'];
				$sql = "select s.*,p.nombre from suscripcioncurso s,pers_empleados_of p where s.idPersonal=p.id and idCurso=:curso"; 
				$stmt = ($this->link)->prepare($sql);
				$stmt->bindParam(':curso',  $idCurso);
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
	
	$api = new bd_suscritos();
	$api->analiza_method();

?>
