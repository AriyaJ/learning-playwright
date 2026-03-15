// ทำ page ไว้แยกแบบ robot
    //เก็บ locator ก่อน
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }
  // สร้าง keyword ชื่อ login รับตัวแปร user, pass มาทำงานข้างใน
  async login(user, pass) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}
module.exports = { LoginPage };