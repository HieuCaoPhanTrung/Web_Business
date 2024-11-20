import { Component } from '@angular/core';
import { ExampleService } from '../services/example.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private _service: ExampleService, private router: Router, private location: Location) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin';
      return;
    }
  
    const user = { email: this.email.trim(), password: this.password };
    this._service.login(user).subscribe({
      next: (response) => {
        console.log('Đăng nhập thành công', response);
        alert('Đăng nhập thành công!');
        // Lấy URL từ ExampleService (hoặc mặc định /home)
        // const redirectUrl = this._service.getRedirectUrl();
        // this._service.clearRedirectUrl(); // Xóa redirectUrl sau khi dùng
        // this.router.navigate([redirectUrl]); // Điều hướng đến trang mong muốn
      },
      error: (err) => {
        console.error('Lỗi đăng nhập:', err);
        if (err.status === 401) {
          this.errorMessage = 'Email hoặc mật khẩu không chính xác';
        } else {
          this.errorMessage = 'Lỗi server, vui lòng thử lại';
        }
      },
    });
  }
  goBack(): void {
    if (window.history.length > 1) {
      this.location.back(); // Quay lại nếu có lịch sử
    } else {
      this.router.navigate(['/home']); // Điều hướng đến trang tin tức nếu không có lịch sử
    }
  }
  
  

}
