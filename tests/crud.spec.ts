import { test, expect } from '@playwright/test';

const URL = 'http://analista-teste.seatecnologia.com.br';

test.describe('CT-CRUD — Persistência, Edição e Exclusão', () => {

  test('CT-CRUD-002 — Funcionário pré-existente deve aparecer na listagem', async ({ page }) => {
    await page.goto(URL);
    await expect(page.getByText('Sea Teste')).toBeVisible();
    await expect(page.getByText('121.212.412-31')).toBeVisible();
  });

  test('CT-CRUD-001 — Novo cadastro deve persistir após recarregar (BUG-004 esperado reprovar)', async ({
    page,
  }) => {
    // BUG-004: no ambiente atual o cadastro não persiste — falha é esperada até correção no sistema
    test.fail(true, 'BUG-004: persistência ausente no ambiente de teste');

    await page.goto(URL);
    await page.getByRole('button', { name: '+ Adicionar Funcionário' }).click();
  
    await page.locator('input[name="name"]').fill('Funcionario Auto Teste');
    await page.locator('input[name="cpf"]').fill('529982247');
    await page.locator('input[name="rg"]').fill('8888888');
    await page.locator('input[name="birthDay"]').fill('1990-06-15');
    await page.locator('input[type="checkbox"]').first().check();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForTimeout(500);
    await page.reload();
  
    // BUG-004: espera reprovar — cadastro não persiste
    await expect(page.getByText('Funcionario Auto Teste')).toBeVisible();
  });

  test('CT-CRUD-003 — Filtro "Ver apenas ativos" deve ocultar inativos (BUG-009 esperado reprovar)', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('button', { name: 'Ver apenas ativos' }).click();
    await page.waitForTimeout(300);

    // BUG-009: espera reprovar — Sea Teste (inativo) continua visível
    await expect(page.getByText('Sea Teste')).toHaveCount(0);
  });

  test('CT-CRUD-010 — Menu de reticências deve exibir opções de ação', async ({ page }) => {
    await page.goto(URL);
    // Coordenada real do botão "..." do card Sea Teste
    await page.mouse.click(480, 390);
    await page.waitForTimeout(500);
  
    const hasEdit   = await page.locator('text=Editar').count() > 0;
    const hasDelete = await page.locator('text=Excluir').count() > 0;
    expect(hasEdit || hasDelete).toBeTruthy();
  });

});