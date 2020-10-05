<?php
    include "db.php";

    session_start();

    $email = $_POST['email'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM member_tb WHERE email='{$email}'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);

    if($row != NULL) {
        $hash = $row['password'];
        if(password_verify($password, $hash)) {
            $_SESSION['email'] = $email;
            echo "1";
        } else {
            echo "3";
        }
    } else {
        echo "2";
    }
?>
