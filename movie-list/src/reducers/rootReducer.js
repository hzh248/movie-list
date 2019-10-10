const initState = {
    like: [],
    block: []
}

const rootReducer = (state = initState, action) => {
    let new_like = [...state.like];
    let new_block = [...state.block];
    if (action.type === 'Like_It') {
        if (!new_like.includes(action.id)) {
            new_like.push(action.id);
            return {
                ...state,
                like: new_like
            }
        } else {
            let new_like2 = new_like.filter(movie => {
                return movie !== action.id
            })
            return {
                ...state,
                like: new_like2
            }
        }
    }

    if (action.type === 'Block_It') {
        if (!new_block.includes(action.id)) {
            new_block.push(action.id);
            return {
                ...state,
                block: new_block
            }
        } else {
            let new_block2 = new_block.filter(movie => {
                return movie !== action.id
            })
            return {
                ...state,
                block: new_block2
            }
        }
    }

    return state;
}

export default rootReducer;