import {Button,Color} from '@ds.e/react/lib';

const App = () => {
  return (
    <div>
      <h1>Hello Mono Repo</h1>
      <Color hexCode='green' width='lg' height='lg' ></Color>
      <Button title='I am cute little button'  onClick={()=>alert("Hello")}>Click me</Button>
    </div>
  )
}

export default App