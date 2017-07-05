import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';

import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  let props = {
    course: {}, saving: saving, errors: {},
    onSave: () => {
    },
    onChange: () => {
    }
  };
  return shallow(<CourseForm {...props} />);
}

describe('Course form via Enzyme', () => {
  it('renders from and h1', () => {
    const wrappers = setup(false);
    expect(wrappers.find('form').length).toBe(1);
    expect(wrappers.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving',() => {
    const wrappers = setup(false);
    expect(wrappers.find('input').props().value).toBe('Save');

  });


  it('save button is labeled "Saving..." when saving',() => {
    const wrappers = setup(true);
    expect(wrappers.find('input').props().value).toBe('Saving...');

  });
});


