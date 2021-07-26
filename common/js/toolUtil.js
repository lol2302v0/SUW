
function saveFile(str, type, path) {
	saveAs(new Blob([str], { type: type }), path);
	return;
}
function saveJSONFile(json, name) {
	saveAs(new Blob([JSON.stringify(json, null, 4)], { type: "application/json" }), name + ".json");
	return;
}

function isBtwRange(v, range) {
	return v >= range[0] && v <= range[1];
}

function cntChAtStr(s, c) {
	let cnt = 0;
	for (let ch of s)
		if (ch == c)
			++cnt;
	return cnt;
}

function getStrIfExist(v) {
	return (isUndef(v) || isNull(v)) ? "" : v;
}

function createNode(type, attrList, listenerList, innerText, childList) {
	let node = document.createElement(type);
	if (isObj(attrList))
		for (let key in attrList)
			if (!isUndef(attrList[key]))
				node.setAttribute(key, attrList[key]);
	if (isObj(listenerList))
		for (let key in listenerList)
			node.addEventListener(key, listenerList[key]);
	if (!isNull(innerText))
		node.innerText = innerText;
	if (isArr(childList))
		for (let child of childList)
			node.appendChild(child);
	return node;
}

function getHEleByID(id) {
	return document.getElementById(id);
}

function getAttrFromEle(ele, attrID) {
	return ele.attributes[attrID].nodeValue;
}

function getAttrByEleID(eleID, attrID) {
	return getHEleByID(eleID).attributes[attrID].nodeValue;
}

function getIntAttrFromEle(ele, attrID) {
	return parseInt(ele.attributes[attrID].nodeValue);
}

function getIntAttrByEleID(eleID, attrID) {
	return parseInt(getHEleByID(eleID).attributes[attrID].nodeValue);
}

function addNodeMaybeExist(parentID, idIfExist, node) {
	if (isNull(getHEleByID(idIfExist)))
		getHEleByID(parentID).appendChild(node);
	else
		getHEleByID(parentID).replaceChild(node, getHEleByID(idIfExist));
	return;
}
function removeNodeMaybeExist(parentID, id) {
	if (!isNull(getHEleByID(id)))
		getHEleByID(parentID).removeChild(getHEleByID(id));
	return;
}

function setDisableFromParent(parent, disableOrNot) {
	for (let node of parent.getElementsByTagName("input"))
		node.disabled = disableOrNot;
	for (let node of parent.getElementsByTagName("button"))
		node.disabled = disableOrNot;
	for (let node of parent.getElementsByTagName("select"))
		node.disabled = disableOrNot;
	return;
}

function showEasyDialog(title, content) {
	mdui.dialog({
		title: title,
		content: content,
		buttons: [
			{
				text: "Close",
				close: true
			}
		]
	});
	return
}

// copy from mdui-official-web
var $$ = mdui.JQ;
/**
 * 设置文档主题
 */
(function () {
	var DEFAULT_PRIMARY = 'teal';
	var DEFAULT_ACCENT = 'blue';
	var DEFAULT_LAYOUT = 'dark';
  
	// 设置 cookie
	var setCookie = function (key, value) {
	  // cookie 有效期为 1 年
	  var date = new Date();
	  date.setTime(date.getTime() + 365*24*3600*1000);
	  document.cookie = key + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
	};
  
	var setDocsTheme = function (theme) {
	  if (typeof theme.primary === 'undefined') {
		theme.primary = false;
	  }
	  if (typeof theme.accent === 'undefined') {
		theme.accent = false;
	  }
	  if (typeof theme.layout === 'undefined') {
		theme.layout = false;
	  }
  
	  var i, len;
	  var $body = $$('body');
  
	  var classStr = $body.attr('class');
	  var classs = classStr.split(' ');
  
	  // 设置主色
	  if (theme.primary !== false) {
		for (i = 0, len = classs.length; i < len; i++) {
		  if (classs[i].indexOf('mdui-theme-primary-') === 0) {
			$body.removeClass(classs[i])
		  }
		}
		$body.addClass('mdui-theme-primary-' + theme.primary);
		setCookie('docs-theme-primary', theme.primary);
		$$('input[name="doc-theme-primary"][value="' + theme.primary + '"]').prop('checked', true);
	  }
  
	  // 设置强调色
	  if (theme.accent !== false) {
		for (i = 0, len = classs.length; i < len; i++) {
		  if (classs[i].indexOf('mdui-theme-accent-') === 0) {
			$body.removeClass(classs[i]);
		  }
		}
		$body.addClass('mdui-theme-accent-' + theme.accent);
		setCookie('docs-theme-accent', theme.accent);
		$$('input[name="doc-theme-accent"][value="' + theme.accent + '"]').prop('checked', true);
	  }
  
	  // 设置主题色
	  if (theme.layout !== false) {
		for (i = 0, len = classs.length; i < len; i++) {
		  if (classs[i].indexOf('mdui-theme-layout-') === 0) {
			$body.removeClass(classs[i]);
		  }
		}
		if (theme.layout !== '') {
		  $body.addClass('mdui-theme-layout-' + theme.layout);
		}
		setCookie('docs-theme-layout', theme.layout);
		$$('input[name="doc-theme-layout"][value="' + theme.layout + '"]').prop('checked', true);
	  }
	};
  
	// 切换主色
	$$(document).on('change', 'input[name="doc-theme-primary"]', function () {
	  setDocsTheme({
		primary: $$(this).val()
	  });
	});
  
	// 切换强调色
	$$(document).on('change', 'input[name="doc-theme-accent"]', function () {
	  setDocsTheme({
		accent: $$(this).val()
	  });
	});
  
	// 切换主题色
	$$(document).on('change', 'input[name="doc-theme-layout"]', function () {
	  setDocsTheme({
		layout: $$(this).val()
	  });
	});
  
	// 恢复默认主题
	$$(document).on('cancel.mdui.dialog', '#dialog-docs-theme', function () {
	  setDocsTheme({
		primary: DEFAULT_PRIMARY,
		accent: DEFAULT_ACCENT,
		layout: DEFAULT_LAYOUT
	  });
	});
  })();