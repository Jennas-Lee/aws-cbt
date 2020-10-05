<?php
    include "db.php";

    $email = $_POST['email'];
    $sql = "SELECT * FROM member_tb WHERE email = '{$email}' LIMIT 1";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);

    if($row == NULL){
        echo "1";
    } else {
        echo "2";
    }

?>
