import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import Renderer from './components/Renderer/Renderer';
import { ComponentSchema, PanelDisplaySchema, PanelSchema } from './types/ComponentSchema';

import { theme } from './Theme';

interface Page {
  schema: ComponentSchema[]
}

const mySchema: ComponentSchema[] = [
  {
    name: 'textField1',
    type: 'textfield',
    display: {
      labelPosition: 'top',
      description: 'wow a description',
      tooltip: 'hello?',
      prefix: 'pre',
      suffix: 'suf',
    },
    data: {
      defaultValue: 'hello',
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
    display: {
      condition: {
        dependency: {
          field: 'textField1',
          op: 'eq',
          value: 'hello'
        }
      }
    },
    validations: {
      required: true,
    }
  },
  {
    name: 'numberfield1',
    type: 'number',
    display: {
      disabled: true,
      condition: {
        expression: 'state.textField1 === "hello"'
      }
    },
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
    name: 'password',
    type: 'password',
    display: {
      placeholder: 'Hola. ENtre Passwordo!',
    },
    validations: {
      required: true,
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
      collapsed: false,
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
        display: {
          tooltip: 'Hola!',
        },
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

const data = {
  textField1: 'hello',
  textField2: 'my custom textarea2'
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Renderer schema={mySchema} data={data}/>
    </ThemeProvider>
  );
}

export default App;
