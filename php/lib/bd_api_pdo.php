<?php
//JV. metodo copiado de: https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/
// Permite hacer operaciones CRUD sobre una tabla con la sintaxis: 
// la URL debe tener el formato:  path/bd_tabla.php/{table}/{id}  , ejem: php/lib/bd_api.php/suscripcioncurso/
//  donde bd_tabla.php debe extender el objeto BD_API,ejemplo:
/*	require_once("../lib/bd_api.php");
	
	class bd_cursos extends BD_API {
	
	}
	
	// Initiiate Library
	
	$api = new bd_cursos();
	$api->analiza_method();
*/

 require_once("../bd_properties.php"); // constantes BD
  require_once("../users/users.php");  // autorizacion 
  
class BD_API  { 
		protected $method="";
		protected $input=NULL;
		protected $link=NULL;
		protected $table="";
		protected $key="";
		protected $stmt=NULL;
		
       public function __construct(){
	   
			$idserver = new IdentityServer();
			if (!$idserver->auth->check()) {
				header('HTTP/1.1 500 La sesion ha caducado. Debe volver a identificarse');
				die("La sesión ha caducado. Debe volver a identificarse");
			}
	   
  			// connect to the mysql database
			$this->link = new PDO("mysql:host=".DB_SERVER.";dbname=".DB.";charset=utf8", DB_USER, DB_PASSWORD);
			// set the PDO error mode to exception
			($this->link)->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);	
			($this->link)->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			($this->link)->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, false);
			
			// get the HTTP method, path and body of the request
			$this->method = $_SERVER['REQUEST_METHOD'];
			$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
			$this->input = json_decode(file_get_contents('php://input'),true);

			// retrieve the table and key from the path. la URL debe tener el formato:  path/bd_api.php/{table}/{id}  , ejem: php/lib/bd_api.php/suscripcioncurso/
			$this->table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
			$this->key = array_shift($request)+0;
		}
		
		 public function __destruct(){
		 // close mysql connection
		  $this->link=NULL;
		}
	 
		 // metodo para reescribir
		public function analiza_method() {
			$this->execStandardMethod();
		}
		protected function  execStandardMethod() {
			$link=$this->link;
			
			//JV. esto solo lo hago si no es un GET O un DELETE. Basicamente inicializa vble $set="colum1=valor1,column2=valo2, etc.
			if (($this->method!="GET") && ($this->method!="DELETE") ) {
				// escape the columns and values from the input object
				$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($this->input));
				$values = array_map(function ($value) use ($link) {
				  if ($value===null) return null;
				  return $link->quote((string)$value);
				},array_values($this->input));
				// build the SET part of the SQL command
				$set = '';
				for ($i=0;$i<count($columns);$i++) {
				  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
				  if (gettype($this->input[$columns[$i]])=='boolean') 
					if ($values[$i]=='') $valor='0';
					else $valor='1';
				  else $valor=$values[$i];	
				  $set.=($values[$i]===null?'NULL':''.$valor.'');
				}
			 }
		
			$table=$this->table;
			$key=$this->key;
			// create SQL based on HTTP method
			switch ($this->method) {
			  case 'GET':
				$sql = "select * from `$table`".($key?" WHERE id=$key":''); break;
			  case 'PUT':
				$sql = "update `$table` set $set where id=$key"; break;
			  case 'POST':
				$sql = "insert into `$table` set $set"; break;
			  case 'DELETE':
				$sql = "delete from `$table` where id=$key"; break;
			}

			$this->ExecSql($sql);
		}
		
		protected function execSql($sql) {
			// excecute SQL statement
			$result="";
			try {
			     $this->stmt = ($this->link)->prepare($sql);
				if  (($this->stmt)->execute()) {
					if (strpos(strtolower($sql), 'select ') !== false) {$result= ($this->stmt)->fetchAll(PDO::FETCH_ASSOC);} // empieza por SELECT
				}
			}
			catch ( PDOException $Exception)  {
				die( $Exception->getMessage( )  );
			}
	
			$this->devolverResultados($result);
		}
		
		protected function devolverResultados($result) {
			 
			// print results, insert id or affected row count
			if ($this->method == 'GET') {
				echo json_encode($result);
			} elseif ($this->method == 'POST') {
			   $lastId= $this->link->lastInsertId();
			   echo "{id:".$lastId."}";
			} else {
			  echo "{id:".$this->key."}";
			}
		}
}
