import Button from '../components/base/button.vue';
import { shallowMount } from '@vue/test-utils';

describe('Button.vue', () => {
  test('renders label with default props', async () => {
    const label = '',
      icon = '',
      loading = false;

    const wrapper = shallowMount(Button, {
      props: { label, icon, loading },
    });

    expect(wrapper.html()).toContain(label);
    expect(wrapper.html()).toContain(icon);
    expect(wrapper.html()).toContain(loading);
  });

  test('renders only icon', async () => {
    const icon = '';

    const wrapper = shallowMount(Button, {
      props: { icon },
    });

    await wrapper.setProps({ icon: 'pi pi-times' });
    expect(wrapper.html()).toContain(icon);
  });
});
