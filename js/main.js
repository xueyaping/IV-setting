//--------------------获取当前用户信息----------------------- 
function getCurUserInfo(){
    var mObject; 
    mObject = JSON.parse(MainWindow.GetCurUserInfo());
   
    user="<p id='currUsername'>"+"用户："+mObject.user+"</p>";
    time="<p id='curruserPsd'>"+mObject.logintimer+"</p>";
    if(mObject.user=="Gsolar"&&mObject.level==1){ 
      $('a[id="btnCurrEdit"]').hide();
      $("#manageUsers").show();
      role="<p>"+"角色："+"系统管理员"+"</p>";
      getUserList();

    }else{
      $("#manageUsers").hide();
      $('a[id="btnCurrEdit"]').show();
     role="<p>"+"角色："+'普通用户'+"</p>";
    }
    $("#currUser").append(user+role+time)
  }

//--------------------当前为管理员帐户时，生成用户列表-------------
  function getUserList(){
    //{"Gsolar":{"func":"1010000","level":"1"}}
    var userList=JSON.parse(MainWindow.GetUserList());
    keyarr=Object.keys(userList);
    alert("用户数："+keyarr.length);

    //当前登录用户
    var CurrUserInfo = JSON.parse(MainWindow.GetCurUserInfo());    
    currUser=CurrUserInfo.user;
    $("#userList").empty();

    if(currUser=='Gsolar'){
      TH1="<th>"+"选择"+"<th>";
      TH2="<th>"+"用户名"+"<th>";
      TH3= "<th>"+"功能码"+"<th>";
      TH4="<th>"+"权限级别"+"<th>";
      TR="<tr>"+TH1+TH2+TH3+TH4+"</tr>";
      $(TR).appendTo("#userList");

      for(var i=0;i<keyarr.length;i++){
        key=keyarr[i];
        func=userList[key].func;
        level=userList[key].level;
        chkbox="<label>"+"<input name='userSelect' type='checkbox' class=''>"+"</label>";
       
        TD1="<td>"+chkbox+"<td>";
        TD2="<td class='user'>"+key+"<td>";
        TD3="<td class='func'>"+func+"<td>";
        TD4="<td class='level'>"+level+"<td>";
        TR="<tr>"+TD1+TD2+TD3+TD4+"</tr>";
        $(TR).appendTo("#userList") 
       
        }

    }
  }

  //-------------编辑当前用户信息-----------------------
  function editCurrUserInfo(){
    $("#editCurrUser").empty();

     //修改用户信息
    currUserInfo = JSON.parse(MainWindow.GetCurUserInfo());
    currUserVal=currUserInfo.user;
    currPsdVal=currUserInfo.password;
    
    userlabel="<label  class='col-sm-2 control-label'>"+"用户："+"</label>";
    psdlabel="<label  class='col-sm-2 control-label'>"+"密码："+"</label>";
    userInput="<input name='userModify' class='form-control ' type='text' placeholder="+currUserVal+">"
    psdInput="<input name='psdModify' class='form-control ' type='text'>"
    userDiv = userlabel+"<div class='col-sm-6'>"+userInput+"</div>";
    psdDiv=psdlabel+"<div class='col-sm-6'>"+psdInput+"</div>";
    
    $("#editCurrUser").append("<div class='form-group'>"+userDiv+"</div>");
    $("#editCurrUser").append("<div class='form-group'>"+psdDiv+"</div>");
    $("#currUserEditDiv ").show();
    $('a[id="btnCurrEdit"]').hide();
    $('a[id=btnCurrSave]').show();
    var userModify;
    //对象 {user:xxx,password:xxx,level:xxx,func:xxx}
    MainWindow.ModifyUser(JSON.stringify(userModify));
 
  }
//-------------------------获取编辑后的用户信息，提交发送-------------------------
  function userInfoSave(){//
    var userInfo={};
    userVal=$("#creatUserDiv input[name=userModify]").val();
    psdVal=$("#creatUserDiv input[name=psdModify]").val();
    
    userInfo={user:userVal,password:psdVal,level:'0',func:'0'}
   alert(userInfo.user+","+userInfo.password+","+userInfo.level+","+userInfo.func)
    //{user:xxx,password:xxx,level:xxx,func:xxx}
    sendObj= MainWindow.AddUser(JSON.stringify(userInfo));//,发送参数为对象
    if(sendObj==1){
      alert("修改成功！");
      $("#editCurrUserDiv").hide()
      $('a[id=btnCurrSave]').hide()
    }else{
      alert('未做修改！')
    }
   
  
  }

   //--------------------------复制用户--------------------------
   function userClone(){//获取所选用户属性，作为默认值创建在信息表中
    var userList=JSON.parse(MainWindow.GetUserList());
    keyarr=Object.keys(userList);
    keylen=parseInt(keyarr.length+1);

    userChecked=$('input[type=checkbox]:checked');
    if(userChecked.length!==1){
        alert('请选择一个用户进行复制，并且只能选择一个')
      }else{
        alert('已选择!');
        var arrayContent = [];

        var trData=$(userChecked).parents("tr");
            usertd=trData.find(".user").text();
            functd=trData.find(".func").text();
            leveltd=trData.find(".level").text();
         alert(usertd+functd+leveltd);
         $("#userList").hide();
         $("#creatUserDiv").show();
          userVal=$("#creatUserDiv input[name=user]").val(usertd+'_'+keylen);
          psdVal=$("#creatUserDiv input[name=password]").val('000');
        
    }
  }
//-------------------------用户信息提交（新增,复制）,发送到数据库-----------------------
function AddUser(){
    var userInfo={};
    userVal=$("#creatUserDiv input[name=user]").val();
    psdVal=$("#creatUserDiv input[name=password]").val();
    userInfo={user:userVal,password:psdVal,level:'0',func:'0'}
   alert(userInfo.user+","+userInfo.password+","+userInfo.level+","+userInfo.func);
    //{user:xxx,password:xxx,level:xxx,func:xxx}
    sendObj= MainWindow.AddUser(JSON.stringify(userInfo));//,发送参数为对象
    if(sendObj==1){
      alert("创建成功！");
      $("#userList").show();
    }
    $("#creatUserDiv").hide() 
}

//-------------------------用户密码重置-----------
  function restePassword(){
    chkbox=$('input[type=checkbox]');
    userChecked=$('input[type=checkbox]:checked');
    if(userChecked.length!==1){
        alert('请选择一个用户进行操作，并且只能选择一个')
      }else{
        alert('已选择!');
        var arrayContent = [];
        var trData=$(userChecked).parents("tr");
            userTxt=trData.find(".user").text();
            funcTxt=trData.find(".func").text();
            levelTxt=trData.find(".level").text();
         alert(userTxt+funcTxt+levelTxt);
        //{user:xxx,password:xxx,level:xxx,func:xxx}
        var userModifuUser={};
        userModifuUser={user:userTxt,password:'000',level:levelTxt,func:funcTxt};
        sendObj= MainWindow.ModifyUser(JSON.stringify(userModifuUser));//,发送参数为对象
       
        if(sendObj==1){
          alert("密码已重置！")
        }
      }
  }

  function deleteUser(){//移除指定用户
    userChecked=$('input[type=checkbox]:checked');
    if(userChecked.length!==1){
        alert('请选择一个用户进行操作，并且只能选择一个')
      }else{
        alert('已选择!');
        var arrayContent = [];
        var trData=$(userChecked).parents("tr");
            userTxt=trData.find(".user").text();
            funcTxt=trData.find(".func").text();
            levelTxt=trData.find(".level").text();
            alert(userTxt+funcTxt+levelTxt);
      var userdel=userTxt;
      //userdel={user:userTxt,password:xxx,level:levelTxt,func:funcTxt}
      delStr=MainWindow.DelUser(userTxt)//,参数为字符串
      if(delStr==1){
        alert('用户已被移除');
        getUserList()//更新用户列表
      }
    }
  }

  function loadSetPage(){
    $("#setPage").load('warning-new.html')
  }
  //-------------侧边栏菜单切换-----------------------
  function g(o){return document.getElementById(o);}
  function HoverLi(m,n,counter){
    for(var i=1;i<=counter;i++){
        g('tab_'+m+i).className='';
        g('tabs_'+m+i).className='undis';
    }
    g('tabs_'+m+n).className='dis';
    g('tab_'+m+n).className='on';
    
  }


  $(function(){
    getCurUserInfo();
    $('a[id="btnCurrEdit"]').click(function(){//编辑按钮
      editCurrUserInfo();
    })
    $('a[id="btnCancel"]').click(function(){//编辑按钮
      $('#currUserEditDiv').hide()
    })
    $('a[id=btnCurrSave]').click(function(){//当前用户信息编辑后提交
      userInfoSave();
    })
    $('#btnAdd').click(function(){//新增按钮
      $('#creatUserDiv').show();//点击新增显示表单
      $("#creatUserDiv input").val('');
      $("#creatUserDiv input").val('');
      $('#userListDiv').hide();
    })
    $('#btnBack').click(function(){//取消按钮
      $('#userList').show();
      $('#userListDiv').show();
      $('#creatUserDiv').hide();
    })
  $('#btnCreatOK').click(function(){//新增信息提交按钮
      AddUser();
      getUserList();
      $('#userListDiv').show();
    })
    
    $('#btnClone').click(function(){//复制用户
      userClone();
    })
    $('#btnResetPsd').click(function(){//重置密码
      restePassword()
    })
    $('#btnDelet').click(function(){//移除用户
      deleteUser()
    }) 
    
  })