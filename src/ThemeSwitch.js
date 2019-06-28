import  React,{PureComponent}from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from './ThemeProvider';
class ThemeSwitch extends PureComponent{
    static propTypes = {
        themeColor:PropTypes.string,
        onSwitchColor:PropTypes.func,
    };
    constructor(props){
        super(props);
        this._updateThemeColor = this._updateThemeColor.bind(this);
        this.state = {
            themeColor:''
        }
    }
    componentWillMount() {
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
