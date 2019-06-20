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
    dispatch({}); // 初始化文件
    return {
        getState,
        dispatch,
        subscribe
    }
}

const themeReducer = (state = {themeColor:'red'},action)=>{
  switch(action.type){
    case 'CHANGE_COLOR':
      return {...state,themeColor:action.themeColor};
    default:
      return state;
  }
};
const store = creatStore(themeReducer);
const ThemeContext = React.createContext({ themeColor: '' });
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
                <ThemeContext.Provider value={{ themeColor: '' }}>
                    <Header/>
                    <Content />
                </ThemeContext.Provider>
            </div>
        );
    }
}

export default App;
