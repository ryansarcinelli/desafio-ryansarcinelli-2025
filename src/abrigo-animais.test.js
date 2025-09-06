import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  // --- Testes dos Requisitos Básicos (Entradas, Saídas e Erros) ---

  test('Deve rejeitar animal inválido (não está na lista)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado na entrada', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado na entrada', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve retornar a estrutura correta em um caso de sucesso', () => {
    // Este teste valida múltiplos requisitos básicos de uma só vez:
    // 1. Recebe 3 parâmetros de texto com itens separados por vírgula.
    // 2. Retorna a estrutura.
    // 3. A lista de saída está em ORDEM ALFABÉTICA ('Fofo' vem antes de 'Rex').
    // 4. O formato da string de saída está correto ("nome - destino").
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });


  // --- Testes Adicionais (Regras de Negócio e Casos Especiais) ---

  test('Deve enviar para o abrigo se ambas as pessoas podem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
        'BOLA,NOVELO,LASER', 'RATO,BOLA,LASER,CAIXA', 'Mimi');

    expect(resultado.lista[0]).toBe('Mimi - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });
  
  test('Deve adotar para pessoa 2 e outros para abrigo (intercalando brinquedos)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve permitir a adoção do Loco com um acompanhante', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO,BOLA', 'NOVELO', 'Rex,Loco');
    
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

  test('Deve limitar adoção a 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA,CAIXA,NOVELO', '', 'Rex,Zero,Bebe,Bola');
      
    expect(resultado.lista).toContain('Bebe - pessoa 1');
    expect(resultado.lista).toContain('Bola - abrigo');
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Zero - pessoa 1');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve alocar animais para a pessoa correta baseado nos brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,NOVELO', 'ANTE,RATO,DURANTE,BOLA,DEPOIS', 'Bola,Rex,Zero');
    
    expect(resultado.lista).toContain('Bola - abrigo');
    expect(resultado.lista).toContain('Rex - pessoa 2');
    expect(resultado.lista).toContain('Zero - pessoa 2');
    expect(resultado.lista.length).toBe(3);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve retornar abrigo se ninguém pode adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER', 'CAIXA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });
});