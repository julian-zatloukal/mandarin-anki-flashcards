class Card {
  constructor(
    cardType,
    entry,
    entry_pinyin,
    description,
    sentence,
    sentence_pinyin,
    image,
    image_options
  ) {
    this.cardType = cardType;
    this.entry = entry;
    this.entry_pinyin = entry_pinyin;
    this.description = description;
    this.sentence = sentence;
    this.sentence_pinyin = sentence_pinyin;
    this.image = image;
    this.image_options = image_options;
  }

  throwError(error) {
    console.log(error);
  }

  resolveImage() {
    if (this.image.includes("src")) {
      try {
        this.image = /src=\"(.*?)\">/gm.exec(this.image)[1];
      } catch (e) {
        this.throwError(e);
      }
    }
    if (
      this.image_options == "(image-options)" ||
      this.image_options == "" ||
      this.image_options == null
    ) {
      this.image_options = "center center / contain";
    } else if (!this.image_options.match(/\s+/gm)) {
      this.image_options = `center center / ${this.image_options}`;
    }
  }

  loadImage() {
    try {
      document.querySelector(
        "#image"
      ).style.background = `url("${this.image}") no-repeat  ${this.image_options}`;
    } catch (e) {
      this.throwError(e);
    }
  }

  initialize() {
    this.resolveImage();
    this.loadImage();
    var cardHandler = new this.cardType(this);
    cardHandler.handle();
  }
}

class CardTypes {
  static ComprehensionFront = class {
    constructor(cardData) {
      this.cardData = cardData;
    }

    handle() {
      this.loadEntry();
      this.loadSentences();
    }

    loadEntry() {
      [...this.cardData.entry].forEach((character, index) => {
        var newElement = document.createElement("fg");
        newElement.setAttribute("t", "");
        newElement.textContent = character;
        document.getElementById("entry").appendChild(newElement);
      });
    }

    loadSentences() {
      let separatedPinyin = pinyinSeparate(
        this.cardData.sentence_pinyin
      ).filter((syllable) => syllable != ",");

      [...this.cardData.sentence].forEach((character, index) => {
        if (
          character.match(/[\u4E00-\u9FFF]/) &&
          ![...this.cardData.entry].includes(character)
        ) {
          // If it is a chinese character and is not included in entry
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", separatedPinyin[0]);
          newElement.textContent = character;
          separatedPinyin.splice(0, 1);
          document.querySelector("#sentence li").appendChild(newElement);
        } else if (
          character.match(/[\u4E00-\u9FFF]/) &&
          [...this.cardData.entry].includes(character)
        ) {
          // If it is a chinese character and is included in entry
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", "");
          newElement.textContent = character;
          separatedPinyin.splice(0, 1);
          document.querySelector("#sentence li").appendChild(newElement);
        } else {
          // If it is not a chinese character
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", "");
          newElement.textContent = character;
          document.querySelector("#sentence li").appendChild(newElement);
        }
      });
    }
  };

  static ComprehensionBack = class {
    constructor(cardData) {
      this.cardData = cardData;
    }

    handle() {
      this.loadEntry();
      this.loadDescription();
      this.loadSentences();
    }

    loadEntry() {
      [...this.cardData.entry].forEach((character, index) => {
        var newElement = document.createElement("fg");
        newElement.setAttribute("t", "");
        newElement.textContent = character;
        document.getElementById("entry").appendChild(newElement);
      });
    }

    loadDescription() {
      document.querySelector(
        "#description"
      ).textContent = this.cardData.description;
    }

    loadSentences() {
      let separatedPinyin = pinyinSeparate(
        this.cardData.sentence_pinyin
      ).filter((syllable) => syllable != ",");

      [...this.cardData.sentence].forEach((character, index) => {
        if (character.match(/[\u4E00-\u9FFF]/)) {
          // If it is a chinese character
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", separatedPinyin[0]);
          newElement.textContent = character;
          separatedPinyin.splice(0, 1);
          document.querySelector("#sentence li").appendChild(newElement);
        } else {
          // If it is not a chinese character
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", "");
          newElement.textContent = character;
          document.querySelector("#sentence li").appendChild(newElement);
        }
      });
    }
  };

  static ProductionFront = class {
    constructor(cardData) {
      this.cardData = cardData;
    }

    handle() {
      this.loadDescription();
      this.loadSentences();
    }

    loadDescription() {
      document.querySelector(
        "#description"
      ).textContent = this.cardData.description;
    }

    loadSentences() {
      let separatedPinyin = pinyinSeparate(
        this.cardData.sentence_pinyin
      ).filter((syllable) => syllable != ",");

      [...this.cardData.sentence].forEach((character, index) => {
        if (
          character.match(/[\u4E00-\u9FFF]/) &&
          ![...this.cardData.entry].includes(character)
        ) {
          // If it is a chinese character and is not included in entry
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", separatedPinyin[0]);
          newElement.textContent = character;
          separatedPinyin.splice(0, 1);
          document.querySelector("#sentence li").appendChild(newElement);
        } else if (
          character.match(/[\u4E00-\u9FFF]/) &&
          [...this.cardData.entry].includes(character)
        ) {
          // If it is a chinese character and is included in entry
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", "");
          newElement.textContent = "＿";
          separatedPinyin.splice(0, 1);
          document.querySelector("#sentence li").appendChild(newElement);
        } else {
          // If it is not a chinese character
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", "");
          newElement.textContent = character;
          document.querySelector("#sentence li").appendChild(newElement);
        }
      });
    }
  };

  static ProductionBack = class {
    constructor(cardData) {
      this.cardData = cardData;
    }

    handle() {
      this.loadEntry();
      this.loadDescription();
      this.loadSentences();
    }

    loadEntry() {
      [...this.cardData.entry].forEach((character, index) => {
        var newElement = document.createElement("fg");
        newElement.setAttribute("t", "");
        newElement.textContent = character;
        document.getElementById("entry").appendChild(newElement);
      });
    }

    loadDescription() {
      document.querySelector(
        "#description"
      ).textContent = this.cardData.description;
    }

    loadSentences() {
      let separatedPinyin = pinyinSeparate(
        this.cardData.sentence_pinyin
      ).filter((syllable) => syllable != ",");

      [...this.cardData.sentence].forEach((character, index) => {
        if (character.match(/[\u4E00-\u9FFF]/)) {
          // If it is a chinese character
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", separatedPinyin[0]);
          newElement.textContent = character;
          separatedPinyin.splice(0, 1);
          document.querySelector("#sentence li").appendChild(newElement);
        } else {
          // If it is not a chinese character
          var newElement = document.createElement("fg");
          newElement.setAttribute("t", "");
          newElement.textContent = character;
          document.querySelector("#sentence li").appendChild(newElement);
        }
      });
    }
  };
}
