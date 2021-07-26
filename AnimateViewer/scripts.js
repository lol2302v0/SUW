let $A = null; // animate ripe-json

let $F = []; // parent filter

let $AD; // animate data ( css-style & html-content )

let $AS = { pos_x: 0, pos_y: 0, scale: 1.0 }; // animate div state

function reCreateSubList(subList) {
	let newDiv = $('<div/>').addClass('mdui-list mdui-list-dense');
	newDiv.append($('<label/>').addClass('mdui-list-item mdui-ripple')
		.append($('<button/>').addClass('mdui-btn mdui-btn-dense').text('select all').attr('mdui-tooltip', '{ content: "select all" }').bind('click', function () {
			$F = [];
			$('#_sub_list input').prop('checked', true);
		}))
		.append($('<button/>').addClass('mdui-btn mdui-btn-dense').text('clear all').attr('mdui-tooltip', '{ content: "clear all" }').bind('click', function () {
			$F = [];
			for (let i = 0; i < $A.Sub.length; ++i) {
				$F.push(i);
			}
			$('#_sub_list input').prop('checked', false);
		}))
	);
	for (let i in subList) {
		newDiv.append($('<label/>').addClass('mdui-list-item mdui-ripple').attr('mdui-tooltip', '{ content: "' + subList[i] + '" }')
			.append($('<div/>').addClass('mdui-checkbox')
				.append($('<input/>').attr('type', 'checkbox').prop('checked', true).attr('_i', i).bind('click', function () {
					if (this.checked)
						$F.splice($F.indexOf(getIntAttrFromEle(this, '_i')), 1);
					else
						$F.push(getIntAttrFromEle(this, '_i'));
				}))
				.append($('<i/>').addClass('mdui-checkbox-icon'))
			)
			.append($('<p/>').text(i.toString() + ' | ' + subList[i]))
		);
	}
	$('#_sub_list').empty().append(newDiv);
	return;
}
function reCreateLabelList(labelList) {
	let newDiv = $('<div/>').addClass('mdui-list mdui-list-dense');
	newDiv.append($('<div/>').addClass('mdui-list-item mdui-ripple').attr('mdui-tooltip', '{ content: "[ 0, ' + ($A.FrameSum - 1).toString() + ' ]" }')
		.append($('<button/>').addClass('mdui-btn mdui-btn-icon').bind('click', function () {
			changeAnimRange([0, $A.FrameSum - 1]);
		}).append($('<i/>').addClass('mdui-icon material-icons').text('play_arrow')))
		.append($('<p/>').addClass('mdui-m-l-1').text('*'))
	);
	for (let label in labelList) {
		newDiv.append($('<div/>').addClass('mdui-list-item mdui-ripple').attr('mdui-tooltip', '{ content: "[ ' + $A.Label[label][0].toString() + ', ' + $A.Label[label][1].toString() + ' ]" }')
			.append($('<button/>').addClass('mdui-btn mdui-btn-icon').attr('_l', label).bind('click', function () {
				changeAnimRange($A.Label[$(this).attr('_l')]);
			}).append($('<i/>').addClass('mdui-icon material-icons').text('play_arrow')))
			.append($('<p/>').addClass('mdui-m-l-1').text(label))
		);
	}
	$('#_label_list').empty().append(newDiv);
	return;
}

function changeAnimRange(range) {
	if (isUndef(range)) {
		$('#_anim_style').html('');
		$('#_anim_div').html('');
	} else {
		$AD = f2('main', $A, range, $F, $('#_input_cur_res_path').val() + '\\');
		$('#_anim_style').html($AD[0]);
		$('#_anim_div').html($AD[1]);
	}
	modAnimDivState($AS);
	return;
}
function saveAnimHTML(divState) {
	let s = '';
	s += '<!DOCTYPE html>\n<html>\n<head>\n\t<style>\n[_id_=\'_anim_div/main\'] { position: absolute; top: ' + divState.pos_y.toString() + 'px; left: ' + divState.pos_x.toString() + 'px; transform: scale(' + divState.scale.toString() + ') }\n[_id=\'_anim_div/main\'] img { position: absolute; }';
	s += $AD[0];
	s += '\t</style>\n</head>\n<body>\n\t<div _id_=\'_anim_div/main\'>\n';
	s += $AD[1];
	s += '\t</div>\n</body>\n</html>';
	saveFile(s, 'application/json', 'anim.html');
	return;
}

function modAnimDivState(prop) {
	let target = $('#_anim_div');
	for (let key in prop) {
		let val = prop[key];
		$AS[key] = val;
		switch (key) {
			case 'pos_x':
				target.css('left', val.toString() + 'px');
				$('#_cur_pos_x').text(val.toFixed(0).toString());
				$('#_input_range_pos_x').val(val);
				break;
			case 'pos_y':
				target.css('top', val.toString() + 'px');
				$('#_cur_pos_y').text(val.toFixed(0).toString());
				$('#_input_range_pos_y').val(val);
				break;
			case 'scale':
				target.css('transform', 'scale(' + val.toString() + ', ' + val.toString() + ')');
				$('#_cur_scale').text(val.toFixed(2).toString());
				break;
		}
	}
	mdui.updateSliders();
	return;
}

function cleanView() {
	$('#_ctrl_view_shell input').prop('disabled', true);
	$('#_ctrl_view_shell span').text('');
	$('#_sub_list').empty();
	$('#_label_list').empty();
	$('#_anim_style').html('');
	$('#_anim_div').html('');
	$A = null;
	$F = [];
	$AD = null;
	mdui.updateSliders();
}
function createView(json) {
	cleanView();
	$('#_ctrl_view_shell input').prop('disabled', false);
	$A = json;
	serLayer($A.Anim);
	reCreateSubList($A.Sub);
	reCreateLabelList($A.Label);
	changeAnimRange(undefined);
	mdui.updateSliders();
	return;
}

function initEnv() {
	$('#_about').bind({
		click: function () {
			(new mdui.Dialog($('<div/>').addClass('mdui-dialog')
			.append($('<div/>').addClass('mdui-dialog-title').text('About'))
			.append($('<div/>').addClass('mdui-dialog-content')
				.append($('<p/>').text('Map-Designer. By Small-PC'))
				.append($('<div/>').addClass('mdui-typo')
					.append($('<span/>').text(' | '))
					.append($('<a/>').attr('href', 'javascript:;').text('smallpc@qq.com'))
					.append($('<span/>').text(' | '))
					.append($('<a/>').attr('href', 'javascript:;').text('a.small.pink.chick@gmail.com'))
					.append($('<span/>').text(' | '))
					.append($('<a/>').attr('target', '_blank').attr('href', 'https://tieba.baidu.com/home/main?un=%E4%B8%80%E8%B7%AF%E4%B8%8A%E6%B5%B7%E5%A4%96').text('baidu-tieba'))
					.append($('<span/>').text(' | '))
					.append($('<a/>').attr('target', '_blank').attr('href', 'https://space.bilibili.com/12258540').text('bilibili'))
					.append($('<span/>').text(' | '))
				)
				.append($('<p/>').text('PAM 文件格式研究由 本人 与 时漪、PAK向日葵、伊特 一同完成。'))
				.append($('<p/>').text('使用方法'))
				.append($('<p/>').text('1. 点击上传按钮，上传 Ripe.JSON (使用 SU 解码 PAM 生成)'))
				.append($('<p/>').text('2. 在上端的文本框中输入分解图所在文件夹的目录'))
				.append($('<p/>').text('3. 在右栏选择想要播放的动画范围，点击 Play 按钮即可'))
			)
			.append($('<div/>').addClass('mdui-dialog-actions')
				.append($('<button/>').addClass('mdui-btn mdui-ripple').attr('mdui-dialog-close', '').text('close'))
			))).open();
		}
	});
	$('#_refresh').bind({
		click: function () {
			window.location.reload();
		}
	});
	$('#_clean').bind({
		click: function () {
			cleanView();
		}
	});
	$('#_input_ripejson').bind({
		change: function () {
			let reader = new FileReader();
			reader.readAsText(this.files[0]);
			reader.onload = function () {
				createView(JSON.parse(this.result));
				mdui.snackbar({
					message: 'load ripe-json finish',
					position: 'top'
				});
			};
		}
	});
	$('#_upload').bind({
		click: function () {
			$("#_input_ripejson").trigger('click');
		}
	});
	$('#_download').bind({
		click: function () {
			saveAnimHTML($AS);
		}
	});
	$('#_input_range_pos_x').bind({
		onchange: function () {
			modAnimDivState({ pos_x: parseInt(this.value) });
		},
		input: function () {
			modAnimDivState({ pos_x: parseInt(this.value) });
		}
	});
	$('#_input_range_pos_y').bind({
		onchange: function () {
			modAnimDivState({ pos_y: parseInt(this.value) });
		},
		input: function () {
			modAnimDivState({ pos_y: parseInt(this.value) });
		}
	});
	$('#_input_range_scale_out').bind({
		onchange: function () {
			modAnimDivState({ scale: parseFloat(this.value) });
		},
		input: function () {
			modAnimDivState({ scale: parseFloat(this.value) });
		}
	});
	$('#_input_range_scale_in').bind({
		onchange: function () {
			modAnimDivState({ scale: parseFloat(this.value) });
		},
		input: function () {
			modAnimDivState({ scale: parseFloat(this.value) });
		}
	});
	cleanView();
}