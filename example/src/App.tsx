import React, { useState } from 'react';

import { Renderer } from '../../src/components/Renderer/Renderer';
import { ComponentSchema } from '../../src/types/ComponentSchema';

import '../../src/themes/bootstrap.scss';

const schema: ComponentSchema[] = [
  {
    type: 'checkbox',
    name: 'Checbox1',
    display: {
      label: 'My Checkbox',
    },
  },
  {
    type: 'multi-checkbox',
    name: 'multi-Checbox1',
    display: {
      label: 'My Checkbox',
    },
    data: {
      checkboxes: [
        {
          name: 'ch1',
          label: 'Check1'
        },
        {
          name: 'ch2',
          label: 'Check2'
        },
        {
          name: 'ch3',
          label: 'Check3'
        }
      ]
    }
  },
  {
    name: 'table 1',
    type: 'table',
    display: {
      label: 'Table 1',
    },
    data: {
      addNewDefault: '({ "table-textField1": "my add new default", "table-textField2-object": { "table-textField2": uuid() } })',
      atleastOneRow: true,
      columns: [
        {
          name: 'table-textField1',
          type: 'text',
          display: {
            label: '1st Text Field in Table'
          }
        },
        {
          name: 'table-textField2-object',
          display: {
            label: 'table-textField2-phh',
            hideLabel: true,
          },
          type: 'object',
          components: [
            {
              name: 'table-textField2',
              type: 'text',
              display: {
                hideLabel: true,
              }
            },
          ]
        },
      ]
    }
  },
  {
    name: 'tabs1',
    type: 'tabs',
    data: {
      path: '',
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
            // logic: [
            //   {
            //     name: 'logic1',
            //     trigger: 'state.textField1 === "bye"',
            //     actions: [
            //       {
            //         schema: { display: { disabled: true }},
            //         type: 'updateComponent'
            //       }
            //     ]
            //   }
            // ],
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

const data: any = {
  'table 1': [
    {
      'table-textField1': 'table-textField1=1',
      'table-textField2-object': {
        'table-textField2': 'table-textField2-value'
      }
    },
    {
      'table-textField1': 'table-textField1=2',
      'table-textField2-object': {
        'table-textField2': 'phhh'
      }
    }
  ],
  tab1: {
    textField1: 'hello override',
    email1: 'abc@override.com'
  },
}


const App = () => {
  const [dataState, setData] = useState(data);
  const [schemaState, ] = useState(schema);
  const submit = (_data: any) => {
    alert(JSON.stringify(_data));
    // setData({...data, ...{
    //   'table 1': [],
    // }})
  }

  const changeData = (data: any) => {
    setData(data);
  }

  return <Renderer schema={schemaState} data={dataState} onSubmit={submit} onDataChange={changeData} />
}

export default App
