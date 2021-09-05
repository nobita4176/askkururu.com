import {
  pick,
  fetch_dict
} from "./dict.js";
(function() {
  const classname_map = {
    攻撃: "atk",
    行動: "act",
    付与: "enh",
    対応: "rea",
    全力: "thr",
    "?": "unknown"
  };
  let dict = null;
  let lang = "ja";
  const taphold_threshold = 750;
  let taphold_timer_id = null;
  const ready = async function() {
    const filename_map = {
      ja: "furuyoni_na_cards.json",
      kr: "furuyoni_na_cards.kr.json"
    };
    if (!(lang in filename_map)) {
      throw new TypeError();
    }
    dict = await fetch_dict(filename_map[lang]);
  };
  $(window).on("DOMContentLoaded", function() {
    ready();
  });
  $(document).on("click", "main", async function() {
    if (dict == null) {
      await ready();
    }
    const pool = dict.normal.filter(function(e) {
      return e.category === "通常札";
    });
    const result = pick(pool, 3);
    const $modal = $("#modal");
    if ($modal.length <= 0) {
      console.error("#modal not found.");
      return;
    }
    $modal.find(".card").each(function(i, elem) {
      $(elem).find(".name").text("「" + result[i].name + "」");
      $(elem).removeClass("atk act enh rea thr unknown inactive");
      if (result[i].maintype in classname_map) {
        $(elem).addClass(classname_map[result[i].maintype]);
      }
      if (result[i].subtype in classname_map) {
        $(elem).addClass(classname_map[result[i].subtype]);
      }
    });
    $("#modal").fadeIn();
  });
  $(document).on("dblclick", "#modal", function() {
    $("#modal").fadeOut();
  });
  $(document).on("click", "#modal #close", function() {
    $("#modal").fadeOut();
  });
  $(document).on("mousedown", "#modal", function() {
    taphold_timer_id = window.setTimeout(function() {
      $("#modal").fadeOut();
      taphold_timer_id = null;
    }, taphold_threshold);
  });
  $(document).on("mouseup", "#modal", function() {
    if (taphold_timer_id) {
      window.clearTimeout(taphold_timer_id);
    }
    taphold_timer_id = null;
  });
  $(document).on("click", "#modal .card", function(ev) {
    $("#modal .card").addClass("inactive");
    $(this).removeClass("inactive");
    ev.stopPropagation();
  });
  $(document).on("change", "#select-lang", function() {
    lang = String($(this).val()) ?? "ja";
    ready();
  });
  $(document).on("click", "#button-lang", function() {
    $(this).addClass("active");
  });
  $(document).on("click", "#button-lang.active .option", function(ev) {
    ev.stopPropagation();
    $("#button-lang .option.selected").removeClass("selected");
    $(this).addClass("selected");
    $("#button-lang").removeClass("active");
    $("#select-lang").val($(this).attr("data-value")).trigger("change");
  });
  $(document).on("click", "#button-na", function() {
    window.location.assign("./index2.html");
  });
})();
