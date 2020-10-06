$(document).ready(function(e){
    var c = [0, 0, 0]
    $('#register').click(function(e){
        e.preventDefault();

        if(c[0] == 0){
            $("#inputEmail").focus();
            $('#spinner').removeClass('spinner-border spinner-border-sm')
        } else if(c[1] == 0){
            $("#inputPassword").focus();
            $('#spinner').removeClass('spinner-border spinner-border-sm')
        } else if(c[2] == 0){
            $("#inputConfirm").focus();
            $('#spinner').removeClass('spinner-border spinner-border-sm')
        } else {
            $.ajax({
                url : "register.php",
                type : "POST",
                data : {
                    email : $("#inputEmail").val(),
                    password : $("#inputPassword").val(),
                    nickname : $("#inputNickname").val()
                },
                dataType : "text",
                success : function(data){
                    if(data == "1"){
                        // login success
                        location.href="index.php";
                    } else {
                        // error
                        alert("이 알림이 계속되면 개발자에게 연락주세요.\n" + data);
                    }
                },
                error : function(jqXHR, textStatus, errorThrown){
                    // error
                    alert("이 알림이 계속되면 개발자에게 연락주세요.\najax error : " + textStatus + "\n" + errorThrown);
                }
            });
        }
    });

    $('#modify').click(function(e){
        e.preventDefault();

        if(c[1] == 0){
            $("#inputPassword").focus();
            $('#spinner').removeClass('spinner-border spinner-border-sm')
        } else if(c[2] == 0){
            $("#inputConfirm").focus();
            $('#spinner').removeClass('spinner-border spinner-border-sm')
        } else {
            $.ajax({
                url : "modify.php",
                type : "POST",
                data : {
                    password : $("#inputPassword").val(),
                    nickname : $("#inputNickname").val()
                },
                dataType : "text",
                success : function(data){
                    if(data == "1"){
                        alert("정보 수정이 완료되었습니다.");
                        // login success
                        location.href="index.php";
                    } else {
                        // error
                        alert("이 알림이 계속되면 개발자에게 연락주세요.\n" + data);
                    }
                },
                error : function(jqXHR, textStatus, errorThrown){
                    // error
                    alert("이 알림이 계속되면 개발자에게 연락주세요.\najax error : " + textStatus + "\n" + errorThrown);
                }
            });
        }
    });

    $("#inputEmail").keyup(function(){
        email = $("#inputEmail").val();
        if(email == "" || email.search("@") == -1){
            $("#inputEmail").removeClass("is-valid");
            $("#inputEmail").removeClass("is-invalid");
        } else {
            $.post(
                "checkemail.php",
                { email : email },
                function(data){
                    if(data == "1"){
                        $("#inputEmail").addClass("is-valid");
                        $("#inputEmailValid").addClass("valid-feedback");
                        $("#inputEmail").removeClass("is-invalid");
                        $("#inputEmailValid").removeClass("invalid-feedback");
                        $("#inputEmailValid").text("사용 가능한 이메일입니다.");
                        c[0] = 1;
                    } else if(data == "2") {
                        $("#inputEmail").addClass("is-invalid");
                        $("#inputEmailValid").addClass("invalid-feedback");
                        $("#inputEmail").removeClass("is-valid");
                        $("#inputEmailValid").removeClass("valid-feedback");
                        $("#inputEmailValid").text("이미 사용중인 이메일입니다.");
                        c[0] = 0;
                    } else {
                        alert("오류가 발생했습니다. 이 알림이 지속되면 개발자에게 연락주세요.");
                        c[0] = 0;
                    }
                }
            );
        }

    });

    $("#inputPassword").keyup(function(){
        var password = $("#inputPassword").val();
        var num = password.search(/[0-9]/g);
        var eng = password.search(/[a-z]/ig);
        var spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if(password == ""){
            $("#inputPassword").removeClass("is-invalid");
        } else {
            if(password.length < 8 || password.length > 20){
                $("#inputPassword").addClass("is-invalid");
                $("#inputPasswordValid").addClass("invalid-feedback");
                $("#inputPassword").removeClass("is-valid");
                $("#inputPasswordValid").removeClass("valid-feedback");
                $("#inputPasswordValid").text("8 ~ 20자리 이내로 입력해주세요.");
                c[1] = 0;
            } else if(password.search(/\s/) != -1){
                $("#inputPassword").addClass("is-invalid");
                $("#inputPasswordValid").addClass("invalid-feedback");
                $("#inputPassword").removeClass("is-valid");
                $("#inputPasswordValid").removeClass("valid-feedback");
                $("#inputPasswordValid").text("비밀번호는 공백 없이 입력해주세요.");
                c[1] = 0;
            } else if((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)){
                $("#inputPassword").addClass("is-invalid");
                $("#inputPasswordValid").addClass("invalid-feedback");
                $("#inputPassword").removeClass("is-valid");
                $("#inputPasswordValid").removeClass("valid-feedback");
                $("#inputPasswordValid").text("영문, 숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
                c[1] = 0;
            } else {
                $("#inputPassword").addClass("is-valid");
                $("#inputPasswordValid").addClass("valid-feedback");
                $("#inputPassword").removeClass("is-invalid");
                $("#inputPasswordValid").removeClass("invalid-feedback");
                $("#inputPasswordValid").text("좋습니다!");
                c[1] = 1;
            }
        }
    });

    $("#inputConfirm").keyup(function(){
        var password = $("#inputPassword").val();
        var confirm = $("#inputConfirm").val();

        if(confirm == ""){
            $("#inputConfirm").removeClass("is-invalid");
        } else {
            if(confirm == password){
                $("#inputConfirm").addClass("is-valid");
                $("#inputConfirmValid").addClass("valid-feedback");
                $("#inputConfirm").removeClass("is-invalid");
                $("#inputConfirmValid").removeClass("invalid-feedback");
                $("#inputConfirmValid").text("일치합니다!");
                c[2] = 1;
            } else {
                $("#inputConfirm").addClass("is-invalid");
                $("#inputConfirmValid").addClass("invalid-feedback");
                $("#inputConfirm").removeClass("is-valid");
                $("#inputConfirmValid").removeClass("valid-feedback");
                $("#inputConfirmValid").text("비밀번호가 일치하지 않습니다.");
                c[2] = 0;
            }
        }
    });
});
