import { Page, Locator } from '@playwright/test';

type DadosCadastro = {
  nome: string;
  cpf: string;
  dia: string;
  mes: string;
  ano: string;
  rg: string;
  cargo: string;
  atividade: string;
  epi: string;
  ca: string;
};

export class CadastroPage {
  readonly page: Page;
  readonly adicionarFuncionarioButton: Locator;
  readonly modalAdicionarFuncionario: Locator;
  readonly modalRoot: Locator;
  readonly nomeInput: Locator;
  readonly cpfInput: Locator;
  readonly dataNascimentoInput: Locator;
  readonly rgInput: Locator;
  readonly cargoCombobox: Locator;
  readonly atividadeCombobox: Locator;
  readonly epiCombobox: Locator;
  readonly caInput: Locator;
  readonly salvarButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.adicionarFuncionarioButton = page.getByRole('button', { name: '+ Adicionar Funcionário' });
    this.modalAdicionarFuncionario = page.getByRole('heading', { name: 'Adicionar Funcionário' });
    // Estrutura observada: botão + <h2> dentro de um header, seguido do conteúdo do formulário.
    this.modalRoot = this.modalAdicionarFuncionario.locator('..').locator('..');

    // Evitar nth() global (muito frágil). Ancorar nos rótulos dentro do modal.
    this.nomeInput = this.modalRoot.getByText('Nome', { exact: true }).locator('..').getByRole('textbox');
    this.cpfInput = this.modalRoot.getByText('CPF', { exact: true }).locator('..').getByRole('textbox');
    this.dataNascimentoInput = this.modalRoot
      .getByText('Data de nascimento', { exact: true })
      .locator('..')
      .getByRole('textbox');
    this.rgInput = this.modalRoot.getByText('RG', { exact: true }).locator('..').getByRole('textbox');

    // Comboboxes ficam dentro do modal; manter por ordem, mas escopado ao modal.
    this.cargoCombobox = this.modalRoot.getByRole('combobox').nth(0);
    this.atividadeCombobox = this.modalRoot.getByRole('combobox').nth(1);
    this.epiCombobox = this.modalRoot.getByRole('combobox').nth(2);
    this.caInput = this.modalRoot.getByText(/n[uú]mero do ca/i).locator('..').getByRole('textbox');
    this.salvarButton = page.getByRole('button', { name: 'Salvar' });
  }

  async acessar() {
    await this.page.goto('http://analista-teste.seatecnologia.com.br/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.adicionarFuncionarioButton.click();
    await this.modalAdicionarFuncionario.waitFor({ state: 'visible' });
    await this.nomeInput.waitFor({ state: 'visible' });
  }

  async preencherNome(nome: string) {
    await this.nomeInput.fill(nome);
  }

  async preencherCpf(cpf: string) {
    await this.cpfInput.fill(cpf);
  }

  async preencherDataNascimento(dia: string, mes: string, ano: string) {
    // No app o campo é único (dd/mm/aaaa).
    const dd = dia.padStart(2, '0');
    const mm = mes.padStart(2, '0');
    // O input é type="date" → formato esperado: yyyy-mm-dd
    await this.dataNascimentoInput.fill(`${ano}-${mm}-${dd}`);
  }

  async preencherRg(rg: string) {
    await this.rgInput.fill(rg);
  }

  async selecionarCargo(cargo: string) {
    await this.cargoCombobox.scrollIntoViewIfNeeded();
    await this.cargoCombobox.click({ force: true });
    await this.page.keyboard.type(cargo, { delay: 10 });
    await this.page.keyboard.press('Enter');
  }

  async selecionarAtividade(atividade: string) {
    await this.atividadeCombobox.scrollIntoViewIfNeeded();
    await this.atividadeCombobox.click({ force: true });
    await this.page.keyboard.type(atividade, { delay: 10 });
    await this.page.keyboard.press('Enter');
  }

  async selecionarEpi(epi: string) {
    await this.epiCombobox.scrollIntoViewIfNeeded();
    await this.epiCombobox.click({ force: true });
    await this.page.keyboard.type(epi, { delay: 10 });
    await this.page.keyboard.press('Enter');
  }

  async preencherCa(ca: string) {
    await this.caInput.fill(ca);
  }

  async clicarSalvar() {
    await this.salvarButton.click();
  }

  async preencherFormularioValido(dados: DadosCadastro) {
    await this.preencherNome(dados.nome);
    await this.preencherCpf(dados.cpf);
    await this.preencherDataNascimento(dados.dia, dados.mes, dados.ano);
    await this.preencherRg(dados.rg);
    await this.selecionarCargo(dados.cargo);
    await this.selecionarAtividade(dados.atividade);
    await this.selecionarEpi(dados.epi);
    await this.preencherCa(dados.ca);
  }

  async salvarCadastroValido(dados: DadosCadastro) {
    await this.preencherFormularioValido(dados);
    await this.clicarSalvar();
  }
}