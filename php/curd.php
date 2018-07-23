<?php 
include "database.php";
$action = $_GET['action'];

switch($action){
	case 'add':
		add();
	break;
	case 'show':
		show();
	break;
	case 'delete':
		delete();
	break;
	case 'edit':
		edit();
	break;
}

function  add(){
	global  $conn;
	$ip = ip2long($_SERVER['REMOTE_ADDR']);
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$addr = $_POST['addr'];
	$job = $_POST['job'];
	$time = time();

	$sql = "INSERT INTO `mou`( `name`, `phone`, `address`, `job`, `time`, `ip`) VALUES ('$name','$phone','$addr','$job',$time,'$ip')";
	$result = mysqli_query($conn,$sql);
	//获取最后插入的id
	$id = mysqli_insert_id($conn);
	$data = [];
	if($result){
		$data['d0'] = $id;
		$data['d1'] = long2ip($ip);
		$data['d2'] = date('Y-m-d  H:i:s',$time);
		//转换为json格式
		echo json_encode($data);
	}else{
		echo "false";
	}
}

function  show(){
	global  $conn;
	$sql = "SELECT * FROM  mou";
	$result = mysqli_query($conn,$sql);
	$num = mysqli_num_rows($result);
	//$data = [];
	if($result || $num = mysqli_num_rows($result)){
		
		while($row = mysqli_fetch_assoc($result)){
			$data[] = $row;
		}

		echo json_encode($data);
	}	
 }

 function  delete(){
 	global $conn;
 	$id = $_POST['did'];

 	$sql = "DELETE  FROM  mou  WHERE  id=".$id;

 	$result  = mysqli_query($conn,$sql);

 	if($result){
 		echo "ok";
 	}else{
 		echo "false";
 	}
 }

 function edit(){
 	global  $conn;
 	$id = $_POST['id'];
 	$name =  $_POST['name'];
 	$phone =  $_POST['phone'];
 	$addr =  $_POST['addr'];
 	$job =  $_POST['job'];

 	$time = time();
 	$ip = ip2long($_SERVER['REMOTE_ADDR']);
 	$sql = "UPDATE mou SET name='$name',phone='$phone',address='$addr',job='$job',time='$time',ip='$ip' WHERE id = '$id' ";
 	$data = [];
 	$data['d0'] = $time;
 	$data['d1'] = $ip;
 	$result = mysqli_query($conn,$sql);
 	
 	if($result){
 		echo json_encode($data);
 	}else{
 		echo "false";
 	}
 }

 ?>