
$(function(){ 

if($.cookie('loginVal') =="success"){
    $('#alert7').css("marginTop","-60px").show().delay(4000).hide(0);
           //登录注册所在自动隐藏
    $('#form0').hide();

    // //空form显示，为后面加节点做准备
    // $('#form1').show();
    // //创建p1节点
    // var word =$('<p  style="color: white;float:left;line-height:24px;"  id="p1">欢迎你，</p>');
    // //创建p1节点加在了form后面
    // word.appendTo('#form1');

    // //创建p2节点
    // var w = $('<p  style="color: white;float:left;line-height:24px;" id="p2"></p>');
    // var name =  $.cookie("name");

    // //创建p2节点加在了form后面
    // w.appendTo('#form1');

    //  $('#p2').html(name);


    //显现左侧菜单
     $('.list').show();
  }else{
     $(".right").load("login.html");
  }


 //请求数据数据生成表格
    $.get({
      url:"php/curd.php?action=show",
      async:false,
      success:function(data){
       datas = $.parseJSON(data);
      }
    }); //get  end

    for(var i =0;i<datas.length;i++){
      var tr = create_Tr(datas[i]);
      $('.table').append(tr);
    }

    //创建行
    function  create_Tr(data){
      var tr = $('<tr></tr>');
      for(var i in data){
        var td = $("<td></td>");
        if(i=="time"){
          td.html(getMyDate(data[i]));
        }else if(i=="ip"){
          td.html(long2ip(data[i]));
        }
        else{
        td.html(data[i]);
        
      }
      tr.append(td);
   }
   //创建操作td
    var opTd =$("<td></td>");
    var  editBtn = $("<a>编辑&nbsp;</a>");
    editBtn.attr("name","edit")
    editBtn.attr("dataid",data['id']);

    var delBtn = $("<a>&nbsp;删除</a>");
    delBtn.attr("dataid",data['id']);
     delBtn.attr("name","delete");

    opTd.append(editBtn);
    opTd.append(delBtn);

    tr.append(opTd);
      return tr;
  }//创建行end


//转换php time（）时间戳
function getMyDate(phpstr){  
   str = parseInt(phpstr)*1000;//将php时间戳转化为整形并乘以1000
    var newDate = new Date(str);
    var year = newDate.getUTCFullYear();//取年份
    var month = newDate.getUTCMonth()+1;//取月份
    var nowday = newDate.getUTCDate();//取天数
    var hours = newDate.getHours();//取小时
    var minutes = newDate.getMinutes();//取分钟
    var seconds = newDate.getSeconds();//取秒
    return year+"-"+month+"-"+nowday+" "+hours+":"+minutes+":"+seconds;
}


//ip2long转换后的整形在转回来
function long2ip ( proper_address ) {  
    proper_address = proper_address>>>0;  
    var output = false;  
    if ( !isNaN ( proper_address ) && ( proper_address >= 0 || proper_address <= 4294967295 ) ) {  
      output = Math.floor (proper_address / Math.pow ( 256, 3 ) ) + '.' +  
               Math.floor ( ( proper_address % Math.pow ( 256, 3 ) ) / Math.pow ( 256, 2 ) ) + '.' +  
               Math.floor ( ( ( proper_address % Math.pow ( 256, 3 ) ) % Math.pow ( 256, 2 ) ) /  
  Math.pow ( 256, 1 ) ) + '.' +  
               Math.floor ( ( ( ( proper_address % Math.pow ( 256, 3 ) ) % Math.pow ( 256, 2 ) ) %  
    Math.pow ( 256, 1 ) ) / Math.pow ( 256, 0 ) );  
    }    
    return output;  
} 


//新增数据
$('.add').click(function(){
               $("input[name='name']").val("");
      $("input[name='phone']").val("");
     $("input[name='addr']").val("");
     $("input[name='job']").val("");
          // $('.nav #index').removeClass('active');
          // $(this).css("background","#428bca");
          // (this).css("color","#428bca");
        $('#butt').show();//显现保存
        $('#butt0').hide();//隐藏更新

        })//新增用户end

        //保存数据写入
  $('#butt').bind('click',function(){//点击保存
        //表单值赋予给变量
     var name = $("input[name='name']").val();
     var phone = $("input[name='phone']").val();
     var addr = $("input[name='addr']").val();
     var job = $("input[name='job']").val();

      $.post({
        url: "php/curd.php?action=add",
        async:false,
        data:{
          name:name,
          phone: phone,
          addr:addr,
          job:job,
        },
        success:function(res){
          req = $.parseJSON(res);
        }
      });
      if(req !="false"){
        $('#alert13').css("marginTop","-60px").show().delay(2000).hide(0);
          //创建表格节点
     var tr = $('<tr class="addClass"><td></td><td></td><td></td><td></td><td></td><td></td><td></td> </tr>');
      
      //创建操作td
      var opTd =$("<td></td>");
      var  editBtn = $("<a>编辑&nbsp;</a>");
      editBtn.attr("name","edit")
      editBtn.attr("dataid",req['d0']);

      var delBtn = $("<a>&nbsp;删除</a>");
      delBtn.attr("dataid",req['d0']);
      delBtn.attr("name","delete");



                //删除按钮重新绑定事件
               delBtn.on("click",function(){

                  var dataid = $(this).attr('dataid');
                
                  $.post({
                    url:"php/curd.php?action=delete",
                    async:false,
                    data:{
                      did:dataid
                    },
                    success:function(res){
                      req = res.trim();
                    }
                  })
                  if(req =="ok"){
                    $('#alert14').css("marginTop","-60px").show().delay(2000).hide(0);
                    $(this).parent().parent().remove();
                  }else{
                    $('#alert0').css("marginTop","-60px").show().delay(2000).hide(0);
                  }

              });//删除end


               //修改按钮重新绑定事件
              editBtn.click(function(){
                // $("a[name='edit'").on("click",function(){

                  var id = $(this).attr('dataid');
                  //$(this).addClass("edit");
                 var  tr = $(this).parent().parent();
                    //获取表格中的值给变量
                var name = tr.find(" td:eq('1')").text();
                var phone =tr.find("td:eq('2')").text(); 
                var addr = tr.find("td:eq('3')").text(); 
                var job = tr.find("td:eq('4')").text();

                  $('#butt').hide();//隐藏保存
                  $('#butt0').show();//显现更新


                  //把变量中的值赋予表单
                  $("input[name='name']").val(name); 
                  $("input[name='phone']").val(phone); 
                  $("input[name='addr']").val(addr);
                  $("input[name='job']").val(job);


                  //模态框跳出来
                  $('#about').modal('show');


              //用户修改的更新按钮
                $('#butt0').click(function(){

                  //从表单中获取值
               var name2 = $("input[name='name']").val();
               var phone2 =$("input[name='phone']").val();
               var addr2 = $("input[name='addr']").val();
               var job2 = $("input[name='job']").val();

               $.post({
                url:"php/curd.php?action=edit",
                //datatype:json,
                data:{
                  id:id,
                  name :name2,
                  phone:phone2,
                  addr:addr2,
                  job : job2,
                },
                async:false,
                success:function(res){
                  data = $.parseJSON(res);
                }
               });

              if(data != "false"){
             var  time =getMyDate(data['d0']);
             var ip = long2ip(data['d1']);

               // //把值赋予给表格
                  tr.find('td:eq(0) ').text(id) ;
                  tr.find('td:eq(1) ').text(name2) ;
                  tr.find('td:eq(2) ').text(phone2) ; 
                  tr.find('td:eq(3) ').text(addr2) ; 
                  tr.find('td:eq(4) ').text(job2) ;
                  tr.find('td:eq(5) ').text(time) ;
                  tr.find('td:eq(6) ').text(ip) ;
                   $('#alert6').css("marginTop","-60px").show().delay(4000).hide(0);
          }else{

             $('#alert5').css("marginTop","-60px").show().delay(4000).hide(0);
          }
                
                })
          })//修改end

    opTd.append(editBtn);
    opTd.append(delBtn);

    tr.append(opTd);

    $('.table').append(tr);
      //值在赋予给表格
            $('.addClass  td:eq(0)').text(req['d0']);
            $('.addClass  td:eq(1)').text(name);
            $('.addClass  td:eq(2)').text(phone);
            $('.addClass  td:eq(3)').text(addr);
            $('.addClass  td:eq(4)').text(job);
            $('.addClass  td:eq(5)').text(req['d2']);
            $('.addClass  td:eq(6)').text(req['d1']);
            $('.addClass').removeClass();
            $('#alert15').css("marginTop","-60px").show().delay(4000).hide(0);
      }else{
        $('#alert13').css("marginTop","-60px").show().delay(4000).hide(0);
      }
   
   
       
   });//写入html  end

    // //选定表格变色+删除+修改（就是用户选择）
    //  $("body").on("click", '.table tr:not(.tr1)', function(){//绑定事件，用于新加入的数据可以引用
    // $(this).css("background","#428bca").siblings().css("background","");
    // //赋予选中的表格一个del1样式，非常重要，作为标记导航定位一般的存在
    // $(this).addClass('del1').siblings().removeClass('del1');

    //  })




//用户删除
 $("a[name='delete']").on("click",function(){
        var dataid = $(this).attr('dataid');
      
        $.post({
          url:"php/curd.php?action=delete",
          async:false,
          data:{
            did:dataid
          },
          success:function(res){
            req = res.trim();
          }
        })
        if(req =="ok"){
          $('#alert14').css("marginTop","-60px").show().delay(2000).hide(0);
          $(this).parent().parent().remove();
        }else{
          $('#alert0').css("marginTop","-60px").show().delay(2000).hide(0);
        }
 });//删除end


     //用户修改
$("a[name='edit']").click(function(){
      // $("a[name='edit'").on("click",function(){

        var id = $(this).attr('dataid');
        //$(this).addClass("edit");
       var  tr = $(this).parent().parent();
          //获取表格中的值给变量
      var name = tr.find(" td:eq('1')").text();
      var phone =tr.find("td:eq('2')").text(); 
      var addr = tr.find("td:eq('3')").text(); 
      var job = tr.find("td:eq('4')").text();

        $('#butt').hide();//隐藏保存
        $('#butt0').show();//显现更新


        //把变量中的值赋予表单
        $("input[name='name']").val(name); 
        $("input[name='phone']").val(phone); 
        $("input[name='addr']").val(addr);
        $("input[name='job']").val(job);


        //模态框跳出来
        $('#about').modal('show');


    //用户修改的更新按钮
      $('#butt0').click(function(){

        //从表单中获取值
     var name2 = $("input[name='name']").val();
     var phone2 =$("input[name='phone']").val();
     var addr2 = $("input[name='addr']").val();
     var job2 = $("input[name='job']").val();

     $.post({
      url:"php/curd.php?action=edit",
      //datatype:json,
      data:{
        id:id,
        name :name2,
        phone:phone2,
        addr:addr2,
        job : job2,
      },
      async:false,
      success:function(res){
        data = $.parseJSON(res);
      }
     });

    if(data != "false"){
   var  time =getMyDate(data['d0']);
   var ip = long2ip(data['d1']);

     // //把值赋予给表格
        tr.find('td:eq(0) ').text(id) ;
        tr.find('td:eq(1) ').text(name2) ;
        tr.find('td:eq(2) ').text(phone2) ; 
        tr.find('td:eq(3) ').text(addr2) ; 
        tr.find('td:eq(4) ').text(job2) ;
        tr.find('td:eq(5) ').text(time) ;
        tr.find('td:eq(6) ').text(ip) ;
         $('#alert6').css("marginTop","-60px").show().delay(4000).hide(0);
            }else{

               $('#alert5').css("marginTop","-60px").show().delay(4000).hide(0);
            }
                  
      })//更新按钮end

    })//修改end

})//function结束

//author:denry
//date:2018.07.23
