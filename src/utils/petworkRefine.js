import male from "../asset/male.svg";
import female from "../asset/female.svg";
import questionmark from "../asset/questionmark.svg";

const petworkRefineData = (item) => {
  let refineData = {
    sexCd: null,
    upkind: null,
    weight: null,
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
    refineNeuterYN = "중성화 ?";
  }
  refineData.information.push(refineNeuterYN);
  refineData.information.push(item.age + "살");
  refineData.information.push(item.weight + "Kg");
  return refineData;
};

export default petworkRefineData;
