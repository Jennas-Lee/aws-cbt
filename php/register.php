<?php
    include "db.php";

    $email = $_POST['email'];
    $name = $_POST['nickname'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO member_tb VALUES('{$email}', '{$name}', '{$password}')";
    if(mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo mysqli_error($connection);
    }
?>
