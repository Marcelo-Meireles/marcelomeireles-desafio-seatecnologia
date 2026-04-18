import { test, expect } from '@playwright/test';

const URL = 'http://analista-teste.seatecnologia.com.br';

// Coordenadas reais dos ícones do menu lateral (validadas na inspeção)
const MENU_COORDS = [
  { name: 'Item 1', x: 28, y: 207 },
  { name: 'Item 2', x: 28, y: 263 },
  { name: 'Item 3', x: 28, y: 319 },
  { name: 'Item 4', x: 28, y: 375 },
  { name: 'Item 5', x: 28, y: 431 },
  { name: 'Item 6', x: 28, y: 487 },
];

test.describe('CT-NAV — Navegação do Menu Lateral (BUG-010 esperado reprovar todos)', () => {

  for (const item of MENU_COORDS) {
    test(`CT-NAV — ${item.name} deve navegar ou exibir "Em breve"`, async ({ page }) => {
      await page.goto(URL);
      await page.mouse.click(item.x, item.y);
      await page.waitForTimeout(400);

      const comingSoon = await page.locator('text=Em breve').count();
      const urlChanged = page.url() !== URL + '/';

      // BUG-010: espera reprovar — nenhum item navega nem exibe "Em breve"
      expect(
        comingSoon > 0 || urlChanged,
        `${item.name} não navegou e não exibiu "Em breve"`
      ).toBeTruthy();
    });
  }

});