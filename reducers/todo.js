const intialState =  {
  todos: null
}


const todos = (state = intialState, action) => {
  console.log("ation" , action);
    switch (action.type) {
      case 'ADD_TODO':
       
        return [
          
          ...state,
          {
            id: action.id,
            text: action.paylaod,
            completed: false
          }
        ]

      case "ADD_TODOS":
        console.log("dd");
        console.log("ACTION", action.type)
        console.log("action Payload", action.payload);
        return {
          ...state , 
          todos: action.payload
        }  
      case 'TOGGLE_TODO':
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  
  export default todos
  