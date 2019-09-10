<?php
header('content-type:text/html;charset=utf-8');
require "conn.php";

//判断手机号是否存在
if(isset($_POST['checkphone'])){
    $checkphone=$_POST['checkphone'];
    $result=$conn->query("select * from register where phonenum='$checkphone'");
    if($result->fetch_assoc()){
        echo true;
    }
    else{
        echo false;
    }
}


if(isset($_POST['submit'])){
    $phone=$_POST['phone'];
    $password=$_POST['password'];
    $conn->query("insert register values(null,'$phone','$password',NOW())");
    //php的跳转  跳转到登录页面
    header('location:http://10.31.157.56/JS-1907/project1/dist/html/login.html');
}

