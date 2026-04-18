import { test, expect } from '@playwright/test';

const URL = 'http://analista-teste.seatecnologia.com.br';

test.describe('CT-FORM — Formulário de Cadastro', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('button', { name: '+ Adicionar Funcionário' }).click();
    await expect(page.getByText('Adicionar Funcionário')).toBeVisible();
  });

  test('CT-FORM-001 — Todos os campos obrigatórios devem estar presentes', async ({ page }) => {
    await expect(page.getByText('Nome', { exact: true })).toBeVisible();
    await expect(page.getByText('CPF', { exact: true })).toBeVisible();
    await expect(page.getByText('RG', { exact: true })).toBeVisible();
    await expect(page.getByText('Data de nascimento')).toBeVisible();
    await expect(page.getByText('Sexo', { exact: true })).toBeVisible();
    await expect(page.getByText('Cargo', { exact: true })).toBeVisible();
    await expect(page.getByText('Quais EPIs o trabalhador usa na atividade?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Salvar' })).toBeVisible();
  });

  test('CT-FORM-008 — Salvar sem preencher campos não exibe validação (BUG-008)', async ({ page }) => {
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForTimeout(500);
  
    // Permanece no formulário — sistema não salva
    await expect(page.getByText('Adicionar Funcionário')).toBeVisible();
  
    // BUG-008 confirmado: sistema não exibe feedback visual algum
    const invalidFields = await page.locator('[aria-invalid="true"]').count();
    const errorMessages = await page.locator('text=/obrigatório|inválido|Preencha/i').count();
    expect(invalidFields).toBe(0);
    expect(errorMessages).toBe(0);
  });

  test('CT-FORM-006 — CPF inválido deve ser rejeitado (BUG-007 esperado reprovar)', async ({ page }) => {
    // Usa name do campo para seletor mais confiável
    await page.locator('input[name="name"]').fill('Teste CPF Invalido');
    await page.locator('input[name="cpf"]').fill('111111111');
    await page.locator('input[name="rg"]').fill('1234567');
    await page.locator('input[name="birthDay"]').fill('1990-01-01');
    await page.locator('input[type="checkbox"]').first().check();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForTimeout(500);

    // BUG-007: espera reprovar — sistema aceita CPF inválido sem erro
    const cpfError = await page.locator('text=/CPF inválido|CPF/i').count();
    expect(cpfError).toBeGreaterThan(0);
  });

  test('CT-FORM-013 — Checkbox "não usa EPI" deve desabilitar campos de EPI (BUG-006 esperado reprovar)', async ({ page }) => {
    await expect(page.getByText('Selecione a atividade:')).toBeVisible();
    await page.locator('input[type="checkbox"]').first().check();
    await page.waitForTimeout(300);

    // BUG-006: espera reprovar — campos continuam visíveis
    const atividadeVisible = await page.getByText('Selecione a atividade:').isVisible();
    expect(atividadeVisible).toBeFalsy();
  });

  test('CT-FORM — Botão voltar deve retornar para a listagem', async ({ page }) => {
    // Ícone ao lado do título (sem aria-label): irmão anterior ao h2
    await page
      .getByRole('heading', { name: 'Adicionar Funcionário' })
      .locator('xpath=preceding-sibling::button')
      .click();

    await expect(page.getByRole('button', { name: '+ Adicionar Funcionário' })).toBeVisible({
      timeout: 15000,
    });
  });

});