if (image_url.includes("src")) {
  image_url = /src=\"(.*?)\">/gm.exec(image_url)[1];
}
if (
  image_options == "(image-options)" ||
  image_options == "" ||
  image_options == null
) {
  image_options = "center center / contain";
} else if (!image_options.match(/\s+/gm)) {
  image_options = `center center / ${image_options}`;
}

document.querySelector(
  "#image"
).style.background = `url("${image_url}") no-repeat  ${image_options}`;

const separatedPinyin = pinyinSeparate(
  document.getElementById("word").getAttribute("data-pinyin")
);
const word = document.getElementById("word").getAttribute("data-characters");

if (!(cardType == "production" && cardSide == "front")) {
  [...word].forEach((character, index) => {
    if (
      character.match(/[\u4E00-\u9FFF]/) == null ||
      (cardType == "comprehension" && cardSide == "front")
    ) {
      var newElement = document.createElement("fg");
      newElement.setAttribute("t", "");
      newElement.textContent = character;
      document.getElementById("word").appendChild(newElement);
    } else {
      var newElement = document.createElement("fg");
      newElement.setAttribute("t", separatedPinyin[0]);
      separatedPinyin.splice(0, 1);
      newElement.textContent = character;
      document.getElementById("word").appendChild(newElement);
    }
  });
}
document
  .getElementById("sentences")
  .querySelectorAll(":scope > *")
  .forEach((sentenceElement) => {
    let separatedPinyin = pinyinSeparate(
      sentenceElement.getAttribute("data-pinyin")
    ).filter((syllable) => syllable != ",");
    let sentence = sentenceElement.getAttribute("data-characters");

    [...sentence].forEach((character, index) => {
      if (character.match(/[\u4E00-\u9FFF]/) == null) {
        var newElement = document.createElement("fg");
        newElement.setAttribute("t", "");
        newElement.textContent = character;
        sentenceElement.appendChild(newElement);
      } else {
        var newElement = document.createElement("fg");
        if (
          [...word].includes(character) &&
          cardType == "comprehension" &&
          cardSide == "front"
        ) {
          newElement.setAttribute("t", "");
          newElement.textContent = character;
        } else if (
          [...word].includes(character) &&
          cardType == "production" &&
          cardSide == "front"
        ) {
          newElement.setAttribute("t", "");
          newElement.textContent = "＿";
        } else {
          newElement.setAttribute("t", separatedPinyin[0]);
          newElement.textContent = character;
        }

        separatedPinyin.splice(0, 1);

        sentenceElement.appendChild(newElement);
      }
    });
  });
