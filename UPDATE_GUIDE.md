# Hướng Dẫn Cập Nhật Website (Future Updates)

Sau này khi anh sửa code hoặc thêm tính năng mới, anh chỉ cần làm **3 bước đơn giản** này để cập nhật lên Server:

## 1. Tại máy cá nhân (Local)
Sau khi sửa code xong, hãy đẩy code lên GitHub:
```bash
git add .
git commit -m "Mô tả những gì đã sửa"
git push origin main
```

## 2. Tại Server (VPS)
Đăng nhập vào Server:
```bash
ssh root@103.159.50.249
cd recruitment
```

## 3. Cập Nhật & Khởi Động Lại
Chạy **duy nhất** 2 lệnh này để lấy code mới và chạy lại (Web sẽ tự động Build lại):
``cd /var/www/recruitment``
```bash
# 1. Lấy code mới nhất từ GitHub
git pull origin main

# 2. Build lại và khởi động (Chỉ tốn vài phút)
docker compose up -d --build
```
*(Lệnh này sẽ tự động chạy `npm install` và `prisma migrate` nếu cần)*

---
**Lưu ý:**
- Anh **KHÔNG** cần chỉnh sửa Nginx nữa (trừ khi đổi tên miền).
- Anh **KHÔNG** cần chỉnh sửa Database (Docker sẽ tự chạy migration nếu có).
- Web sẽ bị gián đoạn khoảng 30s - 1 phút trong lúc khởi động lại.
