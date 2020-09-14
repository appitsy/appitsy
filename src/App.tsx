import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import Renderer from './components/Renderer/Renderer';
import { ComponentSchema } from './types/ComponentSchema';

import { theme } from './Theme';

interface Page {
  schema: ComponentSchema[]
}

const mySchema: ComponentSchema[] = [
  {
    name: 'textField1',
    type: 'textfield',
    display: {
      labelPosition: 'top'
    },
    data: {
      defaultValue: 'hello textfield!',
    },
    validations: {
      required: true,
      minLength: 5,
      maxLength: 10,
    }
  },
  {
    name: 'email1',
    type: 'email',
    data: {
      defaultValue: 'abc@a.com1',
    },
    validations: {
      required: true,
    }
  },
  {
    name: 'numberfield1',
    type: 'number',
    data: {
      defaultValue: 0,
    },
    validations: {
      required: true,
      minLength: 2,
      maxLength: 4,
      min: 100,
      max: 200
    }
  },
  {
    name: 'textField2',
    type: 'textarea',
    data: {
      defaultValue: 'hello textarea!',
    },
    validations: {
      required: true,
      minLength: 5,
      maxLength: 10,
    }
  },
  {
    name: 'textField2',
    type: 'custom',
    customType: 'my type',
    data: {
      defaultValue: 'hello textarea!',
    },
    validations1: {
      required: true,
    }
  },
  {
    name: 'panel1',
    type: 'panel',
    display: {
      header: {
        background: 'blue',
        color: 'white',
      },
      border: '5px solid grey',
    },
    components: [
      {
        name: 'textField+1',
        type: 'textfield',
        data: { defaultValue: 'hello textfield+1!' },
      },
      {
        name: 'textField+2',
        type: 'textfield',
        data: { defaultValue: 'hello textfield+2!' },
      }
    ]
  },
  {
    name: 'button1',
    type: 'button',
    text: 'Submit',
  }
];


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Renderer schema={mySchema} />
    </ThemeProvider>
  );
}

export default App;
