/* 
redux在dispatch时，通过循环数组的方式，执行每一个subscribe的依赖，但在实际项目中，只需要执行需要更新的组件相应的依赖
思路：在subscribe绑定依赖的同时，为依赖添加相应的依赖名（lisName），以键值对的形式保存到listeners中
在dispatch时，根据传入的依赖名[lisName1,lisName2,...]，通过循环执行相应的依赖即可
*/

const createStore = function createStore(reducer) {
    let state,
        listeners = {}
    const getState = function () {
        return state
    }
    const dispatch = function (action, lisNames) {
        if (!(lisNames instanceof Array)) throw new TypeError('Expected lisNames to be an Array')
        if (!(typeof action === 'object')) throw new TypeError('Expected action to be an Object')
        if (action.type === 'undefined') throw new TypeError('Action expects a property with "type"')
        state = reducer(state, action)
        lisNames.forEach(item => listeners[item]())
    }
    dispatch({
    }, [])
    const subscribe = function (listener, lisName) {
        if (typeof lisName !== 'string') throw new TypeError('Not a string')
        if (!(typeof listener === 'function')) throw new TypeError('Not a function')
        if (!Object.hasOwn(listeners, lisName)) {
            listeners[lisName] = listener
        }
    }
    return {
        dispatch,
        getState,
        subscribe
    }
}
export default createStore