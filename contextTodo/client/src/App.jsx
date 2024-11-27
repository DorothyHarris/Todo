import './App.css';
import Input from './components/Input/Input';
import Buttons from './components/Buttons/Buttons';
import { TodosContextProvider } from './components/Context/Context';

function App() {
	return (
		<>
			<TodosContextProvider>
				<Input />
				<Buttons />
			</TodosContextProvider>
		</>
	);
}

export default App;
