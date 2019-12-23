// Library to render things in the DOM
// We used npm to use them instead of adding the script url
import hh from 'hyperscript-helpers';
import {h, diff, patch} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

// hh(h) is like tags
// We are destructuring the functions we want out of the hh(h)
// hh(h) function returns an object, that is how it works
const { div, button } = hh(h);

const initModel = 0;

// This takes care of everything that gets rendered
// Apparently you can return multiple elements if inside an array
// model is a more generic name (in this case is jusst the Count number)
function view (dispatch, model){
  return div([
    div({ className: 'mv2' }, `Count: ${model}`),
    button({className: 'pv1 ph2 mr2', onclick: () => dispatch(MSGS.ADD)}, '+'),
    button({className: 'pv1 ph2', onclick: () => dispatch(MSGS.SUBTRACT)}, '-')
  ])
}

const MSGS = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
}

// Update because is responsible for updating the apps model
// needs to know which button was pushed and what is the current value of model
function update(msg, model){
  switch (msg) {
    case MSGS.ADD:
      return model + 1;
    case MSGS.SUBTRACT:
      return model - 1;
    default:
      return model;
  }
}

// impure code below
function app(initModel, update, view, node){
  // until dispatch, takes care of initial page load
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView)
  node.appendChild(rootNode);
  // dispatch shsould handle the update sequence
  function dispatch(msg){
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    // determines what has changed
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

const rootNode = document.getElementById('app');

app(initModel, update, view, rootNode);
