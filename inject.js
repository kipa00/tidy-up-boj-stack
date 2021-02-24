// Top bar is made in order as of 'order' array
// Problems are inserted in order as of original order in BOJ Stack
// Unspecified problems are automatically classified as belonging to 'Unspecified' category
// Usage Example: if 1000 and 1008 belong to Contest A and 1002 through 1007 belong to Contest B
/*
  // If you swap this two, then 'Contest B' will appear earlier than 'Contest A' in top bar
  var order = ['Contest A', 'Contest B'];
  var library = {
    'Contest A': [1000, 1008],
    'Contest B': ['1002-1007'],
  };
*/

var order = [];
var library = {};

function new_table() {
  var elem = document.createElement('table');
  elem.classList.add('table');
  elem.classList.add('u-table--v3');
  elem.classList.add('g-bg-white');
  elem.classList.add('g-color-black');
  elem.classList.add('table-striped');

  // thead
  var thead = document.createElement('thead');
  var head_list = [
    '문제 번호', '제목', '시간', '메모리', '공유', '폴더', '편집', 'BOJ'
  ];
  for (var i in head_list) {
    var subelem = document.createElement('th');
    subelem.innerHTML = head_list[i];
    thead.appendChild(subelem);
  }
  elem.appendChild(thead);
  elem.appendChild(document.createElement('tbody'));
  return elem;
}
order.push('Unspecified');

var elem = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
var subelems = elem.getElementsByTagName('tr');

var prob = {}, tables = {};
for (var ki in order) {
  var key = order[ki];
  tables[key] = new_table();
  for (var i in library[key]) {
    if (typeof library[key][i] === 'number') {
      prob[library[key][i]] = key;
    } else {
      var t = library[key][i].split('-');
      var ed = +t[1];
      for (var i=+t[0]; i<=ed; ++i) {
        prob[i] = key;
      }
    }
  }
}
tables['Unspecified'] = new_table();

while (subelems.length) {
  var removed = elem.removeChild(subelems[0]);
  var removed2 = elem.removeChild(subelems[0]);
  var category = prob[+removed.getAttribute('data-problem-id')];
  if (category === undefined) {
    category = 'Unspecified';
  }
  tables[category].getElementsByTagName('tbody')[0].appendChild(removed);
  tables[category].getElementsByTagName('tbody')[0].appendChild(removed2);
}
var push = elem.parentNode.parentNode;
push.removeChild(elem.parentNode);

function toggle(elem_id) {
  var e = document.getElementById('group-' + elem_id);
  if (e.getAttribute('style') !== 'display: none;') {
    e.setAttribute('style', 'display: none;');
    return;
  }
  var p = document.getElementById('kipa-table').getElementsByTagName('table');
  for (var i=0; i<p.length; ++i) {
    p[i].setAttribute('style', 'display: none;');
  }
  e.removeAttribute('style');
}

var tab_div = document.createElement('div');
for (var ki in order) {
  var key = order[ki];
  var subtitle = document.createElement('div');
  subtitle.innerHTML = key;
  var key_no_space = key.replace(/\s+/g, '-');
  subtitle.setAttribute('onclick', '(' + toggle + ')(\'' + key_no_space + '\');');
  subtitle.classList.add('kipa-heading');
  tab_div.appendChild(subtitle);
}
tab_div.classList.add('kipa-tab-bar');
push.appendChild(tab_div);

var table_div = document.createElement('div');
for (var ki in order) {
  var key = order[ki];
  var key_no_space = key.replace(/\s+/g, '-');
  tables[key].setAttribute('id', 'group-' + key_no_space);
  tables[key].setAttribute('style', 'display: none;');
  table_div.appendChild(tables[key]);
}
table_div.setAttribute('id', 'kipa-table');
push.appendChild(table_div);
