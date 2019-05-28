<?php
$con = mysql_connect("localhost","root","");
$db =mysql_select_db("Skyhunter",$con);
$sql = "SELECT * FROM Results ORDER BY Stars DESC LIMIT 5 ";
$results = mysql_query($sql,$con);
$i =1;
while ($line = mysql_fetch_object($results))
{
    echo "<tr>
            <td>$i</td>
            <td>$line->Name</td>
            <td>$line->Stars</td>
            <td>$line->Time</td>
        </tr>";
        $i++;
}
?>