import React from 'react';
import renderer from 'react-test-renderer';
import Principal from '../screens/Principal';
import Adicionar from '../screens/Adicionar';
import Metas from '../screens/Metas';
import Listar from '../screens/Listar';
import Editar from '../screens/Editar';
import Grafico from '../screens/Grafico';
import { calculaCalorias, calculaIdade } from '../screens/Metas';
import {calcCalGrama} from '../screens/Adicionar';
import {calcPercentual, calcPercentagem} from '../screens/Principal';

//SnapShots
test('Renderiza corretamente tela Principal', () => {
  const render1 = renderer.create(<Principal />).toJSON();
  expect(render1).toMatchSnapshot();
});

test('Renderiza corretamente tela Adicionar', () => {
  const render1 = renderer.create(<Adicionar />).toJSON();
  expect(render1).toMatchSnapshot();
});

test('Renderiza corretamente tela Metas', () => {
  const render1 = renderer.create(<Metas />).toJSON();
  expect(render1).toMatchSnapshot();
});

test('Renderiza corretamente tela Grafico', () => {
  const render1 = renderer.create(<Grafico />).toJSON();
  expect(render1).toMatchSnapshot();
});

test('Renderiza corretamente tela Listar', () => {
  const render1 = renderer.create(<Listar />).toJSON();
  expect(render1).toMatchSnapshot();
});


//Função: calculaCalorias()
test('Calculadora de Calorias - teste 1', () => {
  const result = calculaCalorias(70,170,20,'m','leve','mpeso').toFixed(2);
  expect(result).toBe('2398.52');
});

test('Calculadora de Calorias - teste 2', () => {
  const result = calculaCalorias(70,170,20,'f','moderada','ppeso').toFixed(2);
  expect(result).toBe('2155.96');
});

test('Calculadora de Calorias - teste 3', () => {
  const result = calculaCalorias(80,190,25,'m','intensa','gpeso').toFixed(2);
  expect(result).toBe('4071.66');
});


//Função: calculaIdade()
test('Calcula Idade - teste 1', () => {
  const result = calculaIdade(1,1,2000);
  expect(result).toBe(20);
});

test('Calcula Idade - teste 2', () => {
  const result = calculaIdade(5,6,2004);
  expect(result).toBe(16);
});


//Função: calcCalGrama()
test('Calcula quantidade*caloriaPorGrama - teste 1', () => {
  const result = calcCalGrama(1,3);
  expect(result).toBe(3);
});

test('Calcula quantidade*caloriaPorGrama - teste 2', () => {
  const result = calcCalGrama(5,15);
  expect(result).toBe(75);
});

test('Calcula quantidade*caloriaPorGrama - teste 3', () => {
  const result = calcCalGrama(3,40);
  expect(result).toBe(120);
});


//Função: calculaPercentual()
test('Calcula Percentual - teste 1', () => {
  const result = calcPercentual(5,10);
  expect(result).toBe(0.5);
});

test('Calcula Percentual - teste 2', () => {
  const result = calcPercentual(643,2463.58).toFixed(4);
  expect(result).toBe('0.2610');
});

test('Calcula Percentual - teste 3', () => {
  const result = calcPercentual(2564.36,2374.98).toFixed(4);
  expect(result).toBe('1.0797');
});


//Função: calculaPercentagem()
test('Calcula Porcentagem - teste 1', () => {
  const result = calcPercentagem(0.5);
  expect(result).toBe('50.00');
});

test('Calcula Porcentagem - teste 2', () => {
  const result = calcPercentagem(0.4867);
  expect(result).toBe('48.67');
});

test('Calcula Porcentagem - teste 3', () => {
  const result = calcPercentagem(1.0797);
  expect(result).toBe('107.97');
});