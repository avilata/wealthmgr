<?php
//JV. API para hacer consultas especificas que no se puedan hacer con el API generica lib/bd_api.php
// la URL debe tener el formato:  path/bd_suscritos.php/{operacion}/  , ejem: php/lib/bd_suscritos.php/findSuscritosFilter/

	require_once("../lib/bd_api_pdo.php");
 
	class bd_attachs extends BD_API {
		protected $target_dir = "/wealthmgr/uploads/"; // poner /privado/uploads/ para webempresa. habrá que poner el directorio donde queremos qeu se guarden los adjuntos
		
		public function analiza_method() {
			if ($this->table!="attachments") { // lo hemos llamado con otro metodo
				$func=$this->table; // nombre de la funcion a la que llamo de esta clase
				$this->$func();
			} else {
				$this->table="attachments";
				if  ($this->method=="DELETE")  $this->borrarArchivo();
			    $this->execStandardMethod();
			}	
		}
		
		/*
		*	metodos llamables desde analiza_method 
		*/
		private function borrarArchivo() {
				$sql = "select * from attachments where id=:id"; 
				$stmt = ($this->link)->prepare($sql);
				$stmt->bindParam(':id',  $this->key);
				try {
					if  ($stmt->execute()) {
						$result= $stmt->fetchAll(PDO::FETCH_ASSOC);
						if (file_exists($result[0]['nombreObjeto'])) unlink($result[0]['nombreObjeto']);
					}
				}
				catch ( PDOException $Exception)  {
					die( $Exception->getMessage( )  );
					
				}		
		
		}
		
		private function findAttachFilter() {
			if ($this->key!=0) {
				$this->table="attachments";
			    $this->execStandardMethod();
			} else {
				$code=$_REQUEST['code'];
				$type=$_REQUEST['type'];
				$sql = "select * from attachments where tipoObjeto=:type and idObjeto=:code"; 
				$stmt = ($this->link)->prepare($sql);
				$stmt->bindParam(':type',  $type);
				$stmt->bindParam(':code',  $code);
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
		
		
		private  function addAttachment() {
				$this->guardarFichero();
		}

		private function attachDownload() {
				$sql = "select * from attachments where id=:id"; 
				$stmt = ($this->link)->prepare($sql);
				$stmt->bindParam(':id',  $this->key);
				try {
					if  ($stmt->execute()) {
						$result= $stmt->fetchAll(PDO::FETCH_ASSOC);
						if (file_exists($result[0]['nombreObjeto'])) {
							$file_url = $result[0]['nombreObjeto'];
							header('Content-Type: application/octet-stream');
							header("Content-Transfer-Encoding: Binary"); 
							header("Content-disposition: attachment; filename=\"" . basename($file_url) . "\""); 
							readfile($file_url); 
						};
					}
				}
				catch ( PDOException $Exception)  {
					die( $Exception->getMessage( )  );
					
				}		
		}
		
		/*
		* metodos propios de esta clase 
		*/
		private function guardarFichero() {
				$dirbase=$_SERVER['DOCUMENT_ROOT'].$this->target_dir.$_REQUEST['type'].'/'.$_REQUEST['code'];
				if (!file_exists($dirbase))  mkdir($dirbase);
				$target_file = $dirbase .'/'. basename($_FILES["file"]["name"]);
				$uploadOk = 1;
				$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
				// Check if image file is a actual image or fake image
				if (filesize($_FILES["file"]["tmp_name"])==0) {
					echo "{'failure':'Sorry, your file was not uploaded.'}";
				// if everything is ok, try to upload file
				} else {
					if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
						echo "{'success': 'The file ". basename( $_FILES["file"]["name"]). " has been uploaded.'}";
						$this->guardarBD($target_file);
					} else {
						echo "{'failure':'Sorry, there was an error uploading your file.'";
					}
				}
		}
		
		private function guardarBD($target_file) {
				$sql = "insert into attachments set tipoObjeto=:type, idObjeto=:code, nombreObjeto=:nombreObjeto, asunto=:asunto, fecha=:fecha, tipoAdjunto=:tipoAdjunto, user=:user, ts=:ts"; 
				$stmt = ($this->link)->prepare($sql);
				$date=date('Y-m-d H:i:s');
				$user='jvil';// poner el usuario logado
				$stmt->bindParam(':type',  $_REQUEST['type']);
				$stmt->bindParam(':code',  $_REQUEST['code']);
				$stmt->bindParam(':nombreObjeto',  $target_file);
				$stmt->bindParam(':asunto',  $_REQUEST['asunto']);
				$stmt->bindParam(':fecha',  $date);
				$stmt->bindParam(':tipoAdjunto',  $_REQUEST['tipoAdjunto']);
				$stmt->bindParam(':user',  $user); 
				$stmt->bindParam(':ts', $date);
				try {
					$stmt->execute() ;
				}
				catch ( PDOException $Exception)  {
					die( $Exception->getMessage( )  );
					
				}		
		}
		
		
	}
	
	// Initiiate Library
	
	$api = new bd_attachs();
	$api->analiza_method();

?>
