al = {
    "0": "天海 春香",
    "1": "如月 千早",
    "2": "星井 美希",
    "3": "萩原 雪歩",
    "4": "高槻 やよい",
    "5": "菊地 真",
    "6": "水瀬 伊織",
    "7": "四条 貴音",
    "8": "秋月 律子",
    "9": "三浦 あずさ",
    "10": "双海 亜美",
    "11": "双海 真美",
    "12": "我那覇 響",
    "13": "春日 未来",
    "14": "最上 静香",
    "15": "伊吹 翼",
    "16": "田中 琴葉",
    "17": "島原 エレナ",
    "18": "佐竹 美奈子",
    "19": "所 恵美",
    "20": "徳川 まつり",
    "21": "箱崎 星梨花",
    "22": "野々原 茜",
    "23": "望月 杏奈",
    "24": "伴田 路子",
    "25": "七尾 百合子",
    "26": "高山 紗代子",
    "27": "松田 亜利沙",
    "28": "高坂 海美",
    "29": "中谷 育",
    "30": "天空橋 朋花",
    "31": "エミリー スチュアート",
    "32": "北沢 志保",
    "33": "舞浜 歩",
    "34": "木下 ひなた",
    "35": "矢吹 可奈",
    "36": "横山 奈緒",
    "37": "二階堂 千鶴",
    "38": "馬場 このみ",
    "39": "大神 環",
    "40": "豊川 風花",
    "41": "宮尾 美也",
    "42": "福田 のり子",
    "43": "真壁 瑞希",
    "44": "篠宮 可憐",
    "45": "百瀬 莉緒",
    "46": "永吉 昴",
    "47": "北上 麗花",
    "48": "周防 桃子",
    "49": "ジュリア",
    "50": "白石 紬",
    "51": "桜守 歌織",
};

var dataA = {};
var count = 1;
l = window.location.href.split('/')
event_id = l[l.length-1]
event_id = event_id.split("#")[0]

function getdata(idol_id) {
    $.ajax({
        dataType: "json",
        url: "https://api.matsurihi.me/mltd/v1/events/"+event_id+"/rankings/logs/idolPoint/" + idol_id + "/1,2,3,10,100,1000",
        data: {
            prettyPrint: false
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error" + idol_id)
        },
        success: function(data) {
            dataA[count] = data;
            count++;
            if (idol_id < 52) {
                getdata(idol_id + 1)
            } else {
                getrank(1000);
                document.write("<br>");
                getrank(100)
            }
        }
    })
}

function getrank(rrank) {
    if (rrank == 1000) {
        rank = 5
    }
    if (rrank == 100) {
        rank = 4
    }
    var idlist = [];
    var data1000 = [];
    for (var i = 1; i <= 52; i++) {
        if (dataA[i].hasOwnProperty(rank)) {
            var len = dataA[i][rank].data["length"];
            idlist.push(al[i - 1]);
            data1000.push(dataA[i][rank].data[len - 1].score)
        }
    }
    for (var i = 0; i < data1000.length; i++) {
        for (var j = i; j < data1000.length; j++) {
            if (data1000[j] > data1000[i]) {
                tmp = data1000[j];
                data1000[j] = data1000[i];
                data1000[i] = tmp;
                tmp2 = idlist[j];
                idlist[j] = idlist[i];
                idlist[i] = tmp2
            }
        }
    }
    document.write(rrank + "排名<br>");
    for (var i = 0; i < data1000.length; i++) {
        document.write(i+1 + " " + idlist[i] + " : " + data1000[i] + "<br>")
    }
}
getdata(1);