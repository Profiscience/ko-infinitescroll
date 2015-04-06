# ko-infinitescroll

[KnockoutJS](http://knockoutjs.com) binding to handle infinite scrolling.

### Usage

```javascript
// in real life this would be a prop on your viewModel
var todos = ko.observableArray([])

function fetchTodos() {
  // `this` is the binding context
  var ctx = this

  ctx._page = ctx._page ? ++ctx._page : 1

  // Return promise so infinite scroll function can be disabled
  // until the call is resolved. If no promise is returned the
  // infinite scroll function is assumed to be synchronous
	return $.get('/todos', { page: ctx._page }, function(newTodos) {

    // append new todos
		todos.push.apply(todos, newTodos)
	})
}

// Load initial todos
fetchTodos()
```

```html
<div data-bind="foreach: todos, infiniteScroll: fetchToDos">
  <div data-bind="template: { name: 'todo-template', data: $data }"></div>
</div>
```

__or__

```html
<div data-bind="foreach: todos, infiniteScroll: { handler: fetchToDos, offset: 2000 }">
  <div data-bind="template: { name: 'todo-template', data: $data }"></div>
</div>
```
*In this second snippet, we specify a different offset (in px). Defaults to 1500px.*

__Depends on Knockout, jQuery, and Lodash__  
_But you're using these already, right?_