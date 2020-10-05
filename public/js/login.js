$(function(){
    $('#submit').click(function(e){
        e.preventDefault();
        $.ajax({
            url : '/auth/login',
            type : 'POST',
            data : {
                email : $('#inputEmail').val(),
                password : $('#inputPassword').val()
            },
            dataType : "text",
            success : function(data){
                if(data == "1"){
                    // login success
                    location.href="/";
                } else if(data == "2"){
                    // check email
                    $("#inputEmail").addClass("is-invalid");
                    $("#inputEmailValid").text("이메일을 확인해주세요.");
                    $('#spinner').removeClass('spinner-border spinner-border-sm');
                } else if(data == "3") {
                    //check password
                    $("#inputPassword").addClass("is-invalid");
                    $("#inputPasswordValid").text("비밀번호를 확인해주세요.");
                    $('#spinner').removeClass('spinner-border spinner-border-sm');
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
    });
});

$(document).ready(function(e){
    $("#inputEmail").on("keyup", function(){
        $("#inputEmail").removeClass("is-invalid");
        $("#inputEmailValid").empty;
    });
    $("#inputPassword").on("keyup", function(){
        $("#inputPassword").removeClass("is-invalid");
        $("#inputPasswordValid").empty;
    });
});