<?php
/**
 * This example shows sending a message using PHP's mail() function.
 */

require 'PHPMailer/PHPMailerAutoload.php';
class SendMail { 
		protected $SMTP_SERVER = "correo.edicom.es";
		protected $FROM_USER="edicom@edicom.es";
		protected $mail=NULL;
		
        public function __construct(){
			//Create a new PHPMailer instance
			$this->mail = new PHPMailer;
			$this->mail->IsSMTP();
			$this->mail->Host = $this->SMTP_SERVER;
			$mail->SMTPSecure = 'tls';
			$this->mail->SMTPAuth = true;
			$this->mail->SMTPKeepAlive = true; // SMTP connection will not close after each email sent, reduces SMTP overhead
			$this->mail->Port = 587;
			//$this->mail->SMTPDebug=2; // solo para depurar
			$this->mail->Username = 'jvilata';
			$this->mail->Password = '--';
			$this->FROM_USER=( (isset($_POST['from']) && $_POST['from']!="")?$_POST['from']:$this->FROM_USER);
			$this->mail->setFrom($this->FROM_USER, 'Avapace App');
		}
		
		public function procesa() {
			$to=$_POST['to'];
			$subject=$_POST['subject'];
			$body=$_POST['body'];
			$html=(isset($_POST['html'])?$_POST['html']:"");
			$attach=(isset($_POST['attach'])?$_POST['attach']:"");
			if ($_POST['action'] === 'send') {
				//Set who the message is to be sent to
				$this->mail->addAddress($to);
				//Set the subject line
				$this->mail->Subject = $subject;
				if ($html!="") {
					//Read an HTML message body from an external file, convert referenced images to embedded,
					//convert HTML into a basic plain-text alternative body
					$this->mail->msgHTML(file_get_contents($html), dirname(__FILE__));
				} else $this->mail->msgHTML($body);
				//Replace the plain text body with one created manually
				if ($attach!="") {
					$this->mail->addAttachment($attach);
				}
				//send the message, check for errors
				if (!$this->mail->send()) {
					$error=$this->mail->ErrorInfo;
					echo  "{'success':'ko. $error'}" ;
				} else {
					echo "{'success':'ok'}";
				}

			}
		}
}
		
	if (isset($_POST['action'])) {
		$idserver=new SendMail();
		$idserver->procesa();
	}
?>		
		
