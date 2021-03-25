export const Pet = function () {
  this.temperamentos = {
    brincalhão: false,
    tímido: false,
    calmo: false,
    guarda: false,
    amoroso: false,
    preguiçoso: false,
  };
  this.saude = {
    vacinado: false,
    vermifugado: false,
    castrado: false,
    doente: false,
  };
  this.exigencias = {
    'termo de adoção': false,
    'fotos da casa': false,
    'visita prévia ao animal': false,
    'acompanhamento pós adoção': false,
  };
  this.mes = {
    '1 mês': false,
    '3 meses': false,
    '6 meses': false,
  };
  this.name = null;
  this.doencas = null;
  this.sobre = null;
  this.especie = {
    gato: true,
    cachorro: false,
  };
  this.sexo = {
    macho: true,
    fêmea: false,
  };
  this.porte = {
    pequeno: true,
    médio: false,
    grande: false,
  };
  this.idade = {
    filhote: true,
    adulto: false,
    idoso: false,
  };
};
