import {h, diff, patch} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

// impure code below
function app(initModel, update, view, node){
  // until dispatch, takes care of initial page load
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView)
  node.appendChild(rootNode);
  // dispatch should handle the update sequence
  function dispatch(msg){
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    // determines what has changed
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;