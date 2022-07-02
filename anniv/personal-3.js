event_name="3周年"
event_id = 142
base_X = 1656516600000 // 5th fixed?
step_X = 1800000


var now_charts = $("#chart-idol").highcharts();

al={
    "0":"天海春香",
    "1":"如月千早",
    "2":"星井美希",
    "3":"萩原雪歩",
    "4":"高槻やよい",
    "5":"菊地真",
    "6":"水瀬伊織",
    "7":"四条貴音",
    "8":"秋月律子",
    "9":"三浦あずさ",
    "10":"双海亜美",
    "11":"双海真美",
    "12":"我那覇響",
    "13":"春日未来",
    "14":"最上静香",
    "15":"伊吹翼",
    "16":"田中琴葉",
    "17":"島原エレナ",
    "18":"佐竹美奈子",
    "19":"所恵美",
    "20":"徳川まつり",
    "21":"箱崎星梨花",
    "22":"野々原茜",
    "23":"望月杏奈",
    "24":"ロコ",
    "25":"七尾百合子",
    "26":"高山紗代子",
    "27":"松田亜利沙",
    "28":"高坂海美",
    "29":"中谷育",
    "30":"天空橋朋花",
    "31":"エミリー スチュアート",
    "32":"北沢志保",
    "33":"舞浜歩",
    "34":"木下ひなた",
    "35":"矢吹可奈",
    "36":"横山奈緒",
    "37":"二階堂千鶴",
    "38":"馬場このみ",
    "39":"大神環",
    "40":"豊川風花",
    "41":"宮尾美也",
    "42":"福田のり子",
    "43":"真壁瑞希",
    "44":"篠宮可憐",
    "45":"百瀬莉緒",
    "46":"永吉昴",
    "47":"北上麗花",
    "48":"周防桃子",
    "49":"ジュリア",
    "50":"白石紬",
    "51":"桜守歌織",
};

f = obj => Object.fromEntries(Object.entries(obj).map(a => a.reverse()))
name2id = f(al)

chart_title = $("span.highcharts-title").text()
idol_name = chart_title.split("  ")[1]
idol_id = name2id[idol_name]
idol_id = String(parseInt(idol_id)+1)



function build_series(data) {
    var series_list = [];
    for (var j = 0; j < 3; j++) {
        series = []
        // 864
        start_i = 864-data[j].data.length
        for (var i = start_i; i < data[j].data.length; i++) {
            point = {}
            point.x = base_X+step_X*i
            point.y = data[j].data[i].score
            series.push(point)
        }
        series_list.push(series)
    }
    return series_list
}

var series_list

$.ajax({
    dataType: "json",
    url: "https://api.matsurihi.me/mltd/v1/events/"+event_id+"/rankings/logs/idolPoint/" + idol_id + "/10,100,1000",
    data: {
        prettyPrint: false
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("error" + idol_id)
    },
    success: function(data) {
        series_list = build_series(data)
        now_charts.addSeries({
            name: "3周年-10位",
            data: series_list[0]
        });
        now_charts.addSeries({
            name: "3周年-100位",
            data: series_list[1]});
        now_charts.addSeries({
            name: "3周年-1000位",
            data: series_list[2]});
    }
})

