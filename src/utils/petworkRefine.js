import male from "../asset/male.svg";
import female from "../asset/female.svg";
import questionmark from "../asset/questionmark.svg";

const petworkRefineData = (item) => {
  let refineData = {
    sexCd: null,
    upkind: null,
    information: [],
  };
  let refineNeuterYN = null;
  if (item.sexCd === "MALE") {
    refineData.sexCd = male;
  } else if (item.sexCd === "FEMALE") {
    refineData.sexCd = female;
  } else {
    refineData.sexCd = questionmark;
  }
  if (item.upkind === "DOG") {
    refineData.upkind = "강아지";
  } else if (item.upkind === "CAT") {
    refineData.upkind = "고양이";
  } else {
    refineData.upkind = "기타축종";
  }
  if (item.neuterYn === "YES") {
    refineNeuterYN = "중성화 O";
  } else if (item.neuterYN === "NO") {
    refineNeuterYN = "중성화 X";
  } else {
    refineNeuterYN = "모름";
  }
  refineData.information.push(refineNeuterYN);
  refineData.information.push(item.age);
  refineData.information.push(item.colorCd);
  return refineData;
};

export default petworkRefineData;
