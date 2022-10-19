import LinkComponent from '../components/LinkComponent.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Link',
  component: LinkComponent,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LinkComponent },
  template: '<LinkComponent v-bind="$props" />',
});

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Basic.args = {
    
};

