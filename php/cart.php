<?php  
	header('content-type:text/html;charset=utf-8');
	require "conn.php";
	
    $result=$conn->query("select * from details");
    $arrdata=array();
    for($i=0;$i<$result->num_rows;$i++){
        $arrdata[$i]=$result->fetch_assoc();
    }
    
    echo json_encode($arrdata);

?>