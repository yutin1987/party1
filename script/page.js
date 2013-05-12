(function() {
    Date.format = function(t, e) {
        var a = Date.formatLogic, r = -1 !== e.indexOf("a") || -1 !== e.indexOf("A"), n = [];
        n.d = t.getDate(), n.dd = a.pad(n.d, 2), n.ddd = a.i18n.shortDayNames[t.getDay()], 
        n.dddd = a.i18n.dayNames[t.getDay()], n.M = t.getMonth() + 1, n.MM = a.pad(n.M, 2), 
        n.MMM = a.i18n.shortMonthNames[n.M - 1], n.MMMM = a.i18n.monthNames[n.M - 1], n.yyyy = t.getFullYear(), 
        n.yyy = a.pad(n.yyyy, 2) + "y", n.yy = a.pad(n.yyyy, 2), n.y = "y", n.H = t.getHours(), 
        n.hh = a.pad(r ? a.convertTo12Hour(n.H) : n.H, 2), n.h = r ? a.convertTo12Hour(n.H) : n.H, 
        n.HH = a.pad(n.H, 2), n.m = t.getMinutes(), n.mm = a.pad(n.m, 2), n.s = t.getSeconds(), 
        n.ss = a.pad(n.s, 2), n.z = t.getMilliseconds(), n.zz = n.z + "z", n.zzz = a.pad(n.z, 3), 
        n.ap = 12 > n.H ? "am" : "pm", n.a = 12 > n.H ? "am" : "pm", n.AP = 12 > n.H ? "AM" : "PM", 
        n.A = 12 > n.H ? "AM" : "PM";
        for (var s = 0, o = "", i = ""; e.length > s; ) {
            for (i = e.charAt(s); e.length > s + 1 && void 0 !== n[i + e.charAt(s + 1)]; ) i += e.charAt(++s);
            o += void 0 !== n[i] ? n[i] : i, s++;
        }
        return o;
    }, Date.formatLogic = {
        pad: function(t, e) {
            var a = 1, r = "";
            if (1 > e) return "";
            for (var n = 0; e > n; n++) a *= 10, r += "0";
            var s = t;
            return s = r + t, s = s.substring(s.length - e);
        },
        convertTo12Hour: function(t) {
            return 0 === t % 12 ? 12 : t % 12;
        },
        i18n: {
            dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            shortDayNames: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            shortMonthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        }
    }, Date.prototype.toFormat = function(t) {
        return Date.format(this, t);
    }, Date.parseFormat = function(t, e) {
        var a = new Date(2e3, 0, 1), r = [];
        r.d = "([0-9][0-9]?)", r.dd = "([0-9][0-9])", r.M = "([0-9][0-9]?)", r.MM = "([0-9][0-9])", 
        r.yyyy = "([0-9][0-9][0-9][0-9])", r.yyy = "([0-9][0-9])[y]", r.yy = "([0-9][0-9])", 
        r.H = "([0-9][0-9]?)", r.hh = "([0-9][0-9])", r.h = "([0-9][0-9]?)", r.HH = "([0-9][0-9])", 
        r.m = "([0-9][0-9]?)", r.mm = "([0-9][0-9])", r.s = "([0-9][0-9]?)", r.ss = "([0-9][0-9])", 
        r.z = "([0-9][0-9]?[0-9]?)", r.zz = "([0-9][0-9]?[0-9]?)[z]", r.zzz = "([0-9][0-9][0-9])", 
        r.ap = "([ap][m])", r.a = "([ap][m])", r.AP = "([AP][M])", r.A = "([AP][M])";
        for (var n = Date.parseLogic, s = 0, o = "", i = Array(""), u = ""; e.length > s; ) {
            for (u = e.charAt(s); e.length > s + 1 && void 0 !== r[u + e.charAt(s + 1)]; ) u += e.charAt(++s);
            void 0 !== r[u] ? (o += r[u], i[i.length] = u) : o += u, s++;
        }
        var d = RegExp(o), y = t.match(d);
        if (void 0 === y || y.length !== i.length) return void 0;
        for (s = 0; i.length > s; s++) if ("" !== i[s]) switch (i[s]) {
          case "yyyy":
          case "yyy":
            a.setYear(n.parseInt(y[s]));
            break;

          case "yy":
            a.setYear(2e3 + n.parseInt(y[s]));
            break;

          case "MM":
          case "M":
            a.setMonth(n.parseInt(y[s]) - 1);
            break;

          case "dd":
          case "d":
            a.setDate(n.parseInt(y[s]));
            break;

          case "hh":
          case "h":
          case "HH":
          case "H":
            a.setHours(n.parseInt(y[s]));
            break;

          case "mm":
          case "m":
            a.setMinutes(n.parseInt(y[s]));
            break;

          case "ss":
          case "s":
            a.setSeconds(n.parseInt(y[s]));
            break;

          case "zzz":
          case "zz":
          case "z":
            a.setMilliseconds(n.parseInt(y[s]));
            break;

          case "AP":
          case "A":
          case "ap":
          case "a":
            ("PM" === y[s] || "pm" === y[s]) && 12 > a.getHours() && a.setHours(a.getHours() + 12), 
            "AM" !== y[s] && "am" !== y[s] || 12 !== a.getHours() || a.setHours(0);
        }
        return a;
    }, Date.parseLogic = {
        unpad: function(t) {
            for (var e = t; e.length > 1 && "0" === e[0]; ) e = e.substring(1, e.length);
            return e;
        },
        parseInt: function(t) {
            return parseInt(this.unpad(t), 10);
        }
    }, Date.prototype.fromFormat = function(t, e) {
        return this.setTime(Date.parseFormat(t, e).getTime()), this;
    };
})(), String.prototype.toSize = function(t) {
    var e, a, r, n, s, o, i;
    for (null == t && (t = 0), s = [ "bytes", "KB", "MB", "GB", "TB" ], r = parseInt(this, 10) || 0, 
    e = o = 0, i = s.length; i > o; e = ++o) if (a = s[e], n = r / Math.pow(1024, e), 
    1024 > n) return 0 === e ? 0 === r ? "0KB" : "> 1KB" : n.toFixed(t) + s[e];
    return (r / Math.pow(1024, s.length - 1)).toFixed(t) + s[s.length - 1];
};

var Q, __indexOf = [].indexOf || function(t) {
    for (var e = 0, a = this.length; a > e; e++) if (e in this && this[e] === t) return e;
    return -1;
};

Q = [ "第一次看限制級影片在哪？幾歲？", "Party中你最喜歡哪一位異性？", "你今天的內衣內褲顏色是？", "有沒有愛過不該愛的人（重口味）？", "交往過幾個男/女朋友？", "曾經在哪裡有過最刺激的性經驗？", "有幾次性經驗（不同對象）幾次？", "有過一夜情嗎？最值得回憶的是？", "有無使用成人玩具幫助自慰的經驗？", "性幻想的對象是（明星/Party）？", "你收過最爛的禮物（重口味）？", "對父母/朋友說過最誇張的謊言是？", "你喜歡BL/GL嗎？", "你身上哪個部位最敏感？", "你的兩個好朋友偷偷去看電影沒邀你，你會？", "你有劈腿/被劈腿的經驗嗎？", "如果你有魔法棒，你想變出什麼？", "有沒有最爛的約會經驗？", "如果你可以變成任何動物，你想變成？", "你覺得自己最性感的地方是？", "假設現在你有免死金牌，你想做什麼事？", "如果看到喜歡的對象在你面前睡著，你會？", "曾經發生過最感動的事是？", "你心目中理想的愛人是？", "世界末日將近你只可以救一個人，你想救誰？", "你聽過最瞎的分手理由是？", "對你而言愛情/友情/親情哪一個最重要？", "如果你的知己和你的另一伴交往，你會？", "你做過最瘋狂的事是（重口味）？", "老實說！有沒有偷偷喜歡Andy？", "初吻的年齡是？感覺如何？", "有沒有與同性親密接觸過？", "與愛人約會，遇到前任男/女朋友你會？", "你最經典的搭訕/被搭訕的經驗是？", "有沒有曾經忘記穿內衣褲就出門？", "你願意幫心愛的人洗內衣褲嗎？", "在家會裸體嗎？還是都怎麼穿？", "你曾經幻想自己是哪部電影的角色嗎？", "你是制服控嗎？喜歡哪種制服？", "有跟好友的男/女朋友發生不該發生的事情嗎？", "有跟另一伴的好友發生不該發生的事情嗎？", "有跟『那些年』一樣集體自慰的經驗嗎？", "給你一個機會，你最想摸Andy的哪裡？", "你最想KISS派對中的哪一位異性？", "有偷看過爸媽在性行為嗎？", "是否曾經在外套下做過什麼壞事？", "有幻想過跟Andy發生一夜情嗎？", "有沒有沒戴保險套的經驗？喜歡戴還不戴？", "知道什麼是指套嗎？有用過嗎？", "有沒有去紅燈區消費過？", "喝酒後，發生過最糗的事情是？", "做過最浪漫的事情是？", "最想把誰丟下泳池（不能說Andy）？", "夢想中的婚禮內容是？", "有沒有當過第三者的經驗？", "分享一下告白/被告白的經驗？", "你現在的身高體重是？", "最喜歡的性行為姿勢是？", "理想伴侶的三個條件是？", "是否有跑錯廁所的經驗（男跑女，女跑男）？", "有沒有偷偷尿過床？" ], 
Q.sort(function() {
    return Math.random() > .5 ? !0 : !1;
}), $(function() {
    var t, e, a, r, n, s, o;
    return o = $(window), t = $("body"), n = $("todo"), a = $("#keyin"), r = $("#report td"), 
    e = $("#inbar"), t.on("touchstart", function(e) {
        var n, s;
        return e.preventDefault(), $(t).hasClass("report") ? ($(".num", a).text("?"), $(t).removeClass("report")) : (s = Math.floor(Math.random() * Q.length), 
        n = Q.slice(s, s + 1)[0], Q.splice(s, 1), $(r).text(n), n || $(r).text("ERROR"), 
        $(t).addClass("report"));
    }), e.on("keydown", function(e) {
        var a, n;
        return 13 === e.keyCode ? ($(t).toggleClass("report"), n = parseInt($(this).val(), 10), 
        n > 0 && 10 > n && (n = Math.floor(Math.random() * Q.length), a = Q.slice(n, n + 1)[0], 
        Q.splice(n, 1), $(r).text(a), a || $(r).text("ERROR")), $(this).val("_")) : $(this).val("");
    }), e.on("keyup", function() {
        return $(".num", a).text($(this).val());
    }), s = function() {
        return 0 > __indexOf.call(window, "ontouchstart") && e.focus(), setTimeout(function() {
            return s();
        }, 1500);
    }, s();
});