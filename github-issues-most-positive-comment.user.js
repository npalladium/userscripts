// ==UserScript==
// @name          GitHub Gilted Comment
// @description   Scroll to comment with most positive reactions on a GitHub issue
// @author        npalladium
// @copyright     npalladium
// @version       0.0.2
// @namespace     https://github.com/npalladium/userscripts
// @license       MIT; https://choosealicense.com/licenses/mit/
// @match         https://github.com/*/issues/*
// @grant         GM_log
// @inject-into   auto
// ==/UserScript==



(function(){
  "use strict";
  function scrollToGildedComment() {
    "use strict";
    const REACTIONS = [
      "THUMBS_UP",
      "THUMBS_DOWN",
      "LAUGH",
      "HOORAY",
      "CONFUSED",
      "HEART",
      "ROCKET",
      "EYES",
    ];
    const POSITIVE_REACTIONS = [
      "THUMBS_UP",
      "LAUGH",
      "HOORAY",
      "HEART",
      "ROCKET",
    ];
    const NEGATIVE_REACTIONS = ["THUMBS_DOWN", "CONFUSED"];

    const COMMENT_SELECTOR = ".js-comment";
    const REACTION_SELECTOR = ".reaction-summary-item";

    const parseToInt = str => isNaN(str) ? 0 : parseInt(str);

    const comments = [...document.querySelectorAll(COMMENT_SELECTOR)];
    let positiveReactions = [];
    for (let comment of comments) {
      let count = POSITIVE_REACTIONS.reduce(
          (sum, val) =>
              sum + parseToInt(comment.querySelector(`[value~=${val}] g-emoji+span`)?.innerHTML),
          0
      );
      positiveReactions.push(count);
    }
    const maxPositiveIndex = positiveReactions.indexOf(Math.max(...positiveReactions));
    comments[maxPositiveIndex].scrollIntoView();
  }
  scrollToGildedComment();
  window.addEventListener('popstate', scrollToGildedComment());
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      // scrollToGildedComment();
    }
  }).observe(document, {subtree: true, childList: true});
})();
