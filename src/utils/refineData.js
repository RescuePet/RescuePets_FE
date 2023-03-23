import male from "../asset/male.svg";
import female from "../asset/female.svg";
import questionmark from "../asset/questionmark.svg";

const refineData = (item) => {
  const refinedata = {
    kind: "",
    kindCd: "",
    sexCd: "",
    information: [],
  };
  if (item) {
    refinedata.kind = item.kindCd.split(/\[|\]/g)[1];
    refinedata.kindCd = item.kindCd.split(/\[|\]/g)[2];
    if (refinedata.kind === "개") {
      refinedata.kind = "강아지";
    }
    if (item.sexCd === "Q") {
      refinedata.sexCd = questionmark;
    } else if (item.sexCd === "M") {
      refinedata.sexCd = male;
    } else if (item.sexCd === "F") {
      refinedata.sexCd = female;
    }
    if (item.neuterYn === "U") {
      refinedata.information.push("모름");
    } else if (item.neuterYn === "Y") {
      refinedata.information.push("중성화 O");
    } else if (item.neuterYn === "N") {
      refinedata.information.push("중성화 X");
    }
    refinedata.information.push(item.age);
    refinedata.information.push(item.weight);
    refinedata.information.push(item.colorCd);

    return refinedata;
  }
  return console.log("refineData Error");
};

export default refineData;
