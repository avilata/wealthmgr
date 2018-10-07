<?php
	require_once("../lib/bd_api_pdo.php");
	
	class bd_users extends BD_API {
		public function analiza_method() {
			if (($this->key=='0') && ($this->method=="GET") &&($this->table!="users")) { // lo hemos llamado con otro metodo
				$func=$this->table; // nombre de la funcion a la que llamo de esta clase,  en table guardo el nombre del metodo
				$this->$func();
			} else {
				$this->table="users";
			    $this->execStandardMethod();
			}	
		}
		
		private function findUsersFilter() {
				$email=( isset($_REQUEST['email'])?'%'.$_REQUEST['email'].'%':NULL);
				$id=( isset($_REQUEST['id'])?$_REQUEST['id']:NULL);
				$username=( isset($_REQUEST['username'])?$_REQUEST['username']:NULL);

				$sql = "select * from users where  " .
				    " id is not null " .
					($email != NULL ? " AND (email like :email)  " : "") .
					($id != NULL ? " AND (id = :id)  " : "") .
					($username != NULL ? " AND (username = :username)  " : "") 
					;
	
				$sql .= " ORDER BY email"; 
 
				$stmt = ($this->link)->prepare($sql);
				if (strpos($sql, ':email') !== false) $stmt->bindParam(':email',  $email);
				if (strpos($sql, ':id') !== false) $stmt->bindParam(':id',  $id);
				if (strpos($sql, ':username') !== false) $stmt->bindParam(':username',  $username);
				 
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
	
	$api = new bd_users();
	$api->analiza_method();
?>