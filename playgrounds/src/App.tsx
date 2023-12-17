import {Button,Color, Text,Margin} from '@ds.e/react/lib';

const App = () => {
  return (
    <div>
      <h1>Hello Mono Repo</h1>
      <Margin  bottom top right left>
      <Text size='xl'>Hello World..!</Text>
      </Margin>

      <Color hexCode='green' width='lg' height='lg' ></Color>
      <Button title='I am cute little button'  onClick={()=>alert("Hello")}>Click me</Button>
    </div>
  )
}

export default App