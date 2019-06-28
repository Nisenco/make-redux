import {INIT_COMMENTS,ADD_COMMENT,DELETE_COMMENT} from './actionTypes';
const testReducer = (state = { comments: [] },action)=>{
 switch(action.type){
     case INIT_COMMENTS:
         return {comments:action.comments};
     case ADD_COMMENT:
         return [...state.comments,action.comments];
     case DELETE_COMMENT:
         return {
             comments: [
                 ...state.comments.slice(0, action.commentIndex),
                 ...state.comments.slice(action.commentIndex + 1)
             ]
         };
     default:
         return state;
 }
};
export default testReducer;
