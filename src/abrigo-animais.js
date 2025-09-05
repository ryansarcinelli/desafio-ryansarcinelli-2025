class AbrigoAnimais {
  static ANIMAIS = new Map([
    ['Rex', { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] }],
    ['Mimi', { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] }],
    ['Fofo', { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] }],
    ['Zero', { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] }],
    ['Bola', { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] }],
    ['Bebe', { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] }],
    ['Loco', { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }],
  ]);

  _validarLista(lista, tipo) {
    if (new Set(lista).size !== lista.length) {
      return tipo === 'animal' ? 'Animal inválido' : 'Brinquedo inválido';
    }

    if (tipo === 'animal') {
      for (const nomeAnimal of lista) {
        if (!this.constructor.ANIMAIS.has(nomeAnimal)) {
          return 'Animal inválido';
        }
      }
    }
    return null;
  }

  _verificarAptidao(brinquedosPessoa, animal, nomeAnimal, animaisAdotados) {
    if (animaisAdotados >= 3) {
      return false;
    }

    const brinquedosFavoritos = animal.brinquedos;

    if (nomeAnimal === 'Loco') {
      const temCompanhia = animaisAdotados > 0;
      if (!temCompanhia) {
        return false;
      }
      return brinquedosFavoritos.every(b => brinquedosPessoa.includes(b));
    }

    let indiceBrinquedoDesejado = 0;
    for (const brinquedoAtual of brinquedosPessoa) {
      if (brinquedoAtual === brinquedosFavoritos[indiceBrinquedoDesejado]) {
        indiceBrinquedoDesejado++;
      }
      if (indiceBrinquedoDesejado === brinquedosFavoritos.length) {
        return true;
      }
    }

    return false;
  }

  encontraPessoas(brinquedosPessoa1Str, brinquedosPessoa2Str, ordemAnimaisStr) {
    const brinquedosPessoa1 = brinquedosPessoa1Str.split(',');
    const brinquedosPessoa2 = brinquedosPessoa2Str.split(',');
    const animaisConsiderados = ordemAnimaisStr.split(',');

    let erro = this._validarLista(animaisConsiderados, 'animal');
    if (erro) return { erro };

    erro = this._validarLista(brinquedosPessoa1, 'brinquedo');
    if (erro) return { erro };

    erro = this._validarLista(brinquedosPessoa2, 'brinquedo');
    if (erro) return { erro };

    let animaisAdotadosPessoa1 = 0;
    let animaisAdotadosPessoa2 = 0;
    const resultados = [];

    for (const nomeAnimal of animaisConsiderados) {
      const animal = this.constructor.ANIMAIS.get(nomeAnimal);

      const pessoa1PodeAdotar = this._verificarAptidao(brinquedosPessoa1, animal, nomeAnimal, animaisAdotadosPessoa1);
      const pessoa2PodeAdotar = this._verificarAptidao(brinquedosPessoa2, animal, nomeAnimal, animaisAdotadosPessoa2);

      if (pessoa1PodeAdotar && pessoa2PodeAdotar) {
        resultados.push(`${nomeAnimal} - abrigo`);
      } else if (pessoa1PodeAdotar) {
        resultados.push(`${nomeAnimal} - pessoa 1`);
        animaisAdotadosPessoa1++;
      } else if (pessoa2PodeAdotar) {
        resultados.push(`${nomeAnimal} - pessoa 2`);
        animaisAdotadosPessoa2++;
      } else {
        resultados.push(`${nomeAnimal} - abrigo`);
      }
    }

    resultados.sort();

    return { lista: resultados };
  }
}

export { AbrigoAnimais as AbrigoAnimais };