
export const types = [{num: 0, displayName: 'Total'}, 
                      {num: 1, displayName: 'Home Team'},
                      {num: 2, displayName: 'Away Team'}, ]

export default function (state, action) {
    switch (action.type) {
        case 0: return types[0];
        case 1: return types[1];
        case 2: return types[2];
        default: return state
    }
}