// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function listClick() {
  $(this).toggleClass("selected");
  var dataArray = JSON.stringify(createSelectArray());
  $("#proposal_timeline").val(dataArray);
}

function createSelectArray() {
  var thisone;
  var dataArray = [];
  for (var i = 0; i < $(".proposal-chart-row").length; i++) {
    thisone = $(".proposal-chart-row").eq(i);
    if (!thisone.hasClass("hidden")) {
      console.log("not hidden");
      var currentRowData = [];
      for (var j = 0; j < thisone.find("li").length; j++) {
        if (thisone.find("li").eq(j).hasClass("selected")) {
          currentRowData.push("1");
        } else {
          currentRowData.push("0");
        }
      }
      dataArray.push(currentRowData);
    }
  }
  return dataArray;
}

$(document).ready(function(){

  $("#new_phase").on("ajax:success", function(e, data, status, xhr) {
    if (xhr.status == 200) {
      $(".phase-list select").append("<option value='" + data.id + "'>" + data.shortname + "</option>");
      $(".proposal-preview-rows").append('<div id="phaseid-' + data.id + '" class="proposal-chart-row"><div class="proposal-chart-left">' + data.shortname + '</div><div class="proposal-chart-right"><ul class="proposal-chart-select ' + data.department + '"><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li><li><input type="checkbox"></li></ul></div></div>');
      if ($("#proposal_propinfo").val().length > 0) {
        $("#proposal_propinfo").val($("#proposal_propinfo").val() + "," + data.id);
      } else {
        $("#proposal_propinfo").val(data.id);
      }
      $("#phaseid-" + data.id + " li").on("click", listClick);
    }
  })
  .on("ajax:error", function(e, xhr, status, error) {
    console.log(e,xhr,status,error);
  });

  $("#addPhase").on("click", function(event) {
    $("#phaseid-" + $(".phase-list option:selected").val()).removeClass("hidden");
    $("#phaseid-" + $(".phase-list option:selected").val()).appendTo(".proposal-preview-rows");
    if ($("#proposal_propinfo").val().length > 0) {
      $("#proposal_propinfo").val($("#proposal_propinfo").val() + "," + $(".phase-list select").val());
    } else {
      $("#proposal_propinfo").val($(".phase-list select").val());
    }
  });

  $(".proposal-chart-select li").on("click", listClick);


  tinymce.init({
    selector: "#phase_content"
  });
});