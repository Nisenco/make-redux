import {INIT_COMMENTS,ADD_COMMENT,DELETE_COMMENT} from './actionTypes';
const initComments = (comments)=>{
    return {
        type:INIT_COMMENTS,
        comments
    }
};
const addComment = (comment)=>{
    return {
        type:ADD_COMMENT,
        comment
    }
};
const deleteComment = (commentIndex)=>{
    return {
        type:DELETE_COMMENT,
        commentIndex
    }
};
export {
    initComments,
    addComment,
    deleteComment
}
