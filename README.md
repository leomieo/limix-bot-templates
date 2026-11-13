# Limix Bot Templates

Kho Bot mẫu riêng cho Limix Bot. Trong ứng dụng, mở **Bản mẫu → Khám phá** để xem Bot và bấm **Cập nhật** để tải danh sách mới nhất.

Kho này có sẵn 16 Bot mẫu. Mẫu nhóm Bot nằm tại [limix-bot-teams](https://github.com/leomieo/limix-bot-teams).

## Thêm Bot mẫu

1. Sao chép một tệp trong `bots/`, ví dụ `bots/coder.json`, thành `bots/ten-bot.json`.
2. Đặt `id` trùng tên tệp, chỉ dùng chữ thường, số và dấu gạch ngang. Sửa tên, vai trò, mô tả và chỉ dẫn cho Bot.
3. Đẩy tệp lên nhánh `main`. GitHub Actions sẽ kiểm tra và tự cập nhật `catalog.json`.
4. Khi workflow **Update bot catalog** hoàn tất, mở Limix Bot và bấm **Cập nhật**.

Mẫu hợp lệ tối thiểu có cấu trúc sau.

```json
{
  "format": "limix.bot",
  "version": 1,
  "id": "sales-helper",
  "category": "sales",
  "name": "Sales Helper",
  "title": "Sales assistant",
  "description": "Hỗ trợ trả lời khách và theo dõi đơn hàng.",
  "soul": "You help the user answer customer questions and track orders. Verify order data before answering. Ask for approval before sending messages or changing orders. Respond in the language the user requests.",
  "look": { "color": "green", "mascotBody": "cursor" },
  "tryAsking": ["Which orders need attention today?"],
  "apps": []
}
```

## Quy ước Anh–Việt

- `description` là mô tả tiếng Việt để giới thiệu Bot.
- `soul` là chỉ dẫn làm việc bằng tiếng Anh. Giữ đầy đủ quy tắc, giới hạn và yêu cầu xác minh.
- Tên vai trò `title`, câu gợi ý `tryAsking`, ghi chú `notes` và prompt định kỳ dùng tiếng Anh mặc định. Bot vẫn có thể trả lời theo ngôn ngữ người dùng yêu cầu.
- `category` nhận một trong các giá trị `everyday`, `work`, `writing`, `design`, `sales`, `personal`.
- Dùng `look` từ một mẫu có sẵn để chọn màu và hình hợp lệ.
- `apps` và `skills` dùng tên kỹ thuật gốc. Bot mẫu chỉ đề xuất kết nối. Người dùng tự cấp quyền trong ứng dụng.
- Ghi chú chỉ nằm ở `MEMORY.md` hoặc `memory/<ten>.md`. Tác vụ định kỳ được ứng dụng nhập ở trạng thái tạm dừng.

Khi sửa trên máy, chạy hai lệnh sau trước khi đẩy lên kho.

```sh
node scripts/update-catalog.mjs
node --test
```

Giữ tệp Bot dưới 64 KB, mô tả tối đa 300 ký tự, chỉ dẫn tối đa 8.000 ký tự và câu gợi ý tối đa 200 ký tự. Mẫu được tải về khi người dùng bấm **Dùng mẫu**.

## Giấy phép

Apache-2.0. Nguồn gốc các Bot mẫu được ghi trong `NOTICE`.
