import React from 'react';
import Select from './Select';
import { ComponentMeta, ComponentStory } from '@storybook/react'; 

export default {
    title: 'UI/Molecules/Select',
    component: Select,
    args: {
        title: 'Select',
    },
    
 
} as ComponentMeta <typeof Select>;

const Template : ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Common = Template.bind({});
Common.args = {
label : 'Select from the list',
options : [
    {label: 'Option A', value: 'Option 1'},
    {label: 'Option B', value: 'Option 2'},
    {label: 'Option C', value: 'Option 3'},
    {label: 'Option D', value: 'Option 4'},
]
    
};
