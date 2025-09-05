import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO', 'RATO,BOLA,RATO', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve permitir a adoção do Loco com um acompanhante', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,BOLA,RATO', 'NOVELO', 'Rex,Loco');

    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Não deve permitir a adoção do Loco sem um acompanhante', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'NOVELO', 'Loco');
      
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

});