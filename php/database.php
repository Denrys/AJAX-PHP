<?php  
//数据库地址
define("db_host","localhost");
//数据库用户
define("db_user","root");
//数据库密码
define("db_pwd","");
//数据库名字
define("db_name","mou");
//数据库编码
define('DB_CHARSET', 'utf8');

 $conn = mysqli_connect(db_host,db_user,db_pwd);
if(mysqli_error($conn)){
	echo  mysqli_error($conn);
	exit;
}

mysqli_select_db($conn, db_name);
mysqli_set_charset($conn, DB_CHARSET);

?>



