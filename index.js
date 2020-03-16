$(function(){
    var $user=$('#user'),
        $tel=$('#tel'),
        $pwd=$('#pwd'),
        $btn1=$('.btn'),
        $data1=$('#span1'),
        $data2=$('#span2'),
        $data3=$('#span3'),
        $data4=$('#span4'),
        $msg=$('#msg'),
        $btn2=$('.btn2');
    $btn2.click(function(){
        if(!checkUser()||!checkTel()||!checkPwd()) return;
        alert('注册成功！');
    });
    $user.focusout(function(){
        checkUser();
    });
    $tel.focusout(function(){
        checkTel();
    });
    $pwd.focusout(function(){
        checkPwd();
    });
    var timer;
    $btn1.click(function(){
        $data4.html('');
        if(checkTel()){
            clearTimeout(timer);
            var num=30;
            $btn1.val('重新获取（30）');
            $btn1.attr('disabled','disabled');
            var timer1=setInterval(function(){
                num--;
                $btn1.val('重新获取（'+num+')');
                if(num===0){
                    clearInterval(timer1);
                    $btn1.val('获取验证码');
                    $btn1.removeAttr('disabled');
                    if($msg.val()===''){
                        $data4.html('请求超时，请稍后再试');
                    }
                }else{
                    $btn1.val('重新获取（'+num+')');
                }
            },1000);
        }
        else{
            timer=setTimeout(function(){
            if($msg.val()===''){
                $data4.html('请求超时，请稍后再试');
                clearTimeout(timer);
                return false;
            }
            },30000);
        }
    })
    function checkUser(){
        if($user.val()===''){
            $data1.html('用户名不能为空！');
            return false;
        }
        if(/[^\u4E00-\u9FA5\w]/.test($user.val())){
            $data1.html('用户名仅支持中英文、数字和下划线,且不能为纯数字');
            return false;
        }
        if(!(/\D/.test($user.val()))){
            $data1.html('用户名仅支持中英文、数字和下划线,且不能为纯数字');
            return false;
        }
        var len=0;
        var name=$user.val();
        for(var i=0;i<name.length;i++){
            if(/[\u4E00-\u9FA5]/.test(name[i])){
                len+=2;
            }else{
                len+=1;
            }
            if(len>14){
                break;
            }
        }
        if(len>14){
            $data1.html('用户名不能超过7个汉字或14个字符');
            return false;
        }
        $data1.html(' ');
        return true;
    }
    function checkTel(){
        if($tel.val()===''){
            $data2.html('请输入手机号码');
            return false;
        }
        if(!(/^1[0-9]{10}$/.test($tel.val()))){
            $data2.html('手机号码格式不正确');
            return false;
        }
        $data2.html(' ');
        return true;
    }
    function checkPwd(){
        if($pwd.val()===''){
            $data3.html('密码设置不符合要求');
            return false;
        }
        if(!(/(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{8,14}$/.test($pwd.val()))){
            $data3.html('密码设置不符合要求');
            return false;
        }
        $data3.html(' ');
        return true;
    }

});