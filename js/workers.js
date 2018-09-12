// var i=0;

// function timedCount()
// {
// i=i+1;
// postMessage(i);
// setTimeout("timedCount()",500);
// }

// timedCount();
corr= MainWindow.ConfigRead(1)
acqu= MainWindow.ConfigRead(2);
sn= MainWindow.ConfigRead(3)
sort= MainWindow.ConfigRead(4)
filter= MainWindow.GetGradeInfo()//分档
warn= MainWindow.ConfigRead(6)
output= MainWindow.ConfigRead(7)
device= MainWindow.ConfigRead(8)

self.onmessage = function(e) {
  var messages = e.data;  // e.data为{message: 'hello worker!'}
  var workerResult = {};
  // do something

  postMessage(workerResult);
}
