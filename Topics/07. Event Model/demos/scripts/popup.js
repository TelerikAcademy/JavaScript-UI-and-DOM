// (function () {
//     var popupHolderTemplate = document.createElement("div");
//     popupHolderTemplate.className = "popup-holder";

//     var popupTemplate = document.createElement("div");
//     popupTemplate.className = "popup";
//     popupHolderTemplate.appendChild(popupTemplate);

//     var titleTemplate = document.createElement("h1");
//     var textTemplate = document.createElement("p");

//     var okButtonTemplate = document.createElement("a");
//     var cancelButtonTemplate = document.createElement("a");

//     okButtonTemplate.className = "btn btn-success";
//     cancelButtonTemplate.className = "btn btn-close";

//     popupTemplate.appendChild(titleTemplate);
//     popupTemplate.appendChild(textTemplate);

//     var buttonspopupHolderTemplate = document.createElement("div");
//     buttonspopupHolderTemplate.className = "buttons-container";

//     buttonspopupHolderTemplate.appendChild(okButtonTemplate);
//     buttonspopupHolderTemplate.appendChild(cancelButtonTemplate);

//     popupTemplate.appendChild(buttonspopupHolderTemplate);

//     function createPopup(title, text, okButtonText, cancelButtonText) {
//         titleTemplate.innerHTML = title;
//         textTemplate.innerHTML = text;
//         okButtonTemplate.innerHTML = okButtonText;
//         cancelButtonTemplate.innerHTML = cancelButtonText;
//         var popup = popupHolderTemplate.cloneNode(true)
//         document.body.appendChild(popup);

//         popup.addEventListener("click", function (ev) {
//             var target = ev.target;
//             var params;
//             var toDispatchEvent = false;

//             if (target.className.indexOf("btn-success") >= 0) {
//                 params = {
//                     state: "success"
//                 };
//                 toDispatchEvent = true;
//             }
//             else if (target.className.indexOf("btn-close") >= 0) {
//                 params = {
//                     state: "cancel"
//                 };
//                 toDispatchEvent = true;
//             } else if (target.className.indexOf("popup") >= 0 ||
//                 target.className.indexOf("buttons-container") >= 0 ||
//                 target.nodeName === "P" ||
//                 target.nodeName === "H1") {
//                 return;
//             }

//             if (params) {
//                 var event = new CustomEvent("popupClose", {
//                     detail: params
//                 });

//                 popup.dispatchEvent(event, params);
//             }
//             document.body.removeChild(popup);
//         });

//         return popup;
//     }
//     this.createPopup = createPopup; 
// } (window));

var _0xb358=["\x64\x69\x76","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x70\x6F\x70\x75\x70\x2D\x68\x6F\x6C\x64\x65\x72","\x70\x6F\x70\x75\x70","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x68\x31","\x70","\x61","\x62\x74\x6E\x20\x62\x74\x6E\x2D\x73\x75\x63\x63\x65\x73\x73","\x62\x74\x6E\x20\x62\x74\x6E\x2D\x63\x6C\x6F\x73\x65","\x62\x75\x74\x74\x6F\x6E\x73\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x63\x6C\x6F\x6E\x65\x4E\x6F\x64\x65","\x62\x6F\x64\x79","\x63\x6C\x69\x63\x6B","\x74\x61\x72\x67\x65\x74","\x62\x74\x6E\x2D\x73\x75\x63\x63\x65\x73\x73","\x69\x6E\x64\x65\x78\x4F\x66","\x73\x75\x63\x63\x65\x73\x73","\x62\x74\x6E\x2D\x63\x6C\x6F\x73\x65","\x63\x61\x6E\x63\x65\x6C","\x6E\x6F\x64\x65\x4E\x61\x6D\x65","\x50","\x48\x31","\x70\x6F\x70\x75\x70\x43\x6C\x6F\x73\x65","\x64\x69\x73\x70\x61\x74\x63\x68\x45\x76\x65\x6E\x74","\x72\x65\x6D\x6F\x76\x65\x43\x68\x69\x6C\x64","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x63\x72\x65\x61\x74\x65\x50\x6F\x70\x75\x70"];(function(){var _0x8e89x1=document[_0xb358[1]](_0xb358[0]);_0x8e89x1[_0xb358[2]]= _0xb358[3];var _0x8e89x2=document[_0xb358[1]](_0xb358[0]);_0x8e89x2[_0xb358[2]]= _0xb358[4];_0x8e89x1[_0xb358[5]](_0x8e89x2);var _0x8e89x3=document[_0xb358[1]](_0xb358[6]);var _0x8e89x4=document[_0xb358[1]](_0xb358[7]);var _0x8e89x5=document[_0xb358[1]](_0xb358[8]);var _0x8e89x6=document[_0xb358[1]](_0xb358[8]);_0x8e89x5[_0xb358[2]]= _0xb358[9];_0x8e89x6[_0xb358[2]]= _0xb358[10];_0x8e89x2[_0xb358[5]](_0x8e89x3);_0x8e89x2[_0xb358[5]](_0x8e89x4);var _0x8e89x7=document[_0xb358[1]](_0xb358[0]);_0x8e89x7[_0xb358[2]]= _0xb358[11];_0x8e89x7[_0xb358[5]](_0x8e89x5);_0x8e89x7[_0xb358[5]](_0x8e89x6);_0x8e89x2[_0xb358[5]](_0x8e89x7);function _0x8e89x8(_0x8e89x9,_0x8e89xa,_0x8e89xb,_0x8e89xc){_0x8e89x3[_0xb358[12]]= _0x8e89x9;_0x8e89x4[_0xb358[12]]= _0x8e89xa;_0x8e89x5[_0xb358[12]]= _0x8e89xb;_0x8e89x6[_0xb358[12]]= _0x8e89xc;var _0x8e89xd=_0x8e89x1[_0xb358[13]](true);document[_0xb358[14]][_0xb358[5]](_0x8e89xd);_0x8e89xd[_0xb358[28]](_0xb358[15],function(_0x8e89xe){var _0x8e89xf=_0x8e89xe[_0xb358[16]];var _0x8e89x10;var _0x8e89x11=false;if(_0x8e89xf[_0xb358[2]][_0xb358[18]](_0xb358[17])>= 0){_0x8e89x10= {state:_0xb358[19]};_0x8e89x11= true}else {if(_0x8e89xf[_0xb358[2]][_0xb358[18]](_0xb358[20])>= 0){_0x8e89x10= {state:_0xb358[21]};_0x8e89x11= true}else {if(_0x8e89xf[_0xb358[2]][_0xb358[18]](_0xb358[4])>= 0|| _0x8e89xf[_0xb358[2]][_0xb358[18]](_0xb358[11])>= 0|| _0x8e89xf[_0xb358[22]]=== _0xb358[23]|| _0x8e89xf[_0xb358[22]]=== _0xb358[24]){return}}};if(_0x8e89x10){var _0x8e89x12= new CustomEvent(_0xb358[25],{detail:_0x8e89x10});_0x8e89xd[_0xb358[26]](_0x8e89x12,_0x8e89x10)};document[_0xb358[14]][_0xb358[27]](_0x8e89xd)});return _0x8e89xd}this[_0xb358[29]]= _0x8e89x8}(window))