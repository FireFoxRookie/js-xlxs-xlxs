<template>
  <a :href="href" download="text.xlsx">下载xlsx</a>
</template>
<script>
import XLSX from "xlsx";

function workBook() {
  this.SheetNames = [];
  this.Sheets = {};
}

let testData = {
  你好: "hello",
  世界: "world",
  南京: "nanjing",
  北京: "beijing",
  杭州: "hangzhou",
  广州: "guangzhou",
  上海: "shanghai",
  天津: "tianjing",
  合肥: "hefei",
  马鞍山: "maanshan",
  深圳: "shenzheng",
  澳门: "aomen",
  香港: "xianggan",
  武汉: "wuhan",
  厦门: "xiamen",
  海南: "hainan",
  三亚: "sanya",
  南昌: "nanchang",
  郑州: "zhengzhou"
};
export default {
  data() {
    return {
      href: ""
    };
  },
  created() {
    this.getXlsx();
  },
  methods: {
    jsonToArray(jsonData) {
      var arr = [];
      var titleArr = ["key", "value"];
      arr.push(titleArr);
      for (var key in jsonData) {
        var coArr = [];
        coArr.push(key);
        coArr.push(jsonData[key]);
        arr.push(coArr);
      }
      return arr;
    },
    s2ab(str) {
      let buf = new ArrayBuffer(str.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i < str.length; i++) {
        view[i] = str.charCodeAt(i) & 0xff;
      }
      console.log(buf);
      return buf;
    },
    arrayToXlsx(data) {
      var ws = {};
      var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
      for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
          if (range.s.r > R) range.s.r = R;
          if (range.s.c > C) range.s.c = C;
          if (range.e.r < R) range.e.r = R;
          if (range.e.c < C) range.e.c = C;
          var cell = { v: data[R][C] };
          if (cell.v == null) continue;
          var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

          if (typeof cell.v === "number") cell.t = "n";
          else if (typeof cell.v === "boolean") cell.t = "b";
          else if (cell.v instanceof Date) {
            cell.t = "n";
            cell.z = XLSX.SSF._table[14];
            cell.v = datenum(cell.v);
          } else cell.t = "s";
          ws[cell_ref] = cell;
        }
      }
      if (range.s.c < 10000000) ws["!ref"] = XLSX.utils.encode_range(range);
      return ws;
    },
    getXlsx() {
      var wb = new workBook();
      var jsonArr = this.jsonToArray(testData);
      var ws = this.arrayToXlsx(jsonArr);
      console.log(ws);
      wb.SheetNames.push("chinese");
      wb.Sheets["chinese"] = ws;
      let blob = new Blob(
        [
          this.s2ab(
            XLSX.write(
              wb,
              {
                bookType: "xlsx",
                bookSST: false,
                type: "binary"
              } //这里的数据是用来定义导出的格式类型
            )
          )
        ],
        {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        }
      )
      console.log(blob)
      this.href = URL.createObjectURL(blob)
    }
  }
};
</script>