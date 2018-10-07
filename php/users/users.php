<?php
 require_once("../bd_properties.php");
 
/*
 * PHP-Auth (https://github.com/delight-im/PHP-Auth)
 * Copyright (c) delight.im (https://www.delight.im/)
 * Licensed under the MIT License (https://opensource.org/licenses/MIT)
 */



require __DIR__.'/../lib/auth/autoload.php';
class IdentityServer { 
		public $auth = NULL;
		protected $input=NULL;
		
       public function __construct(){
			$db = new PDO("mysql:host=".DB_SERVER.";dbname=".DB.";charset=utf8", DB_USER, DB_PASSWORD);

			$this->auth = new \Delight\Auth\Auth($db);
			
			$this->input = json_decode(file_get_contents('php://input'),true);

		}
		
		public function procesa() {

			if ($_POST['action'] === 'login') {
					$rememberDuration = null;
				try {
					$this->auth->login($_POST['email'], $_POST['password'], $rememberDuration); //$rememberDuration = (int) (60 * 60 * 24 * 365.25); // si queremos que dure un año
					$email=$this->auth->getEmail();
					$username=$this->auth->getUsername();
					echo  "{'success':'ok','data':{'email':'$email','login':'$username'}}";
				}
				catch (\Delight\Auth\InvalidEmailException $e) {
					echo  "{'failure':'wrong email address'}";
				}
				catch (\Delight\Auth\InvalidPasswordException $e) {
					echo  "{'failure': 'wrong password'}";
				}
				catch (\Delight\Auth\EmailNotVerifiedException $e) {
					echo  "{'failure': 'email not verified'}";
				}
				catch (\Delight\Auth\TooManyRequestsException $e) {
					echo  "{'failure': 'too many requests'}";
				}
			} else if ($_POST['action'] === 'registrar') {
			    try {
					$this->auth->register($_POST['email'], $_POST['password'], $_POST['username']);
					$username=$_POST['username'];
					$email=$_POST['email'];
					echo  "{'success':'ok','data':{'email':'$email','login':'$username'}}";
				}
				catch (\Delight\Auth\InvalidEmailException $e) {
					echo  "{'failure':  'invalid email address'}";
				}
				catch (\Delight\Auth\InvalidPasswordException $e) {
					echo  "{'failure':  'invalid password'}";
				}
				catch (\Delight\Auth\UserAlreadyExistsException $e) {
					echo  "{'failure':  'user already exists'}";
				}
				catch (\Delight\Auth\TooManyRequestsException $e) {
					echo  "{'failure':  'too many requests'}";
				}
			} else if ($_POST['action'] === 'reset') {
				try {
					$this->auth->forgotPassword($_POST['email'], function ($selector, $token) {
						$this->auth->resetPassword($selector, $token, $_POST['password']);
					});
					echo  "{'success':'ok','data':{'email':'','login':''}}";
				}
				catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
					echo  "{'failure':  'invalid token'}";
				}
				catch (\Delight\Auth\TokenExpiredException $e) {
					echo  "{'failure':  'token expired'}";
				}
				catch (\Delight\Auth\InvalidPasswordException $e) {
					echo  "{'failure':  'invalid password'}";
				}
				catch (\Delight\Auth\TooManyRequestsException $e) {
					echo  "{'failure':  'too many requests'}";
				}
			}
		}
	}
	if (isset($_POST['action'])) {
		$idserver=new IdentityServer();
		$idserver->procesa();
	}
?>