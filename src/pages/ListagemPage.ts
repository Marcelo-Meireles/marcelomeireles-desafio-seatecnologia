import { Page, Locator } from '@playwright/test';

export class ListagemPage {
  readonly page: Page;
  readonly tabelaRegistros: Locator;
  readonly modalConfirmacaoExclusao: Locator;
  readonly botaoConfirmarExclusao: Locator;
  readonly botaoCancelarExclusao: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tabelaRegistros = page.getByRole('main');

    // Antd Popconfirm costuma ser tooltip/alertdialog, nem sempre "dialog".
    this.modalConfirmacaoExclusao = page
      .getByRole('dialog')
      .or(page.getByRole('alertdialog'))
      .or(page.getByRole('tooltip'))
      .first();

    this.botaoConfirmarExclusao = this.modalConfirmacaoExclusao.getByRole('button', { name: /sim|ok|confirmar|excluir/i }).first();
    this.botaoCancelarExclusao = this.modalConfirmacaoExclusao.getByRole('button', { name: /n[aã]o|cancelar/i }).first();
  }

  async acessar() {
    await this.page.goto('https://analista-teste.seatecnologia.com.br/');
  }

  async funcionarioVisivelNaLista(nome: string): Promise<Locator> {
    return this.page.locator(`text=${nome}`).first();
  }

  async abrirMenuAcoes(nome: string) {
    const card = this.page.locator(`text=${nome}`).first().locator('../..');
    await card.scrollIntoViewIfNeeded();
    await card.hover().catch(() => {});
    await card.locator('button').last().click({ force: true, timeout: 10000 });
  }

  async clicarEditar() {
    await this.page.getByText('Editar', { exact: true }).last().click();
  }

  async clicarExcluir() {
    await this.page.getByText('Excluir', { exact: true }).last().click();
  }

  async confirmarExclusao() {
    await this.botaoConfirmarExclusao.click();
  }

  async cancelarExclusao() {
    await this.botaoCancelarExclusao.click();
  }
}