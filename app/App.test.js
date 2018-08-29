import React from 'react';
import App from './App'
import LoginScreen from './Login';
import ListScreen from './List';
import NewUserScreen from './NewUser';
import DetailListScreen from '/DetailList'


import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<LoginScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<ListScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<NewUserScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<DetailListScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
