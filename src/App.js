
import './App.css';
import BoardContainer from './BoardColumn';
import "@lourenci/react-kanban/dist/styles.css";

function App() {
  return (
    <div className="App">
      <h4 style={{textAlign:'center'}}>React Trello</h4>
      <BoardContainer type="uncontrolled" />
    </div>
  );
}

export default App;
