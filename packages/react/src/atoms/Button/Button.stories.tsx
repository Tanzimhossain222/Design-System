import React from 'react';
import Button, { ButtonProps } from './Button';
import { ComponentMeta, ComponentStory } from '@storybook/react'; 

export default {
  title: 'UI/Atoms/Button',
  component: Button,
  args: {
    children: 'Button',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Primary Button',
  children: 'Primary Button',
};
