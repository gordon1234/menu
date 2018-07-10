var onmouseEventOldClassName = "";    //鼠标移上去或移出来事件触发的旧样式
var ttarget = "m2";   //主程序框架
//定位
function fTarget(url) {
    parent.MiddleFrameSet.cols = "180,*,0";
    //弹出等待框
    var frame = eval("parent.mainFrame.frames('" + ttarget + "')");
    try {
        if (frame != null) {
            frame.showSysWaitBox();
        }
    }
    catch (E) {
    }
    var obj = null;
    for (var i = 0; i < parent.mainFrame.frames.length; i++) {
        var tmpframe = parent.mainFrame.frames[i].frameElement;
        if (tmpframe.id == "m2") {
            obj = tmpframe;
            break;
        }
    }
    if (obj != null) {
        obj.src = url;
    }
}

function DoMenu(menuUrl) {
    if (menuUrl != null && menuUrl != undefined && menuUrl != "") {
        //一级菜单中有可能是url菜单
        fTarget(menuUrl);
        return;
    }
}

function onmouse_over_Event(obj, level) {
    onmouseEventOldClassName = obj.className;
    var overClassName = "";
    if (level == "1") {
        //一级不变化
        obj.style.textDecoration = "underline";
        obj.style.color = "blue";
    } else {
        if (level == "2") {
            //二级不变化
            obj.style.textDecoration = "underline";
            obj.style.color = "blue";
        } else {
            if (onmouseEventOldClassName == "td_3_open") {
                overClassName = "td_3_open_over";
            } else {
                overClassName = "td_3_close_over";
            }
            obj.className = overClassName;
        }
    }
}

function onmouse_out_Event(obj, level) {
    if (level == "1") {
        //一级不变化
        obj.style.textDecoration = "none";
        obj.style.color = "#5b81b2";
    } else {
        if (level == "2") {
            //二级不变化
            obj.style.textDecoration = "none";
            obj.style.color = "#333";
        } else {
            obj.className = onmouseEventOldClassName;
        }
    }
}

function td_onclick(obj, level, hasSub) {
    var objId = obj.id;
    changeStyle(objId, level, hasSub);
    if (hasSub == "true") {
        //判断当前节点是否有子节点，有的话就打开/关闭
        showOrHiddenSubDiv(objId, level);
    }
}

function changeStyle(objId, level, hasSub) {
    var openClassName = "td_1_open";
    var closeClassName = "td_1_close";
    var openNoChild = "td_1_nochild_on";
    var closeNoChild = "td_1_nochild";
    if (level == "1") {
        openClassName = "td_1_open";
        closeClassName = "td_1_close";
        openNoChild = "td_1_nochild_on";
        closeNoChild = "td_1_nochild";
    } else {
        if (level == "2") {
            openClassName = "td_2_open";
            closeClassName = "td_2_close";
            openNoChild = "td_2_nochild_on";
            closeNoChild = "td_2_nochild";
        } else {
            openClassName = "td_3_open";
            closeClassName = "td_3_close";
        }
    }
    var i = 0;
    var objPre = objId.substring(0, objId.lastIndexOf("_"));
    var obj = document.getElementById(objPre + "_" + i);
    while (obj != undefined && obj != null) {
        var oldClassName = obj.className;
        if (oldClassName == undefined || oldClassName == null) {
            obj.className = closeClassName;
        } else {
            if (oldClassName.indexOf("nochild") != -1) {
                obj.className = closeNoChild;
            } else {
                obj.className = closeClassName;
            }
        }
        if (objId != (objPre + "_" + i)) {
            //关闭同层级的所有子DIV菜单
            showOrHiddenSubDiv(objPre + "_" + i, level, "none");
        }
        i++;
        obj = document.getElementById(objPre + "_" + i);
    }
    if (hasSub == "true") {
        document.getElementById(objId).className = openClassName;
        onmouseEventOldClassName = openClassName;
    } else {
        document.getElementById(objId).className = openNoChild;
        onmouseEventOldClassName = openNoChild;
    }
}

//显示/隐藏节点对应的子节点DIV
function showOrHiddenSubDiv(objId, level, displayFlag) {
    if (objId == undefined || objId == null || objId == "") {
        return;
    }
    var objLast = objId.substring(2);
    var obj = document.getElementById("div" + objLast + "_sub");
    if (obj == undefined || obj == null) {
        return;
    } else {
        if (displayFlag != undefined && displayFlag != null) {
            obj.style.display = displayFlag;
            return;
        }
        if (obj.style == undefined || obj.style == null || obj.style.display == undefined || obj.style.display == null || obj.style.display != "none") {
            obj.style.display = "none";
        } else {
            obj.style.display = "";
        }
    }
}

