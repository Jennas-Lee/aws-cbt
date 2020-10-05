<?php
    include "db.php";

    session_start();
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

    <style>
        * {
            font-family: 'Noto Sans KR', sans-serif;
        }
    </style>

    <title>AWS CBT</title>
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a class="navbar-brand" href="index.php">AWS CBT</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="solvepage.php">문제 풀기</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="solvelog.php">이력 확인</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="addproblem.php">문제 등록</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="introduce.php">이용 안내</a>
                    </li>
                    <?php
                        if(isset($_SESSION['email'])){
                            echo '<li class="nav-item active">
                                <a class="nav-link" href="modifypage.php">정보수정</a>
                            </li>';
                        }
                    ?>
                </ul>
                <?php
                    if(isset($_SESSION['email'])){
                        echo '<a class="btn btn-outline-success my-2 my-sm-0" href="logout.php">로그아웃</a>';
                    } else {
                        echo '<a class="btn btn-outline-success my-2 my-sm-0" href="loginpage.php">로그인</a>';
                    }
                ?>
            </div>
        </nav>
    </header>
    <main role="main">
        <div class="container mt-2">
            <div class="jumbotron text-center">
                <h1 class="display-4">AWS Certification CBT</h1>
                <p class="lead">AWS Certification을 합격하기 위해 만든 CBT 서비스입니다.</p>
                <hr class="my-4">
                <a class="btn btn-primary btn-lg" href="solvepage.php">문제 풀기</a>
                <a class="btn btn-primary btn-lg" href="solvelog.php">이력 확인</a>
            </div>
        </div>
        <div class="container">
            <div class="card">
                <h5 class="card-header">
                    최근 푼 문제
                </h5>
                <div class="card-body">
                    <h6 class="card-title">
                        <?php
                            if(isset($_SESSION['email'])){
                                $sql = "SELECT solve_time, q_data FROM solvelog_tb WHERE email = '{$_SESSION['email']}' ORDER BY solve_time DESC LIMIT 1";
                                $result = mysqli_query($conn, $sql);
                                $row = mysqli_fetch_array($result);
                                if($row == NULL){
                                    echo '최근에 푼 문제가 존재하지 않습니다.';
                                } else {
                                    $score = json_decode($row['q_data'], true);
                                    echo $row['solve_time'].'</h6>';    // 최근 푼 문제의 날짜
                                    // echo "string";                      문제 정답수 출력, json 처리 필요
                                }
                            } else {
                                echo '<a href="loginpage.php">먼저 로그인해주세요!</a></h6>';
                            }
                        ?>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
