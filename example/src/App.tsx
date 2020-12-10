import React from 'react';

import { Renderer } from '../../src/components/Renderer/Renderer';
import { ComponentSchema } from '../../src/types/ComponentSchema';

import '../../src/themes/bootstrap.scss';

const schema: ComponentSchema[] = [
  {
    name: 'table 1',
    type: 'table',
    display: {
      label: 'Table 1'
    },
    data: {
      columns: [
        {
          name: 'table-textField1',
          type: 'text',
          display: {
            label: '1st Text Field in Table'
          }
        },
        {
          name: 'table-textField2',
          type: 'text',
          display: {
            label: '2nd Text Field in Table'
          }
        },
      ]
    }
  },
  {
    name: 'tabs1',
    type: 'tabs',
    data: {
      flattenDataWithParent: true,
    },
    components: [
      {
        name: 'tab1',
        display: {
          label: 'Tab 1'
        },
        components: [
          {
            name: 'textField1',
            type: 'text',
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
            logic: [
              {
                name: 'logic1',
                trigger: 'state.textField1 === "bye"',
                actions: [
                  {
                    schema: { display: { disabled: true }},
                    type: 'updateComponent'
                  }
                ]
              }
            ],
            display: {
              // condition: {
              //   dependency: {
              //     field: 'textField1',
              //     op: 'eq',
              //     value: 'hello'
              //   }
              // }
            },
            validations: {
              required: true,
            }
          },
        ]
      },
      {
        name: 'tab2',
        display: {
          label: 'Tab 2'
        },
        components: [
          {
            name: 'text9',
            type: 'text',
          },
        ]
      }
    ]
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
      title: 'Panel 1',
      expandable: true,
      expanded: true,
    },
    components: [
      {
        name: 'textField+1',
        type: 'text',
        display: {
          tooltip: 'Hola!',
        },
        data: { defaultValue: 'hello textfield+1!' },
      },
      {
        name: 'textField+2',
        type: 'text',
        data: { defaultValue: 'hello textfield+2!' },
      }
    ]
  },
  {
    name: 'errorButton',
    type: 'button',
    text: 'Error!',
    style: "warning",
  },
  {
    name: 'button1',
    type: 'button',
    text: 'Submit',
  },
];

const data = {
  'table 1': [
    {
      'table-textField1': 'table-textField1=1',
    }
  ],
  tab1: {
    textField1: 'hello override',
    email1: 'abc@override.com'
  },
}


const App = () => {
  const submit = (data: any) => {
    alert(JSON.stringify(data));
  }
  return <Renderer schema={schema} data={data} onSubmit={submit} />
}

export default App
