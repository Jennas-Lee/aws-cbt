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
        <div class="container">
            <?php
                if(isset($_SESSION['email'])){
                    echo '<a class="btn btn-outline-success my-2 my-sm-0" href="logout.php">먼저 로그아웃하십시오!</a>';
                } else {
            ?>
                <form method="post" action="register.php">
                    <h3 class="text-center">Sign Up</h3>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-3 col-form-label">이메일</label>
                        <div class="col-sm-9">
                            <input type="email" name="email" class="form-control" id="inputEmail" placeholder="Email" required autofocus>
                            <div class=""id="inputEmailValid"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">비밀번호</label>
                        <div class="col-sm-9">
                            <input type="password" name="password" minlength="8" maxlength="20" class="form-control" id="inputPassword" placeholder="Password" required>
                            <div class=""id="inputPasswordValid"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputConfirm" class="col-sm-3 col-form-label">비밀번호 확인</label>
                        <div class="col-sm-9">
                            <input type="password" name="confirm" minlength="8" maxlength="20" class="form-control" id="inputConfirm" placeholder="Confirm Password" required>
                            <div class=""id="inputConfirmValid"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputNick" class="col-sm-3 col-form-label">닉네임</label>
                        <div class="col-sm-9">
                            <input type="text" name="nickname" class="form-control" id="inputNickname" placeholder="Nickname" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-3">동의</div>
                        <div class="col-sm-9">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree" required>
                                <label class="form-check-label" for="agree">
                                    정보 제공에 동의해주세요.
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" id="register" class="btn btn-primary" onclick="$('#spinner').addClass('spinner-border spinner-border-sm');">
                            <span id="spinner" class="text-light" role="status" aria-hidden="true"></span>
                            Sign Up
                        </button>
                    </div>
                    <script src="register.js"></script>
                </form>
            <?php
                }
            ?>
        </div>
    </main>
</body>
</html>
