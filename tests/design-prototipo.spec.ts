import { test, expect } from '@playwright/test';

const URL = 'http://analista-teste.seatecnologia.com.br';

test.describe('CT-DES — Design e Layout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('CT-DES-001 — Estrutura geral deve estar presente na tela principal', async ({ page }) => {
    await expect(page.locator('text=ITEM 1').first()).toBeVisible();
    await expect(page.getByText('Funcionário(s)', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: '+ Adicionar Funcionário' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ver apenas ativos' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Limpar filtros' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Próximo passo' })).toBeVisible();
    await expect(page.getByText('A etapa está concluída?')).toBeVisible();
  });

  test('CT-DES-002 — Menu lateral: clicar item deve navegar ou exibir "Em breve" (BUG-010 esperado reprovar)', async ({ page }) => {
    await page.mouse.click(28, 263);
    await page.waitForTimeout(400);
    const comingSoon = await page.locator('text=Em breve').count();
    const urlChanged = page.url() !== URL + '/';
    expect(comingSoon > 0 || urlChanged).toBeTruthy();
  });

  test('CT-DES-003 — Card do funcionário pré-existente deve ser visível', async ({ page }) => {
    await expect(page.getByText('Sea Teste')).toBeVisible();
    await expect(page.getByText('121.212.412-31')).toBeVisible();
    // Valida presença de pelo menos um badge de informação no card
    await expect(page.getByText('Ativid 02')).toBeVisible();
    await expect(page.getByText('Cargo 02')).toBeVisible();
  });

});