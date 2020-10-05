<?php
    include "db.php";

    session_start();

    $name = $_POST['nickname'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "UPDATE member_tb SET name = '{$name}', password = '{$password}' WHERE email = '{$_SESSION['email']}'";
    if(mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo mysqli_error($connection);
    }
?>
