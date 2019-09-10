<?php
header('content-type:text/html;charset=utf-8');
require "conn.php";

// 获取数据
if(isset($_POST['sid'])){
    $sid=$_POST['sid'];
    $result=$conn->query("select * from details where sid='$sid'");
    echo json_encode($result->fetch_assoc());
}
