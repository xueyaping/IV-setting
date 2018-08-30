var TestModel;
function tabsSwitch(){
    TestModel='debug';
    if(TestModel='debug'){
        $("#tab_17").removeAttr("onclick");
        $("#tab_17").css('cursor','notallowed');
    }
}
$(function(){
    tabsSwitch()
})