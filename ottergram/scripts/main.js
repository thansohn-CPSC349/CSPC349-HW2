'use strict';

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function showDetails() {
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function cycleImage(offset) {
    var thumbnails = getThumbnailsArray();
    var currentImage = document.querySelector(DETAIL_IMAGE_SELECTOR).getAttribute('src');
    var currentIndex = thumbnails.findIndex(function (element) {
        return element.getAttribute("data-image-url") == currentImage;
    })

    var newIndex = currentIndex + offset;

    if (newIndex < 0) {
        newIndex = thumbnails.length - 1;
    } else if (newIndex >= thumbnails.length) {
        newIndex = 0;
    }

    setDetails(imageFromThumb(thumbnails[newIndex]), titleFromThumb(thumbnails[newIndex]));
    showDetails();
}

function setDetails(imageUrl, titleText) {
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function hideDetails() {
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function imageFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function addKeyPressHandler() {
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();

        if (event.keyCode == ESC_KEY) {
            hideDetails();
        }
    })
}

function initializeEvents() {
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

function getThumbnailIndex(imageUrl) {
    var thumbnails = getThumbnailsArray();

    thumbnails.forEach(function (item, index) {
        if (item.getAttribute("data-image-url") == imageUrl) {
            return index;
        }
    })
}

initializeEvents();