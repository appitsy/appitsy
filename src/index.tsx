import * as React from 'react'
import Renderer from './components/Renderer/Renderer'
import { ComponentSchema } from './types/ComponentSchema'

interface Props {
  schema: ComponentSchema[],
  data: any;
}

const RendererComponent = (props: Props) => {
  return <Renderer schema={props.schema} data={props.data}/>
}

export { RendererComponent };
