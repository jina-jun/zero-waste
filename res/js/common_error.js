$(function(){
    $('#naver_id_login').append('<p>Naver</p>');
    // search bar - focused
    $('.search_inp').focus(function(){
        $('.placeholder').css('display', 'none');
        $('header').addClass('active');
        $('.dropdown').css('display', 'block');
        selTags();
        // add recent
        $('.search_bar button').click(function(){
            addRecent();
            $('#ui-id-1').css('display', 'none');
        });
        $('.search_inp').keyup(function(e){
            if(e.keyCode === 13){
                addRecent();
                $('#ui-id-1').css('display', 'none');
            }
            if(e.keyCode === 27){
                inpBlur();
            }
        });
        $('header').click(function(){
            $('.search_inp').focus();
        });
        // delete all tags
        delAllTags();
    });
    // searh matching
    var list = [
        '제로', '제로웨이스트', '제로페이', '제로콜라', '제로플라스틱', '플라스틱', '플라스틱프리',
        '재사용', '용기내', '분리배출', '리사이클링', '재활용', '업사이클링', '리필', '리필스테이션', '리폼'
    ]
    $('.search_inp').autocomplete({
        source: list
    });
    // search bar - unfocused
    $('section').click(function(){
        inpBlur();
    });
    // modal login
    $('.btn_login').click(function(){
        $('.modal_login').css('display', 'block');
    });
    $('.popup .i.close').click(function(){
        $('.modal_login').css('display', 'none');
        location.reload('.modal_login');
    });
    $('.popup input').focus(function(){
        $(this).parent().addClass('active');
    });
    $('.popup input').blur(function(){
        $(this).parent().removeClass('active');
    });
    $('form').submit(function(e){
        e.preventDefault();
        checkInputs();
        if($('#terms2').is(':checked') == false){
            alert("필수 항목에 동의해 주십시오.");
            return false;
        }
    });
    $('.popup input').keyup(checkInputs);
});
function inpBlur(){
    $('.placeholder').css('display', 'block');
        $('header').removeClass('active');
        $('input').val('');
        $('#ui-id-1, .dropdown').css('display', 'none');
        $('.search_inp').blur();
        $('.recent .tag').removeClass('sel b');
        $('.suggest .tag').removeClass('sel');
        $('.recent .tag').addClass('s');
        return;
}
function delAllTags(){
    $('.del_all').click(function(){
        $('.recent .tag').remove();
        $('.search_inp').focus();
    });
}
function addRecent(){
    if($('.search_inp').val() === '') return;
    $('.recent').append(`<span class="tag s">${$('.search_inp').val()}</span>`);
    $('.search_inp').val('').focus();
    if($('.recent span').length > 5)
        $('.recent span:first-child').remove();
    $('.recent .tag').removeClass('sel b');
    $('.suggest .tag').removeClass('sel');
    $('.recent .tag').addClass('s');
    selTags();
};
function selTags(){
    $('.dropdown .tag').mouseenter(function(){
        $(this).addClass('hover');
    })
    $('.dropdown .tag').on('mouseleave click', function(){
        $(this).removeClass('hover');
    })
    $('.dropdown .tag').on('click mouseup', function(){
        const inputText = $(this).text();
        if($(this).parent().hasClass('recent')){
            $('.search_inp').val(inputText);
            $('.search_inp').focus();
            $('.suggest .tag').removeClass('sel');
            $('.recent .tag').removeClass('sel b');
            $('.recent .tag').addClass('s');
            $(this).toggleClass('s');
        } else if($(this).parent().hasClass('suggest')){
            $('.search_inp').val(inputText.substr(1));
            $('.search_inp').focus();
            $('.recent .tag').removeClass('sel b');
            $('.recent .tag').addClass('s');
            $('.suggest .tag').removeClass('sel');
            $(this).toggleClass('b');
        }
        $(this).toggleClass('sel b');
    });
};
function checkInputs(){
    const email = $('#email');
    const userName = $('#user_name');
    const pass = $('#pass');
    const chkPass = $('#chk_pass');
    const emailVal = $('#email').val();
    const userNameVal = $('#user_name').val();
    const passVal = $('#pass').val();
    const chkPassVal = $('#chk_pass').val();

    if(emailVal === ''){
        // show error
        // add error class
        setErrorFor(email, '이메일 주소를 입력해 주십시오.');
    } else if(!isEmail(emailVal)){
        setErrorFor(email, '이메일 형식에 맞게 입력해 주십시오.');
        $('form button').addClass('g');
        $('form button').removeClass('b');  
        $('form button a').attr('href','#');
    } else {
        setSuccessFor(email);
        $('form button').removeClass('g');
        $('form button').addClass('b');
        $('#btnCheckEmail a').attr('href','javascript:clickBtnCheckEmail()');
    }
    if(userNameVal === ''){
        setErrorFor(userName, '이름을 입력해 주십시오.');
    } else {
        setSuccessFor(userName);
    }
    if(passVal === ''){
        setErrorFor(pass, '암호를 입력해 주십시오.');
    } else {
        setSuccessFor(pass);
    } 
    if(chkPassVal === ''){
        setErrorFor(chkPass, '암호를 확인해 주십시오.');
    } else if(passVal !== chkPassVal) {
        setErrorFor(chkPass, '암호가 일치하지 않습니다.');
    } else {
        setSuccessFor(chkPass);
    }
}
function setErrorFor(input, message){
    const txtField = input.parent();
    const msgError = input.next();
    // add error msg
    msgError.text(message);
    // add error class
    txtField.addClass('error');
}
function setSuccessFor(input){
    const txtField = input.parent();
    const msgError = input.next();
    txtField.removeClass('error');
    msgError.remove();
}
function isEmail(email) {
    var pattern = /[!@#$%^&*()_\+\=\-\[\]\"\']/
    return  pattern .test(email);
}
function clickBtnCheckEmail() {
    const emailVal = $('#email').val();
    const userEmail = emailVal;
    $('.msg_spt').remove();
    $('form').prev().html(`<p class="tit">로그인</p>
    <div class="appr_email">
        <p class="label">이메일 주소</p>
        <p class="user_email" style="font-size:16px;">${userEmail}<span class="i small appr"></span></p>
    </div>`);
    $('form').html(`
    <fieldset>
        <div class="txt_field">
            <label for="pass">암호</label>
            <input type="password" name="pass" id="pass">
            <p class="msg_error"></p>
        </div>
    </fieldset>
    <button class="btn g r id="btnCheckPass""><a href="#">계속</a></button>`);
    const pass = $('#pass');
    const passVal = $('#pass').val();
    $('.popup input').keyup(function(){
        if(passVal === ''){
            setErrorFor(pass, '암호를 입력해 주십시오.');
            $('form button a').attr('href','#');
        } else {
            setSuccessFor(pass);
            $('form button').removeClass('g');
            $('form button').addClass('b');
            $('#btnCheckPass a').attr('href','javascript:clickBtnCheckPass()');
        } 
    });
    console.log(userEmail);
}
function clickBtnCheckPass() {
    $('.modal_login').css('display', 'none');
    $('.btn_login').remove();
    $('.wrap_thumb_user').css('display', 'block');
    $('.wrap_thumb_user').prepend(`<button class="thumb_user">U</button>`);
    $('.thumb_user').click(function(){
        $('.thumb_dropdown').css('display','block');
    });
}
function modalLogin(){
    $('.popup').html(`<span class="i close"></span>
    <p class="tit">로그인</p>   
    <p class="msg_spt">신규 사용자이신가요?<a href="javascript:modalCreateAccount()">계정 만들기</a></p>
    <form action="#" method="post">
        <fieldset>
            <div class="txt_field">
                <label for="email">이메일 주소</label>
                <input type="email" name="email" id="email">
                <p class="msg_error"></p>
            </div>
        </fieldset>
        <button class="btn g r"id="btnCheckEmail"><a href="#">계속</a></button>
    </form>
    <div class="social_login">
        <p>간편 로그인</p>
        <div class="btn w">
            <img src="/res/img/icon/google.png" alt="">
            <p>Google</p>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
        <a href="javascript:kakaoLogin();"><button id="login_kakao">Kakao</button></a>
        <div class="btn w">
            <img src="/res/img/icon/naver.png" alt="">
            <button id="naver_id_login"></button>
        </div>
    </div>
    <div class="privacy">
        <a href="#">개인정보처리방침</a>
    </div>`);
}
function modalCreateAccount(){
    $('.popup').html(`<span class="i close"></span>
    <p class="tit">계정 만들기</p>
    <p class="msg_spt">이미 계정이 있으십니까?<a href="javascript:modalLogin()">로그인</a></p>
    <form action="#" method="post">
        <fieldset>
            <div class="txt_field">
                <label for="email">이메일 주소</label>
                <input type="email" name="email" id="email">
                <p class="msg_error"></p>
            </div>
            <div class="txt_field">
                <label for="user_name">이름</label>
                <input type="text" name="user_name" id="user_name">
                <p class="msg_error"></p>
            </div>
            <div class="txt_field">
                <label for="pass">암호</label>
                <input type="password" name="pass" id="pass">
                <p class="msg_error"></p>
            </div>
            <div class="txt_field">
                <label for="chk_pass">암호 확인</label>
                <input type="password" name="chk_pass" id="chk_pass">
                <p class="msg_error"></p>
            </div>
        </fieldset>
        <div class="chkUp_terms">
            <div class="terms_item">
                <input type="checkbox" name="terms1" id="terms1">
                <label for="terms1">(선택) 이메일 수신에 동의합니다.</label>
            </div>
            <div class="terms_item">
                <input type="checkbox" name="terms2" id="terms2">
                <label for="terms2">(필수) <a href="">사용 약관</a> 및 <a href="">개인정보보호 정책</a>을 읽었으며 이에 동의합니다.</label>
            </div>
        </div>
        <button class="btn g f">계정 만들기</button>
    </form>`);
    $('.popup .i.close').click(function(){
        $('.modal_login').css('display', 'none');
        location.reload('.modal_login');
    });
    $('.popup input').focus(function(){
        $(this).parent().addClass('active');
        checkInputs();
    });
    $('.popup input').blur(function(){
        $(this).parent().removeClass('active');
    });
    $('.popup input').submit(function(e){
        e.preventDefault();
        checkInputs();
        if($('#terms2').is(':checked') == false){
            alert("필수 항목에 동의해 주십시오.");
            return false;
        }
    });
}
function preparing() {
    alert('준비 중입니다.');
}