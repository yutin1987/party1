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
        var c = RegExp(o), y = e.match(c);
        if (void 0 === y || y.length !== u.length) return void 0;
        for (s = 0; u.length > s; s++) if ("" !== u[s]) switch (u[s]) {
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

Q = [ "AAA", "BBB", "CCC" ], Q.sort(function() {
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