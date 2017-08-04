(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['knockout', 'jquery', 'lodash'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory(require('knockout'), require('jquery'), require('lodash'))
  } else {
    factory(window.ko, window.$, window._)
  }
}(function(ko, $, _) {
  'use strict'

  ko.bindingHandlers.infiniteScroll = {

    init: function(el, valueAccessor, allBindings, viewModel, context) {
      var handler, offset, $container

      $container = allBindings.get('infiniteScrollContainerId') || document

      if (typeof valueAccessor() === 'function') {
        handler = valueAccessor()
        offset = 1500
      } else {
        handler = valueAccessor().handler
        offset = valueAccessor().offset
      }

      armTrigger()
      ko.utils.domNodeDisposal.addDisposeCallback(el, disarmTrigger)

      function triggerPoint() {
        return $(el).offset().top + $(el).outerHeight() - offset
      }

      function scrolledDist() {
        return $(window).scrollTop() + $(window).height()
      }

      function fireInfiniteScroll() {
        return scrolledDist() >= triggerPoint(el)
      }

      function handleScroll() {
        var promise

        if (!fireInfiniteScroll()) return

        promise = handler.call(context.$data)

        if (typeof promise !== 'undefined' && typeof promise.then === 'function') {
          disarmTrigger()
          promise.then(armTrigger)
        }
      }

      function armTrigger() {
        $($container).on('scroll.infinitescroll', _.throttle(handleScroll, 300))
      }

      function disarmTrigger() {
        $($container).off('scroll.infinitescroll')
      }
    }
  }

}))
