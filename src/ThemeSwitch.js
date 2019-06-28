import  React,{PureComponent}from 'react';
import ThemeProvider from './ThemeProvider';
// const state = this.context;
class ThemeSwitch extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            themeColor:''
        }
    }
    componentDidMount() {
        const store = this.context;
        this._updateThemeColor();
        store.subscribe(()=>this._updateThemeColor());
    }
    _updateThemeColor(){
        const store =this.context;
        const state = store.getState();
        this.setState({
            themeColor:state.themeColor
        })
    }
    handleSwitchColor(color){
        const store = this.context;
        store.dispatch({
            type:'CHANGE_COLOR',
            themeColor:color
        })
    }
    render() {
        const {themeColor} = this.state;
        return(<div>
            <button
                style={{color:themeColor}}
                onClick={this.handleSwitchColor.bind(this, 'red')}
            >Red</button>
            <button
                style={{color:themeColor}}
                onClick={this.handleSwitchColor.bind(this, 'blue')}
            >Blue</button>
        </div>)
    }
}
ThemeSwitch.contextType = ThemeProvider;
export default ThemeSwitch;
