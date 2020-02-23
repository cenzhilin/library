export default function reducer(state, action) {
    switch (action.type) {
        case 'setArrange':
            return {
                ...state,
                arrange:action.value
            }
        case 'robot':
            return {
                ...state,
                robotState:action.value
            }
            case 'allNeat':
            return {
                ...state,
                allNeat:action.value
            }
            case 'noNeatList':
            return {
                ...state,
                noNeatList:action.value
            }
            case 'allPlace':
            return {
                ...state,
                allPlace:action.value
            }
            case 'noPlaceList':
            return {
                ...state,
                noPlaceList:action.value
            }
    }

}