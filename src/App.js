import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from './Header';
import Content  from './Content';
function creatStore(reducer){
    let state = null;
    const listeners = [];
    const subscribe = (listener)=>listeners.push(listener);
    const getState = ()=>state;
    const dispatch = (action)=>{
        state = reducer(state,action);
        listeners.map(listener=>listener());
    };
    dispatch({});
    return {
        getState,
        dispatch,
        subscribe
    }
}

const themeReducer = (state,action)=>{
  if(!state){
      return {
      themeColor:'red',
      }
  }
  switch(action.type){
    case 'CHANGE_COLOR':
      return {...state,themeColor:action.themeColor};
    default:
      return state;
  }
};
const store = creatStore(themeReducer);
class App extends PureComponent {
    static childContextTypes = {
        store: PropTypes.object
    };
    constructor(props){
        super(props);
    }
    getChildContext(){
        return {store}
    }
    render(){
        return (
            <div className="App">
                <Header/>
                <Content />
            </div>
        );
    }
}

export default App;
