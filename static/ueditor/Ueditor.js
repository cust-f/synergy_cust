function isfocus(t) {
  if (t.checked == true) {
    document.getElementById("btn").removeAttribute("disabled");
    // document.getElementById("btn").removeAttribute("opacity");
  }
  if (t.checked == false) {
    document.getElementById("btn").setAttribute("disabled", true);
    // document.getElementById("btn").setAttribute("opacity",0.65);
  }
  // var btn=document.getElementById("btn");
  // var ischecked=document.getElementById("isfocus");
  // if (ischecked.checked){
  //     btn.style.disabled=false;
  // }else{
  //     btn.style.disabled=true;
  // }
}

function submit() {
  UE.ajax.request("/wp-admin/news/add", {
    method: "GET",

    timeout: 10000,

    async: false,

    data: {
      content: UE.getEditor('editor').getContent(),
      title: document.getElementById("newsTitle").value,
      picture: null,
      isfocus: document.getElementById("isfocus").checked
    },
    onsuccess: function (xhr) {
      if (xhr.responseText) {
        alert("成功保存！");
      }
    },
    onerror: function (xhr) {
      alert('Ajax请求失败');
    }
  })
}

// function setContent(isAppendTo) {
//     UE.ajax.request('getContent', {
//         method: 'GET',
//         timeout: 10000,
//         async: false,
//         date: {
//             name: "text.html"
//         },
//         onsuccess: function (xhr) {
//             if (eval('(' + xhr.responseText + ')').success) {
//                 UE.getEditor('editor').setContent(eval('(' + xhr.responseText + ')').content, false);
//             } else {
//                 alert('Ajax请求失败');
//             }
//         },
//         onerror: function (xhr) {
//             alert('Ajax请求失败');
//         }
//     })
// }
function show() {
  UE.ajax.request('/wp-admin/news/show', {
    method: 'POST',
    timeout: 10000,
    async: false,
    data: {
      newsTitle: "测试新闻1"
    },
    onsuccess: function (xhr) {
      if (eval('(' + xhr.responseText + ')').success) {
        UE.getEditor('editor').setContent(eval('(' + xhr.responseText + ')').content, false);
      } else {
        alert('Ajax请求失败');
      }
    },
    onerror: function (xhr) {
      alert('Ajax请求失败');
    }
  })
}
