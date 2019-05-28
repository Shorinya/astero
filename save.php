<?php
$name =$_POST['Name'];
$stars =$_POST['Stars'];
$Time =$_POST['Time'];
$con = mysql_connect("localhost","root","");
$db =mysql_select_db("Skyhunter",$con);
$sql = "INSERT INTO Results (Name,Stars,Time) VALUES ('$name',$stars,'$Time')";
$results = mysql_query($sql,$con);
echo mysql_affected_rows();
?>