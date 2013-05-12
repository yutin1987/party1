(function() {
    Date.format = function(e, t) {
        var a = Date.formatLogic, r = -1 !== t.indexOf("a") || -1 !== t.indexOf("A"), n = [];
        n.d = e.getDate(), n.dd = a.pad(n.d, 2), n.ddd = a.i18n.shortDayNames[e.getDay()], 
        n.dddd = a.i18n.dayNames[e.getDay()], n.M = e.getMonth() + 1, n.MM = a.pad(n.M, 2), 
        n.MMM = a.i18n.shortMonthNames[n.M - 1], n.MMMM = a.i18n.monthNames[n.M - 1], n.yyyy = e.getFullYear(), 
        n.yyy = a.pad(n.yyyy, 2) + "y", n.yy = a.pad(n.yyyy, 2), n.y = "y", n.H = e.getHours(), 
        n.hh = a.pad(r ? a.convertTo12Hour(n.H) : n.H, 2), n.h = r ? a.convertTo12Hour(n.H) : n.H, 
        n.HH = a.pad(n.H, 2), n.m = e.getMinutes(), n.mm = a.pad(n.m, 2), n.s = e.getSeconds(), 
        n.ss = a.pad(n.s, 2), n.z = e.getMilliseconds(), n.zz = n.z + "z", n.zzz = a.pad(n.z, 3), 
        n.ap = 12 > n.H ? "am" : "pm", n.a = 12 > n.H ? "am" : "pm", n.AP = 12 > n.H ? "AM" : "PM", 
        n.A = 12 > n.H ? "AM" : "PM";
        for (var s = 0, o = "", u = ""; t.length > s; ) {
            for (u = t.charAt(s); t.length > s + 1 && void 0 !== n[u + t.charAt(s + 1)]; ) u += t.charAt(++s);
            o += void 0 !== n[u] ? n[u] : u, s++;
        }
        return o;
    }, Date.formatLogic = {
        pad: function(e, t) {
            var a = 1, r = "";
            if (1 > t) return "";
            for (var n = 0; t > n; n++) a *= 10, r += "0";
            var s = e;
            return s = r + e, s = s.substring(s.length - t);
        },
        convertTo12Hour: function(e) {
            return 0 === e % 12 ? 12 : e % 12;
        },
        i18n: {
            dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            shortDayNames: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            shortMonthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        }
    }, Date.prototype.toFormat = function(e) {
        return Date.format(this, e);
    }, Date.parseFormat = function(e, t) {
        var a = new Date(2e3, 0, 1), r = [];
        r.d = "([0-9][0-9]?)", r.dd = "([0-9][0-9])", r.M = "([0-9][0-9]?)", r.MM = "([0-9][0-9])", 
        r.yyyy = "([0-9][0-9][0-9][0-9])", r.yyy = "([0-9][0-9])[y]", r.yy = "([0-9][0-9])", 
        r.H = "([0-9][0-9]?)", r.hh = "([0-9][0-9])", r.h = "([0-9][0-9]?)", r.HH = "([0-9][0-9])", 
        r.m = "([0-9][0-9]?)", r.mm = "([0-9][0-9])", r.s = "([0-9][0-9]?)", r.ss = "([0-9][0-9])", 
        r.z = "([0-9][0-9]?[0-9]?)", r.zz = "([0-9][0-9]?[0-9]?)[z]", r.zzz = "([0-9][0-9][0-9])", 
        r.ap = "([ap][m])", r.a = "([ap][m])", r.AP = "([AP][M])", r.A = "([AP][M])";
        for (var n = Date.parseLogic, s = 0, o = "", u = Array(""), i = ""; t.length > s; ) {
            for (i = t.charAt(s); t.length > s + 1 && void 0 !== r[i + t.charAt(s + 1)]; ) i += t.charAt(++s);
            void 0 !== r[i] ? (o += r[i], u[u.length] = i) : o += i, s++;
        }
        var y = RegExp(o), c = e.match(y);
        if (void 0 === c || c.length !== u.length) return void 0;
        for (s = 0; u.length > s; s++) if ("" !== u[s]) switch (u[s]) {
          case "yyyy":
          case "yyy":
            a.setYear(n.parseInt(c[s]));
            break;

          case "yy":
            a.setYear(2e3 + n.parseInt(c[s]));
            break;

          case "MM":
          case "M":
            a.setMonth(n.parseInt(c[s]) - 1);
            break;

          case "dd":
          case "d":
            a.setDate(n.parseInt(c[s]));
            break;

          case "hh":
          case "h":
          case "HH":
          case "H":
            a.setHours(n.parseInt(c[s]));
            break;

          case "mm":
          case "m":
            a.setMinutes(n.parseInt(c[s]));
            break;

          case "ss":
          case "s":
            a.setSeconds(n.parseInt(c[s]));
            break;

          case "zzz":
          case "zz":
          case "z":
            a.setMilliseconds(n.parseInt(c[s]));
            break;

          case "AP":
          case "A":
          case "ap":
          case "a":
            ("PM" === c[s] || "pm" === c[s]) && 12 > a.getHours() && a.setHours(a.getHours() + 12), 
            "AM" !== c[s] && "am" !== c[s] || 12 !== a.getHours() || a.setHours(0);
        }
        return a;
    }, Date.parseLogic = {
        unpad: function(e) {
            for (var t = e; t.length > 1 && "0" === t[0]; ) t = t.substring(1, t.length);
            return t;
        },
        parseInt: function(e) {
            return parseInt(this.unpad(e), 10);
        }
    }, Date.prototype.fromFormat = function(e, t) {
        return this.setTime(Date.parseFormat(e, t).getTime()), this;
    };
})(), String.prototype.toSize = function(e) {
    var t, a, r, n, s, o, u;
    for (null == e && (e = 0), s = [ "bytes", "KB", "MB", "GB", "TB" ], r = parseInt(this, 10) || 0, 
    t = o = 0, u = s.length; u > o; t = ++o) if (a = s[t], n = r / Math.pow(1024, t), 
    1024 > n) return 0 === t ? 0 === r ? "0KB" : "> 1KB" : n.toFixed(e) + s[t];
    return (r / Math.pow(1024, s.length - 1)).toFixed(e) + s[s.length - 1];
};

var Q;

Q = [ "第一次看限制級影片在哪？幾歲？", "Party中你最喜歡哪一位異性？", "你今天的內衣內褲顏色是？", "有沒有愛過不該愛的人（重口味）？", "交往過幾個男/女朋友？", "曾經在哪裡有過最刺激的性經驗？", "有幾次性經驗（不同對象）幾次？", "有過一夜情嗎？最值得回憶的是？", "有無使用成人玩具幫助自慰的經驗？", "性幻想的對象是（明星/Party）？", "你收過最爛的禮物（重口味）？", "對父母/朋友說過最誇張的謊言是？", "你喜歡BL/GL嗎？", "你身上哪個部位最敏感？", "你的兩個好朋友偷偷去看電影沒邀你，你會？", "你有劈腿/被劈腿的經驗嗎？", "如果你有魔法棒，你想變出什麼？", "有沒有最爛的約會經驗？", "如果你可以變成任何動物，你想變成？", "你覺得自己最性感的地方是？", "假設現在你有免死金牌，你想做什麼事？", "如果看到喜歡的對象在你面前睡著，你會？", "曾經發生過最感動的事是？", "你心目中理想的愛人是？", "世界末日將近你只可以救一個人，你想救誰？", "你聽過最瞎的分手理由是？", "對你而言愛情/友情/親情哪一個最重要？", "如果你的知己和你的另一伴交往，你會？", "你做過最瘋狂的事是（重口味）？", "老實說！有沒有偷偷喜歡Andy？", "初吻的年齡是？感覺如何？", "有沒有與同性親密接觸過？", "與愛人約會，遇到前任男/女朋友你會？", "你最經典的搭訕/被搭訕的經驗是？", "有沒有曾經忘記穿內衣褲就出門？", "你願意幫心愛的人洗內衣褲嗎？", "在家會裸體嗎？還是都怎麼穿？", "你曾經幻想自己是哪部電影的角色嗎？", "你是制服控嗎？喜歡哪種制服？", "有跟好友的男/女朋友發生不該發生的事情嗎？", "有跟另一伴的好友發生不該發生的事情嗎？", "有跟『那些年』一樣集體自慰的經驗嗎？", "給你一個機會，你最想摸Andy的哪裡？", "你最想KISS派對中的哪一位異性？", "有偷看過爸媽在性行為嗎？", "請說出你的SIZE（女生上圍，男生勃起）？", "是否曾經在外套下做過什麼壞事？", "有幻想過跟Andy發生一夜情嗎？", "有沒有沒戴保險套的經驗？喜歡戴還不戴？", "知道什麼是指套嗎？有用過嗎？", "有沒有去紅燈區消費過？", "喝酒後，發生過最糗的事情是？", "做過最浪漫的事情是？", "最想把誰丟下泳池（不能說Andy）？", "夢想中的婚禮內容是？", "有沒有當過第三者的經驗？", "分享一下告白/被告白的經驗？", "你現在的身高體重是？", "最喜歡的性行為姿勢是？", "理想伴侶的三個條件是？", "是否有跑錯廁所的經驗（男跑女，女跑男）？", "有沒有偷偷尿過床？" ], 
Q.sort(function() {
    return Math.random() > .5 ? !0 : !1;
}), $(function() {
    var e, t, a, r, n, s, o;
    return o = $(window), e = $("body"), n = $("todo"), a = $("#keyin"), r = $("#report td"), 
    t = $("#inbar"), e.on("touchstart", function() {
        var t, n;
        return $(e).hasClass("report") ? ($(".num", a).text("?"), $(e).removeClass("report")) : (n = Math.floor(9 * Math.random()) + 1, 
        t = Q.slice(n, n + 1)[0], Q.splice(n, 1), $(r).text(t), t || $(r).text("ERROR"), 
        $(e).addClass("report"));
    }), t.on("keydown", function(t) {
        var a, n;
        return 13 === t.keyCode ? ($(e).toggleClass("report"), n = parseInt($(this).val(), 10), 
        n > 0 && 10 > n && (a = Q.slice(n, n + 1)[0], Q.splice(n, 1), $(r).text(a), a || $(r).text("ERROR")), 
        $(this).val("_")) : $(this).val("");
    }), t.on("keyup", function() {
        return $(".num", a).text($(this).val());
    }), s = function() {
        return t.focus(), setTimeout(function() {
            return s();
        }, 1500);
    }, s();
});