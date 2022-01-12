import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    const accounts = [
      {
        id: '8H17tkfb',
        email: 'abc@gmail.com',
        avatar: 'http://localhost:3000/public/images/user-avatar.png',
        nickName: 'Hoàn Bính',
        gender: 'Nam',
        password: '123',
        phone: '036151212',
        role: 'USER',
      },
      {
        id: '8H17tkfb',
        email: 'abc1@gmail.com',
        avatar: 'http://localhost:3000/public/images/user-avatar.png',
        nickName: 'Hoàn Bính',
        gender: 'Nam',
        password: '123',
        phone: '036151212',
        role: 'USER',
      },
      {
        id: '8H17tkfb',
        email: 'abc2@gmail.com',
        avatar: 'http://localhost:3000/public/images/user-avatar.png',
        nickName: 'Hoàn Bính',
        gender: 'Nam',
        password: '123',
        phone: '036151212',
        role: 'USER',
      },
      {
        id: '8H32tkfb',
        email: 'kimcuc@gmail.com',
        avatar: 'http://localhost:3000/public/images/user-avatar.png',
        nickName: 'Kim cúc',
        gender: 'Nữ',
        phone: '036151212',
        role: 'USER',
      },
      {
        id: '8H17t43b',
        email: 'trongnghia@gmail.com',
        avatar: 'http://localhost:3000/public/images/user-avatar.png',
        nickName: 'Trọng Nghĩa',
        gender: 'Nam',
        phone: '036151212',
        role: 'USER',
      },
      {
        id: '6H17tfRb',
        email: 'luly@gmail.com',
        avatar: 'http://localhost:3000/public/images/user-avatar.png',
        nickName: 'Lu Ly',
        gender: 'Nữ',
        phone: '036151212',
        role: 'USER',
      },

      {
        id: '9H1etkRb',
        email: 'kimthoa@gmail.com',
        avatar: 'http://localhost:3000/public/images/user-avatar.png',
        nickName: 'kim Thoa',
        gender: 'Nữ',
        phone: '036151212',
        role: 'ADMIN',
      },
    ];
    const products = [
      {
        id: '9H1ttkRb',
        name: 'Xá xị',
        image:
          'https://cdn.fast.vn/tmp/20200919065358-nuoc-ngot-fanta-huong-xa-xi-330ml-1.jpg',
        category: 'Giải khát',
        attributes: [
          { size: 'M', price: '15000' },
          { size: 'L', price: '20000' },
        ],
        descript:
          'Nước bão hòa CO2, đường HFCS, hương xá xị tổng hợp, màu thực phẩm (E150d), chất điều chỉnh độ axit (E330)',
      },
      {
        id: '9H1efeRb',
        name: 'Cà phê',
        image:
          'https://img.thuthuatphanmem.vn/uploads/2018/10/04/anh-dep-ben-ly-cafe-den_110730392.jpg',
        category: 'Cà phê',
        attributes: [{ size: 'M', price: '15000' }],
        descript:
          'Cà phê được các nhà khoa học và nhà nghiên cứu dinh dưỡng đánh giá rất cao về tác dụng của chúng đối với sức khỏe.',
      },
      {
        id: '9H1etkR3',
        name: 'Tăng lực',
        image:
          'https://dailynuoc.com/thumb.php?src=https://dailynuoc.com/img_data/images/thung-24-chai-nuoc-tang-luc-number1-330ml012982766531.jpg&w=600&h=450&zc=2',
        category: 'Giải khát',
        attributes: [{ size: 'M', price: '15000' }],
        descript:
          'Nước Tăng Lực Number 1 được tạo ra từ sự kết hợp của Vitamin B3, Taurine, Inositol và Caffeine để giúp người dùng nạp nhanh năng lượng',
      },
      {
        id: '9H1et12Rb',
        name: 'Dưa hấu',
        image:
          'https://ameovat.com/wp-content/uploads/2016/07/cach-lam-sinh-to-dua-hau-3-600x454.jpg',
        category: 'Sinh tố',
        attributes: [
          { size: 'M', price: '15000' },
          { size: 'L', price: '17000' },
        ],
        descript:
          'Cách làm sinh tố dưa hấu thơm ngon bổ dưỡng – Cach lam sinh to dua hau',
      },
      {
        id: '9H154kRb',
        name: 'Bí đao',
        image:
          'http://gongcha.com.vn/wp-content/uploads/2018/02/Trà-Bí-Đao-Alisan-2.png',
        category: 'Giải khát',
        attributes: [
          { size: 'M', price: '15000' },
          { size: 'XL', price: '20000' },
        ],
        descript:
          'Trà bí đao ngọt ngào kết hợp với trà Alisan, cho ra ly trà thơm, ngọt dịu dễ uống.',
      },
      {
        id: '9H1efkRb',
        name: 'Siro',
        image:
          'https://yt.cdnxbvn.com/medias/uploads/195/195444-cach-lam-siro-dau.jpg',
        category: 'Giải khát',
        attributes: [
          { size: 'M', price: '12000' },
          { size: 'L', price: '15000' },
        ],
        descript:
          'Trong các cách làm siro dâu, siro ngâm đường là cách dễ nhất. Đây cũng là cách thực hiện không tốn công. ',
      },
      {
        id: '9H1etkRe',
        name: 'Cà rốt',
        image: 'https://cdn.phunusuckhoe.vn/cach-lam-siro-tri-ho-dom.jpg',
        category: 'Sinh tố',
        attributes: [
          { size: 'M', price: '12000' },
          { size: 'XL', price: '15000' },
        ],
        descript:
          'Ho đờm là một triệu chứng phổ biến khi chúng bị cảm lạnh và một số căn bệnh khác, có tác động không hề nhỏ đối với hệ hô hấp. ',
      },
    ];

    return { accounts, products };
  }
}
