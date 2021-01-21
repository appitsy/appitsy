import '../../src/themes/bootstrap.scss';

import React from 'react';

import { Form } from '../../src/components/Form/Form';
import { ComponentSchema } from '../../src/types/ComponentSchema';

const schema: ComponentSchema[] = [
  {
    type: 'number',
    name: 'Number1',
    display: {
      label: 'My Number',
    },
    validations: {
      required: true,
      min: 100,
      max: 200
    }
  },
  {
    type: 'checkbox',
    name: 'Checbox1',
    display: {
      label: 'My Checkbox',
    },
    validations: {
      required: true,
    }
  },
  {
    type: 'radio',
    name: 'radio1',
    display: {
      label: 'My Radio Buttons',
    },
    data: {
      options: [
        {
          label: 'Radio 1',
          value: 'r1'
        },
        {
          label: 'Radio 2',
          value: 'r2'
        },
        {
          label: 'Radio 3',
          value: 'r3'
        }
      ]
    },
    validations: {
      required: true,
    }
  },
  {
    type: 'select',
    name: 'Select1',
    display: {
      label: 'My Select',
    },
    data: {
      options: [
        {
          label: 'label1',
          value: 'name1',
        },
        {
          label: 'label2',
          value: 'name2',
        }
      ],
      defaultValue: 'name1',
    },
    validations: {
      required: true,
    }
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
          value: 'ch1',
          label: 'Check1'
        },
        {
          value: 'ch2',
          label: 'Check2'
        },
        {
          value: 'ch3',
          label: 'Check3'
        }
      ],
      defaultValue: [
        'ch1',
        'ch3'
      ]
    },
    validations: {
      required: true,
    }
  },
  {
    name: 'table 1',
    type: 'table',
    display: {
      label: 'Table 1',
      atleastOneRow: true,
    },
    data: {
      addNewDefault: '({ "table-textField1": "my add new default", "table-textField2-object": { "table-textField2": uuid() } })',
    },
    components: [
      {
        name: 'table-textField1',
        type: 'text',
        display: {
          label: '1st Text Field in Table'
        }
      },
      {
        name: 'table-row-expand',
        type: 'table-row-expand',
        components: [
          {
            name: 'table-textField2',
            type: 'text',
            display: {
              label: 'Inside expanded row'
            }
          },
        ]
      },
      {
        name: 'table-textField2-object',
        display: {
          label: 'table-textField2-phh',
          hideLabel: true,
        },
        type: 'text',
        components: [
          {
            name: 'table-textField2',
            type: 'text',
            display: {
              hideLabel: true,
            }
          },
        ]
      }
    ],
  },
  {
    name: 'tabs1',
    type: 'tabs',
    data: {
      path: '$.path',
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
    name: 'columns1',
    type: 'columns',
    display: {
      label: 'My Column',
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
    name: 'panel1',
    type: 'panel',
    display: {
      label: 'Panel 1',
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
  // 'table 1': [
  //   {
  //     'table-textField1': 'table-textField1=1',
  //     'table-textField2-object': {
  //       'table-textField2': 'table-textField2-value'
  //     }
  //   },
  //   {
  //     'table-textField1': 'table-textField1=2',
  //     'table-textField2-object': {
  //       'table-textField2': 'phhh'
  //     }
  //   }
  // ],
  tab1: {
    textField1: 'hello override',
    email1: 'abc@override.com'
  },
}


const App = () => {
  const submit = (_data: any) => {
    alert(JSON.stringify(_data));
  }

  return <Form schema={schema} data={data} onSubmit={submit} />
}

export default App
