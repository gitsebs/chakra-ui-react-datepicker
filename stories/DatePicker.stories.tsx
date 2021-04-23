import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { DatePicker } from '../src';
import { useState } from '@storybook/addons';

const meta: Meta = {
  title: 'DatePicker',
  component: DatePicker,
};

export default meta;

export const Default: Story = () => {
  const [state, setState] = useState(() => new Date());
  return <DatePicker value={state} onChange={setState} />;
};
