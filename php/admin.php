<?php 



include 'database.php';


$action = $_GET['action'];
switch($action){
	case 'getCode':
		getCode();
		break;
	case 'getVal':
		getVal();
		break;
	case 'register':
		register();
		break;
	case 'login':
		login();
		break;

}



function  getCode(){
if (!session_id()) 
	{
	session_start();
	$code = $_SESSION['code'];
	// echo  json_encode($code);
	echo $code;
	}

	
}
function  register(){
//引入数据库链接
global  $conn;

$name = trim($_POST['name']);
$pwd = md5(trim($_POST['passwd']));



$sql_sel = "select * from  admin where name = '$name'";

$result_sel = mysqli_query($conn,$sql_sel);

$num = mysqli_num_rows($result_sel);


if($num){
	echo  "you";	
}else{
	 $sql = "INSERT INTO `admin`(`name`, `passwd`) VALUES ('$name','$pwd')";
$result = mysqli_query($conn,$sql);

if($result){
		echo "ok";
	}else{
		echo "false";
	}
	}
}

function  login(){
	global  $conn;
	 $name = trim($_POST['name']);
	$paswd =md5(trim($_POST['passwd']));

	$sql = "select * from admin  where name = '$name'  and passwd ='$paswd' ";

	$result = mysqli_query($conn,$sql);

	$num = mysqli_num_rows($result);

	if($num){
		echo "ok";
	}else{
		echo "false";
	}



 	// $_SESSION['name'] = $name;
	//loginVal();
}

function  getVal(){

	// if(isset($_SESSION['admin'])){
	// 	echo "ok";
	// }else{
	// 	echo "false";
	// }
if( $logVal == "succ"){
	echo "ok";
}else{
	echo "false";
}

}