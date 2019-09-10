<?php
header('content-type:text/html;charset=utf-8');
require "conn.php";

//

    if(isset($_POST['phonenum'])&&isset($_POST['password'])){
        $phonenum=$_POST['phonenum'];
        $password=$_POST['password'];
    
        $result=$conn->query("select * from register where phonenum='$phonenum' and password='$password'");
    
        if($result->fetch_assoc()){
            echo true;
        }
        else{
            echo false;
        }
    }
