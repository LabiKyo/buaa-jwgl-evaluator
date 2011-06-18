flag = true;
id = '';
function fillTr(elems, target) { // 给某一行的所有select赋值
  var i;
  for (i = 0; i < elems.length; ++i) {
    elems[i].selectedIndex = target;
  }
}
function evaluate() {
  // 评价一位教师
  try { // POST的时候运行函数会导致异常
    var i;
    var iframe = document.getElementById('iframeautoheight');
    var iDoc = iframe.contentWindow || iframe.contentDocument; // iDoc是iframe中的document
    if (iDoc.document) {
      iDoc = iDoc.document;
    }

    var trs = iDoc.getElementById('divJs').getElementsByTagName('tr'); // 获取所有tr
    var j = 1;
    var selects = trs[j].getElementsByTagName('select'); // 获取第一行的所有select,因为有些课程不止一个教师
    if (selects.length) {
      fillTr(selects, 2);
    } else {
      ++j;
      selects = trs[j].getElementsByTagName('select'); // 有照片的时候情况很奇葩..
      fillTr(selects, 2);
    }
    for (i = j + 1; i < trs.length; ++i) { // 遍历行,评价A
      selects = trs[i].getElementsByTagName('select'); // 获取该行select
      fillTr(selects, 1);
    }
    var submit = iDoc.getElementById('Button1'); // 获取按钮
    submit.click(); // 提交请求
    course = iDoc.getElementById('pjkc'); // 获取评价课程select
    if (course.selectedIndex === course.length - 1) { // 这是最后一个课程了!
      flag = false;
    }
  } catch (e) { // 做静默处理
  }
}
function checkFlag() {
  if (!flag) {
    clearInterval(id);
  }
}
function evaluator() {
  id = setInterval('evaluate()', 50); // 0.05s刷一次
  setInterval('checkFlag()', 50);
}

evaluator(); // 调用函数
