// ==UserScript==
// @name          Gilted
// @description   Scroll to comment with most positive reactions on a GitHub issue
// @author        npalladium
// @copyright     npalladium
// @version       0.0.1
// @namespace     https://github.com/npalladium/userscripts
// @license       MIT; https://choosealicense.com/licenses/mit/
// @match         https://github.com/*/issues/*
// @grant         GM_log
// @inject-into   auto
// ==/UserScript==


/**
* @listens popstate
*/
(function () {
  "use strict";

  function parseToIntOrZero(str) {
    return isNaN(str) ? 0 : parseInt(str);
  }

  /**
   * @description
   * Finds the comment with most positive reactions and scrolls to it
   * @remarks
   * gilted roughly means covered with gold
   * GILTED also stands for GitHub Issue Lookup Through Emoji Directions
   */
  function scrollToGiltedComment() {
    "use strict";
    const POSITIVE_REACTIONS = [
      "THUMBS_UP",
      "LAUGH",
      "HOORAY",
      "HEART",
      "ROCKET",
    ];

    const COMMENT_SELECTOR = ".js-comment";
    const COUNT_SELECTOR = "g-emoji+span";

    const comments = [...document.querySelectorAll(COMMENT_SELECTOR)];
    let positiveReactions = [];
    for (let comment of comments) {
      let count = POSITIVE_REACTIONS.reduce(
          (sum, val) =>
              sum +
              parseToIntOrZero(
                  comment.querySelector(`[value~=${val}] ${COUNT_SELECTOR}`)
                      ?.innerHTML
              ),
          0
      );
      positiveReactions.push(count);
    }
    const maxPositiveIndex = positiveReactions.indexOf(
        Math.max(...positiveReactions)
    );
    comments[maxPositiveIndex].scrollIntoView();
  }
  scrollToGiltedComment();
  window.addEventListener("popstate", scrollToGiltedComment());
})();