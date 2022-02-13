import * as constants from './constants.js'
import * as utils from './utils.js'


export function add_events() {
    console.log("Adding events.")

    // setting onclick for search box
    add_onclick_for_search_box();

    // onclick for x_mark
    add_onclick_for_xmark();

    add_enter_key_search();

    // remove error message once user starts typing in the search box
    remove_searchbox_error_event();

    // onclick for tab buttons
    add_onclick_tab_buttons();

    console.log("Finished adding events.")
}

function add_onclick_for_search_box() {
    console.log("Adding onclick for searchbox.")
    document.getElementById(constants.SEARCH_SYMBOL_ID).addEventListener("click", utils.searchSymbol);
}

function add_onclick_for_xmark() {
    console.log("Adding on click for xmark")
    document.getElementById(constants.X_MARK_ID).addEventListener("click", utils.x_mark)
}

function remove_searchbox_error_event() {
    console.log("Setting event for searchbox error")
    document.getElementById(constants.SEARCH_BOX_ID).addEventListener("input", utils.remove_searchbox_error)
}

function add_onclick_tab_buttons() {
    console.log("Adding on click events for all tab buttons.")
    var i;
    var tab_buttons = document.getElementsByClassName(constants.TAB_BUTTON_CLASS);

    for (i=0; i < tab_buttons.length; i++){
        tab_buttons[i].addEventListener("click", function() {utils.tab_button_click(this)})
    }
}

function add_enter_key_search() {
    console.log("Adding enter key search.")
    $("#" + constants.SEARCH_BOX_ID).keyup(function(event) {
        if (event.keyCode === 13) {
            $("#" + constants.SEARCH_SYMBOL_ID).click();
        }
    });
}